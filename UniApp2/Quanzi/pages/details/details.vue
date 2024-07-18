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
				<view class="btn" :class="dataObj.islike?'only':''" @click="clickLike">
					<text class="iconfont icon-a-106-xihuan"></text>
					<text v-if="dataObj.like_count>0">{{dataObj.like_count}}</text>
					<text v-else></text>
				</view>
				<view class="users">
					<view class="looper" v-for="item in likeUserArr" :key="item._id">
						<image :src="getUserAvatar(item)" mode="aspectFill"></image>
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
		getUserName,
		likeFun
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
				likeUserArr: []
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
			getUserLike() {
				//在点赞表中查询文章ID符合要求的记录，首页传文章ID过来，和表里的article_id能对应上就选中之
				let likeTemp = db.collection("quanzi_like").where(`article_id=="${this.artID}"`).getTemp()
				//在用户表里查询所有的_id和avatar_file字段，其中_id用来关联主表里的user_id，其下将具有avatar_file字段，
				let userTemp = db.collection("uni-id-users").field("_id,avatar_file").getTemp()
				//联合查询上面的两张表，将符合要求的文章下的所有赞里的头像信息都导出
				db.collection(likeTemp, userTemp).limit(5).get().then(res => {

					//将导出信息赋值给likeUserArr
					this.likeUserArr = res.result.data
					console.log(this.likeUserArr)
				})

			},
			getUserAvatar,
			getUserName,
			likeFun,
			getData() {
				//在文章表里查询ID和首页传值过来的ID相同的记录
				let artTemp = db.collection("quanzi_article").where(`_id=="${this.artID}"`)
					.getTemp()
				//在用户表里查询所有的用户信息，指定字段包括了以_id为锚点，变为主表下user_id下的username,nickname以及avatar_file等字段
				let userTemp = db.collection("uni-id-users").field("_id,username,nickname,avatar_file").getTemp()
				//在点赞表里查询所有和首页传来的文章ID相同，且是当前用户点过的赞的记录
				let likeTemp = db.collection("quanzi_like").where(`article_id=="${this.artid}" && user_id==$cloudEnv_uid`)
					.getTemp();
				//先将临时的文章表和用户表做成一个数组
				let tempArr = [artTemp, userTemp]
				// console.log(store.hasLogin)
				//对用户登录状态做判断，如果用户登录了，在tempArr数组里再添加点赞表备用，用以准确展示用户对当前文章页的点赞状态；如果用户没有登录，则不添加点赞表到数组，随后查询结果不包含用户的点赞情况
				if (store.hasLogin) {
					tempArr.push(likeTemp)
					//将点赞表加入到数组中
				}
				//将数组展开后进行查询，且只返回一个查询结果
				db.collection(...tempArr).get({
					getOne: true
				}).then(res => {
					if (!res.result.data) {
						this.errFunc()
						//如果在查询结果中的res.result.data中没有任何数据则走errFunc函数，errFunc会展示错误信息并返回，不执行下面的后继代码
					}
					// console.log(res)
					//将isloadingState状态改变，取消骨架屏的显示
					this.isloadingState = false
					//新建一个变量并赋值为false
					let islike = false
					//再次对登录状态进行判断，如果用户已经登录则判断res.result.data._id.quanzi_like.length是否有元素，有的话给islike返回true，没有就返回false
					if (store.hasLogin) {
						islike = res.result.data._id.quanzi_like.length ? true : false
					}
					console.log(islike)
					//无论是什么结果，都把islike的值赋给res.result.data.islike
					res.result.data.islike = islike
					//再将res.result.data赋给dataObj
					this.dataObj = res.result.data
					//将对象中的文章标题属性值赋给页面抬头
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
				//调用utilsObj下的operation函数，输入查询表名，需要查询的字段名，输入文章ID和希望增加的浏览数，函数会为改文章的浏览量数据增加1点
				utilsObj.operation("quanzi_article", "view_count", this.artID, 1).then(res => {
					// console.log(res)
				})
			},
			async clickLike() {
				//如果用户没有登录，给出登录状态提示，用户点击确认后返回登录页面，点击取消的话返回当前页面
				if (!store.hasLogin) {
					uni.showModal({
						title: "缺少登录状态！",
						content: "您需要登录后才能进行点赞操作。",
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '/' + pageJson.uniIdRouter.loginPage
								});
							}
							if (res.cancel) {
								console.log('用户点击取消');
								return
							}
						}
					});
				}
				//将当前时间赋值给time
				let time = Date.now()
				//如果time减去likeTime的数值小于2秒，则阻止用户连续点赞并返回
				if (time - this.likeTime < 2000) {
					uni.showToast({
						title: "操作频繁…",
						icon: 'error'
					})
					return
				}
				// console.log(this.dataObj.islike)
				//查看dataObj.islike的值，如果为true的话，则点击后like_count的值需要-1；如果点击后为false的话说明用户没有点过赞，现在点赞后like_count数值需要+1
				this.dataObj.islike ? this.dataObj.like_count-- : this.dataObj.like_count++
				//点赞后将当前dataObj.islike数据取反并赋值给自己
				this.dataObj.islike = !this.dataObj.islike
				//将最新的时间赋值给likeTime方便阻止用户下次继续过于密集点赞
				this.likeTime = Date.now()
				//调用likeFun函数，该函数的作用是，将文章ID作为参数，函数可以查询用户是否为此文章点过赞，如果点过，就减去点过的赞；反之则在数据库中增加对此文章的点赞。该函数主要负责将数据记录至数据库，上面的代码更多负责前端点赞状态的展示。
				likeFun(this.artID)
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

				display: flex;
				justify-content: space-around;
				align-items: center;

				.looper {
					width: 40rpx;
					height: 40rpx;
					margin-bottom: 20rpx;
					margin-right: -10rpx;

					image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
						border: 1rpx solid #c8c8c8
					}
				}

			}

			.text {
				font-size: 26rpx;

				.num {
					color: #0199FE;
				}
			}
		}
	}
</style>