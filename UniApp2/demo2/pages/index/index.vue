<template>
	<view class="content">
		<image class="logo" src="/static/logo.png" @click="tapImg"></image>
		<view class="text-area" @click="showModal">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				arr:["三国演义","红楼梦","水浒传","金瓶梅"]
			}
		},
		onLoad() {
			uni.showLoading({
				title:"程序加载中..."
			}),
			setTimeout(()=>{
				uni.hideLoading()
			},1000)
		},
		methods: {
			tapImg(){
				uni.showToast({
					title:"发布成功！",
					image:"../../static/logo.png",
					mask:true,
					duration:700
				})
			},
			showModal(){
				// uni.showModal({
				// 	title:"是否继续操作？",
				// 	content:"Janet`s a bitch",
				// 	editable:true,
				// 	success:res=>{
				// 		console.log(res)
				// 		if(res.confirm){
				// 			uni.navigateTo({
				// 				url:"/pages/demo1/demo1"
				// 			})
				// 		}else{
				// 			uni.showToast({
				// 				title:"操作取消",
				// 				icon:"none"
				// 			})
				// 		}
				// 	},
				// 	fail:err=>{
				// 		console.log(err)
				// 	}
				// })
				uni.showActionSheet({
					itemList:this.arr,
					success:(res)=>{
						console.log(this.arr[res.tapIndex])
					}
				})
			}
		},
		onLoad() {
			uni.setTabBarBadge({
				index:2,
				text:"3"
			})
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
