<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:"js控制的标题"
			})
			uni.setNavigationBarColor({
				backgroundColor:"#999999",
				frontColor:"#ffffff"
			})
			uni.showNavigationBarLoading()
			setTimeout(()=>{
				uni.hideNavigationBarLoading()
			},1500)
		}
	}
</script>

<style lang="scss">

</style>
