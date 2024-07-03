<template>
	<view class="home">
		<view class="topnavu">
			<u-tabs :list="navList" 
			:activeStyle="{
				color:'#333',
				fontWeight:'bold',
				transform:'scale(1.05)'
			}"
			@click="clickNav"></u-tabs>
		</view>
		<view class="content">
			主体部分
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navList: [{
						name: "最新"
					},
					{
						name: "热门"
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			clickNav(e) {
				console.log(e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home {}
</style>