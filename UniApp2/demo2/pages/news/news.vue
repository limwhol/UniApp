<template>
	<view>
<!-- 		<view>ShowTabar</view>
		<view class="" v-for="item in imgUrl" :key="item.id">
		<image :src="item.url" mode="aspectFill" @click="changeImg"></image>	
		</view> -->
		<view class="outbox" v-for="item in imgUrl" :key="item.id" @click="toDetails(item.id)">
				<view class="inner">
					<view class="title">
						{{item.title}}
					</view>
					<view class="body">
						{{item.body}}
					</view>
				</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl:[]
			};
		},
		methods:{
			changeImg(){
				uni.showLoading({
					title:"数据加载中...",
					mask:true
				})
				uni.request({
					url:"http://jsonplaceholder.typicode.com/posts/",
					success:res=> {
						this.imgUrl=res.data
					}
					,complete:()=>{
						uni.hideLoading() 
					}
				})
			},
			toDetails(e){
				uni.navigateTo({
					url:"/pages/details/details?id="+e
				})
			}
		},
		onLoad() {
			this.changeImg()
			uni.setStorageSync("kelly",{name:"妈妈",gender:"女性"})
		}
	}
</script>

<style lang="scss">
.outbox{
	padding: 10rpx 30rpx;
	.inner{
		border-bottom: 1rpx dashed #c3c3c3;
		.title{
			font-size: 40rpx;
			font-weight: bold;
			color: #636363;
			padding-bottom: 12rpx;
		}
		.body{
			font-size: 26rpx;
			color: #737373;
			padding-bottom: 30rpx;
		}
	}
}
</style>
