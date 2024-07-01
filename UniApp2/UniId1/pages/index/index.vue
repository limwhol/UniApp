<template>
	<view class="content">
<!-- 		<view class="row" v-for="item in articleArr" :key="item._id">
			<view class="title">{{item.title}}</view>
			<view class="author">{{item.author}}</view>
			<view class="content">{{item.content}}</view>
		</view> -->
		<view class="">
			<button @click="addData">增加文章</button>
			<button @click="goRegister">登录页面</button>
			<button @click="goUserinfo">个人中心</button>
		</view>
	</view>
</template>

<script>
	// const cloudObj1=uniCloud.importObject("cloudObj1")
	const db=uniCloud.database()
	export default {
		data() {
			return {
				// articleArr: []
			}

		},

		onLoad() {
			this.getData()
		},
		methods: {
			getData() {
				// cloudObj1.get(2).then(res=>{
				// 	// console.log(res)
				// })
				// uniCloud.callFunction({
				// 	name: "cloudFun1",
				// 	data:{
				// 		num:2
				// 	}
					
				// }).then(res => {
				// 	// console.log(res)
				// 	this.articleArr=res.result.data
				// })
				db.collection("article").get().then(res=>{
					// console.log(res)
				}).catch(err=>{
					// console.log(err.message)
					uni.showToast({
						title:err.message,
						icon:'none'
					})
				})
			},
			addData(){
				// cloudObj1.add().then(res=>{
				// 	console.log(res)
				// })
				db.collection("article").add({
					title:"张华",
					content:"真牛逼"
				}).then(res=>{
					console.log(res)
				})
			},
			goRegister(){
				uni.navigateTo({
					url:"/uni_modules/uni-id-pages/pages/login/login-withpwd"
				})
			},
			goUserinfo(){
				uni.navigateTo({
					url:"/uni_modules/uni-id-pages/pages/userinfo/userinfo"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 30rpx;
		.row{
			
			line-height: 1.6em;
			color: #999;
		}
	}
</style>