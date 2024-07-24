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
	export default {
		name: "comment-item",
		data() {
			return {
				closeBtn: false,
				childState: false
			};
		},
		props: {
			item: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		methods: {
			getUserAvatar,
			getUserName,
			delComment() {
				db.collection("quanzi-comment").doc(this.item._id).remove()
			},
			goReply() {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.comment-item {
		display: flex;
		border-bottom: 1rpx dashed #e3e3e3;

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