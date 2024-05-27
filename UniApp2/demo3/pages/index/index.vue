<template>
	<view class="home">
		<view class="scrollNav">
			<scroll-view scroll-x="true" class="navscroll">
				<view class="item">国内</view>
				<view class="item">国内</view>
				<view class="item">国内</view>
				<view class="item">国内</view>
				<view class="item">国内</view>
				<view class="item">国内</view>
				<view class="item">国内</view>
				<view class="item">国内</view>
				<view class="item">国内</view>
				<view class="item">国内</view>
			</scroll-view>
		</view>
		<view class="content">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.home {
		.scrollNav{
			.navscroll{
				height: 100rpx;
				background-color: #f5f5f5;
				white-space: nowrap;
::-webkit-scrollbar {
    display: none;
}
				.item{
					font-size: 30rpx;
					display: inline-block;
					line-height: 100rpx;
					padding: 0 30rpx;
				}
			}
		}
	}
</style>
