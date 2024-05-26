<template>
	<view>
		<view class="" @click="clickUser">
			点击消除红点
		</view>
		<view class="" @click="removeKey">
			点击消除Key
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
			clickUser(){
				uni.removeTabBarBadge({
					index:2
				})
			},
			removeKey(){
				uni.removeStorageSync("kelly")
			}
		},
		onLoad() {
			uni.setTabBarItem({
				index:0,
				text:"首页"
			})
			let key=uni.getStorageSync("kelly")
			console.log(key)
		}
	}
</script>

<style lang="scss">

</style>
