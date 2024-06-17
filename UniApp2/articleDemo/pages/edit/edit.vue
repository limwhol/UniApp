<template>
	<view class="edit">
		<form @submit="editRow">
			<view class="item">
				<uni-file-picker ref="files" :image-styles="imgStyle" v-model="imageValue" fileMediatype="image"
					file-extname="jpg,png,webp,gif" mode="grid" @select="select" @success="success" @fail="fail"
					@delete="onDelete" />
			</view>
			<view class="item">
				<input v-model="formvalue.title" type="text" name="title" placeholder="输入标题" />
			</view>
			<view class="item">
				<input v-model="formvalue.author" type="text" name="author" placeholder="输入作者" />
			</view>
			<view class="item">
				<textarea v-model="formvalue.content" name="content" placeholder="输入内容" />
			</view>
			<view class="item">
				<button form-type="submit" type="primary"
					:disabled="!formvalue.title||!formvalue.author||!formvalue.content||imageValue.length<1">Submit</button>
				<button form-type="reset" type="default">Reset</button>
			</view>
		</form>
	</view>
</template>

<script>
	let id;
	export default {
		data() {
			return {
				formvalue: {
					title: "",
					author: "",
					content: "",
					fileUrl: []
				},
				newsObj: {},
				imageValue: [],
				imgStyle: {
					"width": 80,
					"height": 80,
					"border": {
						"color": "#eee",
						"width": "1px",
						"style": "solid",
						"radius": "10%"
					}
				}
			};
		},

		onLoad(e) {
			id = e.id
			uniCloud.callFunction({
				name: "art_get_row",
				data: {
					id
				}
			}).then(res => {
				// console.log(res)
				this.formvalue = res.result.data[0]
				if (!this.formvalue.fileUrl) {
					return
				}
				let urls = this.formvalue.fileUrl.map(item => {
					return {
						url: item
					}
				})
				this.imageValue = urls
				uni.setNavigationBarTitle({
					title: res.result.data[0].title
				})
			})
		},
		methods: {
			onDelete(e) {
				console.log(e)
				this.formvalue.fileUrl.splice(e.index, 1)
				console.log('第'+e.index+'个图片移除',this.formvalue.fileUrl)
			},
			upload() {
				this.$refs.files.upload()
			},
			select(e) {
				console.log(e)
				let oldlist = this.formvalue.fileUrl
				let newlist = [...oldlist, ...e.tempFilePaths]
				this.formvalue.fileUrl = newlist
				console.log('新增了1个图片',this.formvalue.fileUrl)
			},
			// 获取上传进度
			progress(e) {
				console.log('上传进度：', e)
			},
			// 上传成功
			success(e) {
				console.log('上传成功', e)
			},

			// 上传失败
			fail(e) {
				console.log('上传失败：', e)
			},
			editRow() {
				console.log(this.formvalue)
				uniCloud.callFunction({
					name: "art_edit_row",
					data: {
						detail: this.formvalue
					}
				}).then(res => {
					uni.showToast({
						title: "更新成功"
					});
					setTimeout(() => {

					}, 1500);
					uni.reLaunch({
						url: `/pages/detail/detail?id=${id}`
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.edit {
		padding: 30rpx;

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