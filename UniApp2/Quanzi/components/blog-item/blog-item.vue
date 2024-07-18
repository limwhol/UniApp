<template>
	<view class="blogItem">
		<view class="head">
			<view class="leftElements">
				<view class="avatar">
					<image :src="getUserAvatar(item)"></image>
				</view>
				<view class="userName">
					{{getUserName(item)}}
				</view>
				<view class="postTime">
					<uni-dateformat :date="item.publish_date" format="MM月dd hh:mm"
						:threshold="[60000,3600000*24*30]"></uni-dateformat>发布于{{item.province}}
				</view>
			</view>
			<view class="rightElements">
				<view class="threeDots" @click="clickMore">
					<text class="iconfont icon-ellipsis"></text>
				</view>
			</view>
		</view>
		<view class="body">
			<view class="title" @click="toDetail(item._id)">
				{{item.title}}
			</view>
			<view class="content" @click="toDetail(item._id)" v-if="item.description">
				{{item.description}}
			</view>
			<view class="piclist">
				<view class="pic" :class="item.picurls.length==1?'only':''" v-for="(pic,index) in item.picurls"
					:key="index" v-if="item.picurls.length">
					<image :src="pic" mode="aspectFill" @click="enlargePic(index)"></image>
				</view>
			</view>

		</view>
		<view class="info">
			<view class="hits">
				<text class="iconfont icon-a-27-liulan"></text>{{item.view_count}}
			</view>
			<view class="comments" @click="toDetail(item._id)">
				<text class="iconfont icon-a-5-xinxi"></text>{{item.comment_count?item.comment_count:"评论"}}
			</view>
			<view class="like" :class="item.isLike?'active':''" @click="clickLike()">
				<text class="iconfont icon-a-106-xihuan"></text>{{item.like_count?item.like_count:"点赞"}}
			</view>
			<view class="">
				{{item.isLike?"true":"false"}}
			</view>
		</view>
		<u-action-sheet @select="sheetSelect" @close="sheetClose" :actions="list" cancelText="取消" :show="sheetShow"
			:closeOnClickOverlay="true" :closeOnClickAction="true"></u-action-sheet>
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
	export default {
		name: "blog-item",
		data() {
			return {
				list: [{
						name: '修改',
						type: "edit",
						disabled: true
					},
					{
						name: '删除',
						type: "delete",
						color: "#dd0606",
						disabled: true
					}
				],
				sheetShow: false
			}
		},
		props: {
			item: {
				type: Object,
				default () {
					return {}
				},
			isLike:Boolean,
			like_count:Number
			}
		},
		methods: {
			async clickLike() {
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
				let time = Date.now()
				if (time - this.likeTime < 2000) {
					uni.showToast({
						title: "操作频繁…",
						icon: 'error'
					})
					return
				}
				this.likeTime = Date.now()
				this.item.isLike ? this.item.like_count-- : this.item.like_count++
				this.item.isLike = !this.item.isLike
				likeFun(this.item._id)
			},
			clickMore() {
				let id = uniCloud.getCurrentUserInfo().uid
				this.sheetShow = true
				console.log(id)
				if (id == this.item.user_id[0]._id || this.uniIDHasRole('admin') || this.uniIDHasRole('webAdmin')) {
					for (let i = 0; i < this.list.length; i++) {
						this.list[i].disabled = false
					}
				}
			},
			sheetSelect(e) {
				this.sheetShow = false
				let type = e.type
				if (type == "delete") {
					this.delFunc()
				}
				if (type == "edit") {
					this.editFunc()
				}
				console.log("type is " + type)
			},
			delFunc() {
				uni.showModal({
					title: "是否删除文章?",
					success: res => {
						if (res.confirm) {
							db.collection("quanzi_article").doc(this.item._id).update({
								delstate: true
							}).then(res => {
								uni.showToast({
									title: "删除成功",
									icon: "none"
								})
								this.$emit("delEvent", true)
							}).catch(err => {
								console.log(err)
							})
						}
					}
				})
			},
			editFunc() {
				uni.navigateTo({
					url: "#"
				})
			},
			sheetClose() {
				this.sheetShow = false
			},
			getUserAvatar,
			getUserName,
			likeFun,
			enlargePic(id) {
				uni.previewImage({
					urls: this.item.picurls,
					current: id
				})
			},
			toDetail(e) {
				uni.navigateTo({
					url: `/pages/details/details?id=${e}`
				});
			}
		}
	}
</script>

<style lang="scss">
	.blogItem {
		margin-bottom: 30rpx;
		border-bottom: 20rpx solid #f8f8f8;

		.head {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;

			.leftElements {
				display: flex;
				justify-content: space-between;
				align-items: center;


				.avatar {
					width: 40rpx;
					height: 40rpx;
					padding-right: 10rpx;

					image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}

				.userName {
					padding-right: 10rpx;
					padding-left: 10rpx;
					font-size: 26rpx;
					color: #333333;
				}

				.postTime {
					padding-right: 10rpx;
					padding-left: 10rpx;
					font-size: 26rpx;
					color: #999999;
				}
			}

			.rightElements {
				.threeDots {
					font-size: 26rpx;
				}
			}

		}

		.body {
			.title {
				font-size: 38rpx;
				margin-top: 20rpx;
				margin-bottom: 20rpx;
				font-weight: bold;
				line-height: 1.4em;
			}

			.content {
				font-size: 26rpx;
				margin-bottom: 20rpx;
				color: #666;
				line-height: 1.8em;
			}

			.piclist {
				display: flex;

				.pic {
					margin-bottom: 20rpx;
					width: 220rpx;
					height: 220rpx;
					overflow: hidden;
					margin-right: 5rpx;

					&:first-child {
						border-radius: 20rpx 0rpx 0rpx 20rpx;
					}

					&:last-child {
						border-radius: 0rpx 20rpx 20rpx 0rpx;
					}

					&.only {
						border-radius: 20rpx;
					}

					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		.info {
			display: flex;
			justify-content: space-around;
			align-items: center;
			margin-bottom: 20rpx;
			font-size: 26rpx;
			color: #666;

			.hits {
				display: flex;
				justify-content: center;
				align-items: center;

				.iconfont {
					margin-right: 10rpx;
				}
			}

			.comments {
				display: flex;
				justify-content: center;
				align-items: center;

				.iconfont {
					margin-right: 10rpx;
				}
			}

			.like {
				display: flex;
				justify-content: center;
				align-items: center;

				.iconfont {
					margin-right: 10rpx;
				}

			}

			.like.active {
				color: #0199FE;
			}
		}
	}
</style>