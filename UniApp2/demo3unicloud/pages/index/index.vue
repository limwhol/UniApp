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
		<view class="tijiao" @click="showUserData">Refresh</view>
		<view class="row" v-for="item in userArr" :key="item._id">
			<view class="">
				Name: {{item.name}}
			</view>
			<view class="">
				Tel: {{item.tel}}
			</view>
		</view>
		<view class="tijiao" @click="cloudDemoUpdate">cloudDemoUpdate</view>
		<view class="tijiao" @click="onRemove">onRemove</view>
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
			// this.cloudDemoGet()
			// this.cloudDemoUpdate()
		},
		methods: {
			onRemove() {
				uniCloud.callFunction({
					name: "cloudDemoRemove"
				}).then(res => {
					console.log(res)
				})
			},
			cloudDemoUpdate() {
				uniCloud.callFunction({
					name: "cloudDemoUpdate"
				}).then(res => {
					console.log(res)
					// this.userArr=res.result.data
				})
			},
			cloudDemoGet() {
				uniCloud.callFunction({
					name: "cloudDemoGet",
					data: {
						keyword: "Kelly"
					}
				}).then(res => {
					console.log(res)
					this.userArr = res.result.data
				})
			},
			onSubmit(e) {
				console.log(e)
				let userObj = e.detail.value
				uniCloud.callFunction({
					name: "addData",
					data: userObj
				}).then(res => {
					console.log(res)
				})
			},
			showUserData() {
				uniCloud.callFunction({
					name: "cloudDemo1",
					data: {}
				}).then(res => {
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

		.tijiao {
			width: 300rpx;
			height: 60rpx;
			border: 1rpx solid #c6c6c6;
			background-color: #dddddd;
			justify-content: center;
			display: flex;
			align-items: center;
			margin: 20rpx;
			border-radius: 15rpx;
		}

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

		.row {
			padding: 30rpx;
			border-bottom: 1rpx dashed #c6c6c6;
		}


	}
</style>