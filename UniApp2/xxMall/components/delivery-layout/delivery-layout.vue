<template>
	<view class="delivery">
		<view class="headNav">
			外送
		</view>
		<view class="body">
			<view class="box" @click="goAddress">
				<view class="left">收货地址</view>
				<view class="center">
					<view v-if="deliveryInfo.address">
						<view class="detail">{{deliveryInfo.address}}</view>
						<view class="userinfo">{{deliveryInfo.username}} - {{deliveryInfo.mobile}}</view>
					</view>
					<view class="addressTxt" v-else>请添加收货地址</view>
				</view>	
				<view class="right"><u-icon name="arrow-right" size="18" color="#999"></u-icon></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"delivery-layout",
		data() {
			return {
				deliveryInfo:{
					address:"广东省深圳市南山区前海路诺德国际",
					username:"李秋风",
					mobile:18601943690
				}
			};
		},
		methods:{
			goAddress(){
				uni.navigateTo({
					url:"/pages/address/list"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.delivery{
	.headNav{
		width: 100%;
		height: 78rpx;
		background-color: #fff;
		@include flex-box-set();
		color: $brand-theme-color;
		border-radius: 15rpx 15rpx 0 0;
	}
	.body{
		background-color: #fff;
		padding: 25rpx;
		.box{
			padding: 40rpx 20rpx;
			background-color: $page-bg-color;
			@include flex-box();
			border-radius: 10rpx;
			font-size: 30rpx;
			.center{
				flex: 1;
				padding: 0 30rpx;
				font-size: 26rpx;
				.userinfo{
					padding-top: 10rpx;
				}
			}
		}
	}
}
</style>