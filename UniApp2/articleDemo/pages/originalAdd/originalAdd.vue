<template>
	<view class="file">
		<view class="uploadGroup">
			<view class="box" v-for="(item,index) in tempFiles" :key="index">
				<image :src="item.path" mode="aspectFill" @click="enlargeImg(index)"></image>
				<view class="close" @click="onClose(index)">
					X
				</view>
			</view>
			<view class="box add" @click="onAddRow" v-if="tempFiles.length<maxImgCount">+</view>
		</view>
		<view class="submitbtn">
			<button size="mini" type="default" @click="onUpload">点击上传</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				tempFiles: [],
				maxImgCount: 9,
				picArr:[]
			}
		},
		methods: {
			onUpload() {
				let newsArr=this.tempFiles.map(async item=>{
					return await this.uploadSingleImg(item)
				})
				Promise.all(newsArr).then(res=>{
					console.log(res)
					let arr=res.map(item=>{
						return item.fileID
					})
					this.picArr=arr
					console.log(this.picArr)
				})
			},
			uploadSingleImg(item) {
				return uniCloud.uploadFile({
					filePath: item.path,
					cloudPath: item.name
				})
			},
			onAddRow() {
				uni.chooseImage({
					count: 9,
					success: res => {
						console.log(res)
						let oldImgArr = this.tempFiles
						let newImgArr = [...oldImgArr, ...res.tempFiles]
						newImgArr.slice(0, this.maxImgCount)
						this.tempFiles = newImgArr
					}
				})
			},
			onClose(id) {
				console.log(id)
				this.tempFiles.splice(id, 1)
			},
			enlargeImg(index) {
				console.log(index)
				let arr=this.tempFiles.map(item=>{
					return item.path
				})
				uni.previewImage({
					urls: arr,
					current: index
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uploadGroup {
		padding: 30rpx;
		padding-bottom: 15rpx;
		display: flex;
		flex-wrap: wrap;



		.box {
			width: 200rpx;
			height: 200rpx;
			background-color: #eee;
			margin-right: 15rpx;
			margin-bottom: 15rpx;
			position: relative;

			image {
				width: 100%;
				height: 100%;
			}

			.close {
				position: absolute;
				right: 0;
				top: 0;
				width: 60rpx;
				height: 60rpx;
				background-color: rgba(0, 0, 0, 0.8);
				border-radius: 0 0 0 40rpx;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		.add {
			font-size: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #888;
		}


	}

	.submitbtn {
		padding: 0 30rpx;
	}
</style>