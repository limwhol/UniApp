<template>
	<view class="newsbox">
		<view class="content">
			<view class="pic">
				<image :src="item.picurl" mode="aspectFill"></image>
			</view>
			<view class="text">
				<view class="title">
					{{item.title}}
				</view>
				<view class="info">
					<text>作者：{{item.author}}</text>
					<text>浏览：{{item.hits}}</text>
				</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "newsbox",
		props: {
			item: {
				type: Object,
				default () {
					return {
						title: "默认的标题默认的标题默认的标题默认的标题默认的标题默认的标题默认的标题默认的标题默认的标题默认的标题",
						author: "李雨嘉",
						posttime: "2024-5-6",
						hits: 9962,
						picurl: "../../static/images/member.png",
						classid:0,
						id:0
					}
				}
			}
		},
		data() {
			return {
			};
		},
		methods: {
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		padding-bottom: 30rpx;
		border-bottom: 1rpx dashed #bebebe;

		.pic {
			width: 230rpx;
			height: 160rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.text {
			flex: 1;
			padding-left: 14rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;


			.title {
				font-size: 30rpx;
				color: #333333;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.info {
				font-size: 24rpx;
				color: #999999;
				display: flex;
				justify-content: space-between;

				text {
					padding-right: 30rpx;
				}
			}
		}
	}
</style>