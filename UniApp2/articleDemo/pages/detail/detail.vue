<template>
	<view class="detail">
		<view class="" v-if="isLoading">
			<view class="title">
				{{newsObj.title}}
			</view>
			<view class="topinfo">
				<view class="author">
					作者：{{newsObj.author}}
				</view>
				<view class="posttime">
					发布时间：<uni-dateformat :date="newsObj.posttime" format="yyyy-MM-dd hh:mm:ss"
						:threshold="[60000,7200000]"></uni-dateformat>
				</view>
			</view>
			<view class="content">
				{{newsObj.content}}
			</view>
			<view class="bottomconsole">
				<view class="edit">
					<button size="mini" @click="onEdit">编辑</button>
				</view>
				<view class="delete">
					<button size="mini" type="warn" @click="onRemove">删除</button>
				</view>
			</view>
		</view>
		<view class="" v-else>
			<uni-load-more status="loading"></uni-load-more>
		</view>
	</view>
</template>

<script>
	let id;
	export default {
		data() {
			return {
				newsObj: {},
				isLoading: false
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
				this.newsObj = res.result.data[0]
				this.isLoading = true
				uni.setNavigationBarTitle({
					title: this.newsObj.title
				})
			})
		},
		methods: {
			onEdit() {
				uni.navigateTo({
					url: `/pages/edit/edit?id=${id}`
				})
			},
			onRemove() {
				uni.showModal({
					content: "是否确认删除记录？",
					success: res => {
						if (res.confirm) {
							this.reMoveFunc()
						}
					}
				})

			},
			reMoveFunc() {
				uniCloud.callFunction({
					name: "art_del_row",
					data: {
						id
					}
				}).then(res => {
					console.log(res)

					uni.showToast({
						title: "删除成功"
					});
					setTimeout(() => {
						uni.reLaunch({
							url: "/pages/index/index"
						})
					}, 400);

				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detail {
		padding: 30rpx;

		.title {
			font-size: 50rpx;
			color: #3f3f3f;
			margin-bottom: 30rpx;
			font-weight: bold;
		}

		.topinfo {
			font-size: 24rpx;
			color: #8f8f8f;
			margin-bottom: 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.content {
			font-size: 30rpx;
			color: #666666;
			line-height: 1.7em;
			margin-bottom: 30rpx;
		}

		.bottomconsole {
			font-size: 24rpx;
			color: #8f8f8f;
			margin-bottom: 30rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
		}
	}
</style>