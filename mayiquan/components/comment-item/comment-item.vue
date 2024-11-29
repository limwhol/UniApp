<template>
	<view>
		<view class="comment-item" @click="goReply">
			<view class="avatar">
				<u-avatar :src="getUserAvatar(item)" size="26"></u-avatar>
			</view>

			<view class="wrap">
				<view class="username">
					{{getUserName(item)}}
					<text v-if="!closeBtn" class="iconfont icon-a-43-guanbi" @click.stop="delComment"></text>
				</view>
				<view class="comment-content">{{item.comment_content}}</view>
				<view class="info">
					<view class="reply-btn" v-if="!childState">{{item.totalReply || ''}}回复 </view>
					<view>
						<uni-dateformat :date="item.comment_date" :threshold="[60000,3600000*24*30]">
						</uni-dateformat>
					</view>
					<view>{{item.province}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const db = uniCloud.database()
	import {
		getUserAvatar,
		getUserName
	} from "../../utils/tools.js"
	const utilsObj = uniCloud.importObject("utilsObj", {
		customUI: true
	})
	export default {
		name: "comment-item",
		data() {
			return {


			};
		},
		props: {
			item: {
				type: Object,
				default () {
					return {}
				}
			},
			childState: {
				type: Boolean,
				default: false,
			},
			closeBtn: {
				type: Boolean,
				default: false,
			}
		},
		methods: {
			getUserAvatar,
			getUserName,
			delComment() {
				let id = uniCloud.getCurrentUserInfo().uid
				if (id == this.item.user_id[0]._id || this.uniIDHasRole('admin') || this.uniIDHasRole('webAdmin')) {
					this.removeComment()
				} else {
					uni.showToast({
						title: "权限不足",
						icon: "error"
					})
				}
			},
			removeComment() {
				uni.showModal({
					title: "是否删除评论?",
					success: res => {
						if (res.confirm) {
							db.collection("quanzi-comment").doc(this.item._id).remove().then(res => {
								uni.showToast({
									title: "删除成功",
									icon: "success"
								})
								this.reduceCom()
								this.$emit("removeEnv", this.item._id)
							}).catch(err => {
								console.log(err)
							})
						}
					}
				})
			},
			reduceCom() {
				utilsObj.operation("quanzi_article", "comment_count", this.item.article_id, -1).then(res => {
					// console.log(res)
				})
			},
			goReply() {
				if(!this.childState){
					uni.setStorageSync("replyItem", this.item)
					uni.navigateTo({
						url: "/pages/reply/reply"
					})
				}
			},

		}
	}
</script>

<style lang="scss" scoped>
	.comment-item {
		display: flex;
		// border-bottom: 1rpx dashed #e3e3e3;

		.avatar {
			padding-top: 10rpx;
			// background-color: #990c1f;
		}

		.wrap {
			flex: 1;
			padding-left: 20rpx;
			padding-bottom: 20rpx;
			// background-color: #999;

			.username {
				font-size: 26rpx;
				color: #666;
				padding: 10rpx 0;
				display: flex;
				align-items: center;
				justify-content: space-between;
				// background-color: #719943;

				.iconfont {
					font-size: 20rpx;
					padding: 10rpx;
					color: #999;
				}
			}

			.comment-content {
				font-size: 26rpx;
				color: #111;
				line-height: 1.8em;
				// background-color: #995142;
			}

			.info {
				font-size: 26rpx;
				color: #666;
				display: flex;
				padding: 10rpx 0;
				align-items: center;
				// background-color: #751999;

				view {
					margin-right: 25rpx;
				}

				.reply-btn {
					padding: 6rpx 18rpx;
					background: #e4e4e4;
					border-radius: 30rpx;
				}
			}
		}
	}
</style>