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
				<view class="btn" :class="dataObj.isLike?'only':''" @click="clickLike">
					<text class="iconfont icon-a-106-xihuan"></text>
					<text v-if="dataObj.like_count">{{dataObj.like_count}}</text>
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
			<view class="comment">
				<view style="padding-bottom:50rpx" v-if="!commentList.length && noComment">
					<u-empty mode="comment" icon="https://cdn.uviewui.com/uview/empty/comment.png">
					</u-empty>
				</view>
				<view class="content" v-if="commentList.length">
					<view class="item" v-for="item in commentList">
						<comment-item :item="item" @removeEnv="PremoveEnv"></comment-item>
					</view>
				</view>
			</view>
			<comment-frame :commentObj="commentObj" @commentEnv="PcommentEnv"></comment-frame>
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
				artid: "",
				isloadingState: true,
				dataObj: {},
				tagStyleObj: {
					img: "border-radius:20rpx;margin-bottom:15rpx;",
					p: "line-height: 1.6em;"
				},
				likeTime: null,
				likeUserArr: [],
				commentObj: {
					article_id: "",
					comment_type: 0
				},
				commentList: [],
				noComment: false
			};
		},
		onLoad(e) {
			if (!e.id) {
				this.errFunc()
				return
			}
			this.artid = e.id
			this.getData()
			this.viewUpdate()
			this.commentObj.article_id = e.id
			this.getComment()
			//收集一共多少用户点赞了这篇文章
			this.getUserLike()
		},
		methods: {
			//删除评论后的回调
			PremoveEnv(e) {
				// console.log(e);
				let index = this.commentList.findIndex(item => {
					return item._id == e
				})
				this.commentList.splice(index, 1)
				this.noComment = this.commentList.length ? false : true
			},
			//评论完毕后回调，在父级页面评论列表数组增加记录
			PcommentEnv(e) {
				// console.log(e)
				this.commentList.unshift({
					...this.commentObj,
					...e,
					user_id: [store.userInfo]
				})
			},
			async getComment() {
				let commentTemp = db.collection("quanzi-comment").where(`article_id=="${this.artid}"&&comment_type==0`)
					.getTemp()
				let userTemp = db.collection("uni-id-users").field("_id,username,nickname,avatar_file").getTemp()
				let res = await db.collection(commentTemp, userTemp).orderBy("comment_date desc").limit(10).get()
				console.log(res)
				let idArr = res.result.data.map((item) => {
					return item._id;
				});
				console.log(idArr)
				let replyArr = await db
					.collection("quanzi-comment")
					.where({
						reply_comment_id: db.command.in(idArr),
					})
					.groupBy("reply_comment_id")
					.groupField("count(*) as totalReply")
					.get();
				console.log(replyArr)
				//res.result.data是本文所有的一级回复对象组成的数组
				res.result.data.forEach((item) => {
					let index = replyArr.result.data.findIndex((find) => {
						return find.reply_comment_id == item._id;
					});
					if (index > -1){item.totalReply = replyArr.result.data[index].totalReply}
				});
				this.commentList = res.result.data
				if (res.result.data.length == 0) {
					this.noComment = true
				}
			},
			getUserLike() {
				//在点赞表中查询文章ID符合要求的记录，首页传文章ID过来，和表里的article_id能对应上就选中之
				let likeTemp = db.collection("quanzi_like").where(`article_id=="${this.artid}"`).getTemp()
				//在用户表里查询所有的_id和avatar_file字段，其中_id用来关联主表里的user_id，其下将具有avatar_file字段，
				let userTemp = db.collection("uni-id-users").field("_id,avatar_file").getTemp()
				//联合查询上面的两张表，将符合要求的文章下的所有赞里的头像信息都导出
				db.collection(likeTemp, userTemp).limit(5).get().then(res => {
					//将导出信息赋值给likeUserArr
					this.likeUserArr = res.result.data
					this.likeUserArr = this.likeUserArr.reverse()
				})
			},
			getUserAvatar,
			getUserName,
			likeFun,
			getData() {
				let artTemp = db.collection("quanzi_article").where(`_id=="${this.artid}"`)
					.getTemp()
				let userTemp = db.collection("uni-id-users").field("_id,username,nickname,avatar_file").getTemp()
				let likeTemp = db.collection("quanzi_like").where(`user_id==$cloudEnv_uid`).getTemp()
				let tempArr = [artTemp, userTemp]
				if (store.hasLogin) {
					tempArr.push(likeTemp)
				}
				db.collection(...tempArr).get({
					getOne: true
				}).then(res => {
					// console.log(res)
					if (!res.result.data) {
						this.errFunc()
						return
					}
					this.isloadingState = false
					let isLike = false
					if (store.hasLogin) {
						isLike = res.result.data._id.quanzi_like.length ? true : false
					}
					res.result.data.isLike = isLike
					this.dataObj = res.result.data
					uni.setNavigationBarTitle({
						title: this.dataObj.title
					})
				}).catch(err => {
					console.log(err)
					this.errFunc()
					return
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
				utilsObj.operation("quanzi_article", "view_count", this.artid, 1).then(res => {
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
				this.dataObj.isLike ? this.dataObj.like_count-- : this.dataObj.like_count++
				//点赞后将当前dataObj.islike数据取反并赋值给自己
				this.dataObj.isLike = !this.dataObj.isLike
				//将最新的时间赋值给likeTime方便阻止用户下次继续过于密集点赞
				this.likeTime = Date.now()
				//调用likeFun函数，该函数的作用是，将文章ID作为参数，函数可以查询用户是否为此文章点过赞，如果点过，就减去点过的赞；反之则在数据库中增加对此文章的点赞。该函数主要负责将数据记录至数据库，上面的代码更多负责前端点赞状态的展示。
				await likeFun(this.artid)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detail {

		padding: 30rpx;
		background-color: #fff;
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

		.comment {
			padding: 30rpx;
			padding-bottom: 120rpx;

			.item {
				padding-bottom: 15rpx;
				padding-top: 15rpx;
				border-bottom: 1rpx dashed #eee;
			}
		}
	}
</style>