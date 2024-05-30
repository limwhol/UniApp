<template>
	<view class="detail">
		<view class="title">文章标题文章标题文章标题文章标题</view>
		<view class="info">
			<view class="author">
				作者：
			</view>
			<view class="time">
				2024-5-6
			</view>
		</view>
		<view class="picurl">
			<image src="../../static/images/index.png" mode="aspectFill"></image>
		</view>
		<view class="content">
			文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.detail {
		padding: 30rpx;

		.title {
			font-size: 30rpx;
			color: #333333;
			margin-bottom: 10rpx;
		}

		.info {
			margin-bottom: 10rpx;
			font-size: 26rpx;
			color: #999999;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.author {}

			.time {}
		}

		.picurl {
			margin-bottom: 10rpx;
		}
	}
</style>