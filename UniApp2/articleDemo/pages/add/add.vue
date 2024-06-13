<template>
	<view class="add">
		<form @submit="addRow">
			<view class="itemtop">
				选择一张图片...
			</view>
			<view class="itemtop">
				<uni-file-picker ref="files" v-model="imageValue" limit="1" :auto-upload="false" fileMediatype="image" file-extname="jpg,png,webp,gif" mode="grid" @select="select"
					@progress="progress" @success="success" @fail="fail" />
			</view>
			<view class="item">
				<input v-model="formvalue.title" type="text" name="title" placeholder="Pls input title" />
			</view>
			<view class="item">
				<input v-model="formvalue.author" type="text" name="author" placeholder="Pls input author" />
			</view>
			<view class="item">
				<textarea v-model="formvalue.content" name="content" placeholder="Pls input content" />
			</view>
			<view class="item">
				<button form-type="submit" type="primary"
					:disabled="!formvalue.title||!formvalue.author||!formvalue.content">Submit</button>
				<button form-type="reset" type="default">Reset</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formvalue: {
					title: "",
					author: "",
					content: ""
				},
				imageValue: []
			};
		},
		methods: {
			// 获取上传状态
			upload(){
				this.$refs.files.upload()
			},
			select(e) {
				console.log('选择文件：', e)
			},
			// 获取上传进度
			progress(e) {
				console.log('上传进度：', e)
			},

			// 上传成功
			success(e) {
				console.log('上传成功')
			},

			// 上传失败
			fail(e) {
				console.log('上传失败：', e)
			},
			addRow(e) {
				let detail = e.detail.value;
				this.upload();
				uniCloud.callFunction({
					name: "art_add_row",
					data: {
						detail
					}
				}).then(res => {
					uni.showToast({
						title: "发布成功"
					});
					setTimeout(() => {

					}, 1500);
					uni.reLaunch({
						url: "/pages/index/index"
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.add {
		padding: 30rpx;

		.itemtop {
			margin: 20rpx 0rpx;
		}

		.item {

			input {
				box-sizing: border-box;
				width: 100%;
				padding: 10rpx;
				border: 1rpx solid #e5e5e5;
				height: 60rpx;
				margin: 30rpx 0rpx;
			}

			textarea {
				box-sizing: border-box;
				width: 100%;
				padding: 10rpx;
				border: 1rpx solid #e5e5e5;
				height: 400rpx;
				margin: 30rpx 0rpx;
			}

			button {
				margin-bottom: 20rpx;
			}
		}
	}
</style>