<template>
	<view class="topLogo">
		<image src="../../static/images/antinsititueSmall.png" mode="aspectFit"></image>
	</view>
</template>

<script>
	export default {
		name:"site-head",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
		.topLogo {
			padding: 30rpx;
			display: flex;
			justify-content: center;
			background-color: #eaffee;

			image {
				width: 178rpx;
				height: 104rpx;
			}

		}
</style>