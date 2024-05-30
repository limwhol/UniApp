<template>
	<view>
		<view class="top">
			<view class="topbox">
				<image src="../../static/images/member.png" mode="aspectFill" class="topimage"></image>
			</view>

		</view>
		<view class="user">
			<view class="row" v-for="item in 10">
				<newsbox :item="{title:`用户界面标题`,author:`用户界面`,posttime:'2024-5-6'}" @click.native="getDetails" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods:{
			getDetails(e) {
				uni.navigateTo({
					url: "/pages/detail/detail"
				})
			}
		}
	}
</script>

<style lang="scss">
	.top {
		background-color: #ffffff;

		.topbox {
			height: 250rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.topimage{
				width: 150rpx;
				height: 150rpx;
			}
		}


	}

	.user {
		padding: 0rpx 30rpx;

		.row {
			border: 1rpx solid #cccccc;
			margin-bottom: 30rpx;
		}
	}
</style>