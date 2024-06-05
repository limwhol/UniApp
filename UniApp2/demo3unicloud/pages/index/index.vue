<template>
	<view class="out">
		<!-- <view class="textbox" v-for="item in userArr" :key="item._id">
			<view class="row">用户姓名 - {{item.name}}</view>
			<view class="row">用户性别 - {{item.gender}}</view>
			<view class="row">用户年龄 - {{item.age}}</view>
			<view class="row">用户电话 - {{item.tel}}</view>
		</view>
		<view class="data">
			一共查询到{{dataNumber}}条数据
		</view> -->
		<form @submit="onSubmit">
			<input type="text" name="name" />
			<input type="text" name="tel" />
			<button form-type="submit">Submit</button>
		</form>
		<view @click="showUserData">Refresh</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userArr: [],
				dataNumber: 0,
				cloudData: {}
			}
		},
		onLoad() {
		},
		methods: {
			onSubmit(e) {
				console.log(e)
				let userObj=e.detail.value
				uniCloud.callFunction({
					name:"addData",
					data:userObj
				}).then(res=>{
					console.log(res)
				})
			},
			showUserData(){
				uniCloud.callFunction({
					name:"cloudDemo1",
					data:{}
				}).then(res=>{
					console.log(res)
				})
			}
		}
	}
</script>

<style lang="scss">
	.out {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.textbox {
			border-bottom: 1rpx dashed #c6c6c6;
			padding: 30rpx;

			.row {
				width: 100%;
			}
		}

		.data {
			padding: 30rpx;
			text-align: center;
		}


	}
</style>