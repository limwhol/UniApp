<template>
	<view class="add">
		<form @submit="addRow">
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
				}
			};
		},
		methods: {
			addRow(e) {
				let detail = e.detail.value
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