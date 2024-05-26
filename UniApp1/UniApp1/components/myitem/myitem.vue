<template>
	<view>
		<view class="item">
			这是myitem组件
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"myitem",
		props:["title"],
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.item{
	width: 200rpx;
	height: 200rpx;
	background-color: red;
	color: yellow;
}
</style>