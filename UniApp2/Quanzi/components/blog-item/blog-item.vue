<template>
	<view class="blogItem">
		<view class="head">
			<view class="leftElements">
				<view class="avatar">
					<image :src="item.user_id[0].avatar_file.url?item.user_id[0].avatar_file.url:'@/static/images/1.png'"></image>
				</view>
				<view class="userName">
					{{item.user_id[0].nickname?item.user_id[0].nickname:item.user_id[0].username}}
				</view>
				<view class="postTime">
					<uni-dateformat :date="item.publish_date" format="MM月dd hh:mm"
						:threshold="[60000,3600000*24*30]"></uni-dateformat>发布于{{item.province}}
				</view>
			</view>
			<view class="rightElements">
				<view class="threeDots">
					<text class="iconfont icon-more"></text>
				</view>
			</view>
		</view>
		<view class="body">
			<view class="title" @click="toDetail(item._id)">
				{{item.title}}
			</view>
			<view class="content" @click="toDetail(item._id)">
				{{item.description}}
			</view>
			<view class="piclist">
				<view class="pic" :class="item.picurls.length==1?'only':''" v-for="(pic,index) in item.picurls" :key="index">
					<image :src="pic" mode="aspectFill" @click="enlargePic(index)"></image>
				</view>
			</view>

		</view>
		<view class="info">
			<view class="hits">
				<text class="iconfont icon-faxian"></text>{{item.view_count}}
			</view>
			<view class="comments" @click="toDetail(item._id)">
				<text class="iconfont icon-xiaoxi"></text>{{item.comment_count?item.comment_count:"评论"}}
			</view>
			<view class="like">
				<text class="iconfont icon-zan"></text>{{item.like_count?item.like_count:"点赞"}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "blog-item",
		data() {
			return {}
		},
		props: {
			item: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		methods:{
			enlargePic(id){
				uni.previewImage({
					urls:this.item.picurls,
					current:id
				})
			},
			toDetail(e){
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
					font-size: 24rpx;
					color: #333333;
				}

				.postTime {
					padding-right: 10rpx;
					padding-left: 10rpx;
					font-size: 20rpx;
					color: #999999;
				}
			}

			.rightElements {
				.threeDots {
					font-size: 22rpx;
				}
			}

		}

		.body {
			.title {
				font-size: 34rpx;
				margin-top: 20rpx;
				margin-bottom: 20rpx;
				font-weight: bold;
				line-height: 1.4em;
			}

			.content {
				font-size: 24rpx;
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
			font-size: 22rpx;
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
		}
	}
</style>