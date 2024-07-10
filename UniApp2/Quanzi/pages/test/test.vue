<template>
	<view class="test">
		<view class="top">
			<view class="group">
大傻子
			</view>
			<view class="bg">
				<image src="../../static/images/2.jpg"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		},
		onLoad() {
			console.log('Hello World')
		}
	}
</script>

<style lang="scss">
	.test {

		.top {
			height: 600rpx;
			background: #bbb;
			padding:0 30rpx;
			padding-top:var(--status-bar-height);
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 48rpx;
			color: #fff;

			.group {
				position: relative;
				display: flex;
				align-items: center;
				z-index: 10;
			}

			.bg {
				position: absolute;
				top: 0;
				left:0;
				width: 100%;
				height: 100%;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
					filter: blur(20px);
					transform: scale(2);
					opacity: 0.5;
				}
			}
		}

	}
</style>