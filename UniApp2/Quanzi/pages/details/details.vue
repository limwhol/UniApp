<template>
	<view class="detail">
		<view v-if="isloadingState">
			<u-skeleton rows="5" title loading avatar></u-skeleton>
		</view>
		<view v-else>
			<view class="top">
				{{dataObj.title}}
			</view>
			<view class="topinfo">
				<view class="avatar">
					<image :src="getUserAvatar(dataObj)">
					</image>
				</view>
				<view class="authorbox">
					<view class="author">
						{{getUserName(dataObj)}}
					</view>
					<view class="timeandlocation">
						<view class="posttime">
							<uni-dateformat :date="dataObj.publish_date"
								format="yyyy年MM月dd hh:mm:ss "></uni-dateformat>发布于{{dataObj.province}}
						</view>
					</view>
				</view>
			</view>
			<view class="middlecontent">
				<u-parse :content="dataObj.content" :tagStyle="tagStyleObj"></u-parse>
			</view>
			<view class="like">
				<view class="btn" :class="dataObj.islike?'only':''" @click="likeFunc">
					<text class="iconfont icon-a-106-xihuan"></text>
					<text v-if="dataObj.like_count>0">{{dataObj.like_count}}</text>
					<text v-else></text>
				</view>
				<view class="users">
					<view v-for="item in likeUserArr">
						<image v-if="item.user_id[0].avatar_file" :src="getUserAvatar(item)" mode="aspectFill"></image>
					</view>
					
				</view>
				<view class="text">
					<text class="num">{{dataObj.view_count}}</text>人看过
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import pageJson from "@/pages.json"
	import {
		store
	} from '@/uni_modules/uni-id-pages/common/store.js'
	import {
		getUserAvatar,
		getUserName
	} from "../../utils/tools.js"
	const db = uniCloud.database()
	const utilsObj = uniCloud.importObject("utilsObj", {
		customUI: true
	})
	export default {
		data() {
			return {
				artID: "",
				isloadingState: true,
				dataObj: null,
				tagStyleObj: {
					img: "border-radius:20rpx;margin-bottom:15rpx;",
					p: "line-height: 1.6em;"
				},
				likeTime: null,
				likeUserArr:[]
			};
		},
		onLoad(e) {
			if (!e.id) {
				this.errFunc()
			}
			this.artID = e.id
			this.getData()
			this.viewUpdate()
			this.getUserLike()
		},
		methods: {
			getUserLike(){
				let likeTemp = db.collection("quanzi_like").where(`article_id=="${this.artID}"`).getTemp()
				let userTemp=db.collection("uni-id-users").field("_id,avatar_file").getTemp()
				db.collection(likeTemp,userTemp).limit(5).get().then(res=>{
					console.log(res)
					this.likeUserArr=res.result.data
				})
					
			},
			getUserAvatar,
			getUserName,
			getData() {
				let artTemp = db.collection("quanzi_article").where(`_id=="${this.artID}"`)
					.getTemp()
				let userTemp = db.collection("uni-id-users").field("_id,username,nickname,avatar_file").getTemp()
				let likeTemp = db.collection("quanzi_like").where(`article_id=="${this.artid}" && user_id==$cloudEnv_uid`)
					.getTemp();
				let tempArr = [artTemp, userTemp]
				console.log(store.hasLogin)
				if (store.hasLogin) {
					tempArr.push(likeTemp)
				}
				db.collection(...tempArr).get({
					getOne: true
				}).then(res => {
					if (!res.result.data) {
						this.errFunc()
					}
					console.log(res)
					this.isloadingState = false
					let islike = false
					if (store.hasLogin) {
						islike = res.result.data._id.quanzi_like.length ? true : false
					}
					res.result.data.islike = islike
					this.dataObj = res.result.data
					uni.setNavigationBarTitle({
						title: this.dataObj.title
					})
				})
			},
			errFunc() {
				uni.showToast({
					title: "缺少参数",
					icon: 'none'
				})
				setTimeout(() => {
					uni.reLaunch({
						url: "/pages/index/index"
					})
				}, 2000)
				return
			},
			viewUpdate() {
				utilsObj.operation("quanzi_article", "view_count", this.artID, 1).then(res => {
					console.log(res)
				})
			},
			async clickLike() {
				if (!store.hasLogin) {
					uni.showModal({
						title: "缺少登录状态！",
						content: "您需要登录后才能进行点赞操作。",
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '/'+pageJson.uniIdRouter.loginPage
								});
							}
							if (res.cancel) {
								console.log('用户点击取消');
								return
							}
						}
					});
				}
				this.dataObj.islike ? this.dataObj.like_count-- : this.dataObj.like_count++
				this.dataObj.islike = !this.dataObj.islike
				let count = await db.collection("quanzi_like").where(
					`article_id=="${this.artID}"&& user_id==$cloudEnv_uid`).count()
				if (count.result.total) {
					db.collection("quanzi_like").where(`article_id=="${this.artID}"&& user_id==$cloudEnv_uid`).remove()
					utilsObj.operation("quanzi_article", "like_count", this.artID, -1)
				} else {
					db.collection("quanzi_like").add({
						article_id: this.artID,
					})
					utilsObj.operation("quanzi_article", "like_count", this.artID, 1)
				}
			},
			likeFunc() {
				let time = Date.now()
				if (time - this.likeTime < 2000) {
					uni.showToast({
						title: "操作频繁…",
						icon: 'error'
					})
					return
				}
				this.likeTime = Date.now()
				this.clickLike()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detail {

		padding: 30rpx;
		background-color: #f8f8f8;
		min-height: calc(100vh-var(--window-top));

		.top {
			font-size: 48rpx;
			color: #333;
			font-weight: 1.7em;
			margin-bottom: 20rpx;
		}

		.topinfo {
			display: flex;
			justify-content: left;
			align-items: center;
			margin-bottom: 20rpx;

			.avatar {
				width: 60rpx;
				height: 60rpx;
				margin-right: 20rpx;

				image {
					border-radius: 50%;
					width: 100%;
					height: 100%;
				}
			}

			.authorbox {
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				align-items: flex-start;

				.author {
					font-size: 26rpx;
					color: #333;
				}

				.timeandlocation {
					display: flex;
					justify-content: left;
					align-items: center;
					font-size: 22rpx;
					color: #999;

					.posttime {
						margin-right: 10rpx;
					}
				}
			}
		}

		.middlecontent {
			margin-bottom: 60rpx;
		}

		.like {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.btn {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 260rpx;
				height: 120rpx;
				background-color: #999;
				border-radius: 60rpx;
				color: #f8f8f8;
				margin-bottom: 20rpx;
				font-size: 24rpx;

				&.only {
					background-color: #0199FE;
				}

				.iconfont {
					font-size: 48rpx;


				}
			}

			.users {
				width: 40rpx;
				height: 40rpx;
				margin-bottom: 20rpx;

				image {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}

			.text {
				font-size: 22rpx;

				.num {
					color: #0199FE;
				}
			}
		}
	}
</style>