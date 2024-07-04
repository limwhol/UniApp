<template>
	<view class="blogItem">
		<view class="head">
			<view class="leftElements">
				<view class="avatar">
					<image src="@/static/images/logo1.png"></image>
				</view>
				<view class="userName">
					膜翅单倍体
				</view>
				<view class="postTime">
					<uni-dateformat :date="Date.now()" format="MM月dd hh:mm"
						:threshold="[60000,3600000*24*30]"></uni-dateformat>
				</view>
			</view>
			<view class="rightElements">
				<view class="threeDots">
					...
				</view>
			</view>
		</view>
		<view class="body">
			<view class="title">
				“低调的丛林特种兵” - 横纹齿猛蚁 Odontoponera transversa 经验分享&&记录
			</view>
			<view class="content">
				横纹齿猛蚁（Odontoponera
				transversa）所在的齿猛蚁属分类鉴定一直相对模糊，但齿猛蚁属算得上是我国华南地区分布最为广泛，最为常见的猛蚁之一。其属下现存种在国内有分布的两个成员为横纹齿猛蚁和齿唇齿猛蚁。参考中国蚁网中该属的分布范围作为权威资料，在海南有分布的只有前者，因此暂认定本贴中为横纹齿猛蚁。


			</view>
			<view class="piclist">
				<view class="pic" :class="picArr.length==1?'only':''" v-for="item in picArr">
					<image src="../../static/images/1.png" mode="aspectFill"></image>
				</view>
			</view>

		</view>
		<view class="info">
			<view class="hits">
				<text class="iconfont icon-faxian"></text> 231
			</view>
			<view class="comments">
				<text class="iconfont icon-xiaoxi"></text>
			</view>
			<view class="like">
				<text class="iconfont icon-zan"></text> 76
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "blog-item",
		data() {
			return {
				picArr: [1, 2]
			};
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
				.iconfont{
					margin-right: 6rpx;
				}
			}

			.comments {
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.like {
				display: flex;
				justify-content: center;
				align-items: center;
				.iconfont{
					margin-right: 6rpx;
				}
			}
		}
	}
</style>