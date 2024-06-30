<template>
	<view class="content">
<!-- 		<view class="row" v-for="item in articleArr" :key="item._id">
			<view class="title">{{item.title}}</view>
			<view class="author">{{item.author}}</view>
			<view class="content">{{item.content}}</view>
		</view> -->
		<view class="">
			<button @click="addData">增加记录</button>
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
					console.log(res)
				})
			},
			addData(){
				// cloudObj1.add().then(res=>{
				// 	console.log(res)
				// })
				db.collection("users").add({
					name:"李秋风",
					tel:888888888
				}).then(res=>{
					console.log(res)
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