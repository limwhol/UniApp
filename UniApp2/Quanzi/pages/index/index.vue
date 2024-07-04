<template>
	<view class="home">
		<view class="topnav">
			<u-tabs :list="navList" 
			:activeStyle="{
				color:'#333',
				fontWeight:'bold',
				transform:'scale(1.06)'
			}"
			@click="clickNav"></u-tabs>
		</view>
		<view class="loadingState" v-if="loadingState">
			<u-skeleton
				    rows="5"
				    title
					loading
					avatar
				></u-skeleton>
		</view>
		<view class="content">
			<view class="item" v-for="item in dataArr">
				<blog-item />
			</view>
		</view>
		<view class="edit">
			<text class="iconfont icon-xiugai" @click="goEdit"></text>
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
					},
					{
						name: "婚飞"
					},
					{
						name: "游戏"
					},
					{
						name: "鉴定"
					},
					{
						name: "论坛"
					}
				],
				loadingState:false,
				dataArr:[1,2,3]
			}
		},
		onLoad() {

		},
		methods: {
			clickNav(e) {
				console.log(e)
			},
			goEdit(){
				uni.navigateTo({
					url:"/pages/edit/edit"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home {
		.topnav{
			margin-bottom: 30rpx;
		}
		.loadingState{
			padding: 30rpx;
		}
		.content{
			padding: 30rpx;
		}
		.edit{
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			background-color: #0199FE;
			color: #ffffff;
			display: flex;
			z-index: 100;
			justify-content: center;
			align-items: center;
			position: fixed;
			right: 60rpx;
			bottom: 130rpx;
			box-shadow: 0 0 20rpx rgba(0, 153, 254, 0.1);
			.iconfont{
				font-size: 45rpx;
			}
		}
	}
</style>