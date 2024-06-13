<template>
	<view class="edit">
		<form @submit="editRow">
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
					:disabled="!formvalue.title||!formvalue.author||!formvalue.content">Submit</button>
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
					content: ""
				},
				newsObj: {}
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
				console.log(res)
				this.formvalue = res.result.data[0]
				uni.setNavigationBarTitle({
					title: res.result.data[0].title
				})
			})
		},
		methods: {
			editRow() {
				uniCloud.callFunction({
					name: "art_edit_row",
					data: {
						detail:this.formvalue
					}
				}).then(res => {
					uni.showToast({
						title: "更新成功"
					});
					setTimeout(() => {

					}, 1500);
					uni.reLaunch({
						url:`/pages/detail/detail?id=${id}`
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