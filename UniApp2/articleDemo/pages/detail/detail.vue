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
				<view class="picUrl" v-for="(item,index) in newsObj.fileUrl" :key="index">
					<image :src="item" mode="aspectFill" @click="showNewsImg(index)"></image>
				</view>
				{{newsObj.content}}
			</view>
			<view class="bottomconsole">
				<view class="item">
					<view class="" @click="onEdit">
						编辑
					</view>
				</view>
				<view class="item">
					<view class="" @click="backtoindex">
						返回首页
					</view>
				</view>
				<view class="item">
					<view class="" @click="onRemove">
						删除
					</view>
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
				// console.log(res)
				this.newsObj = res.result.data[0]
				this.isLoading = true
				uni.setNavigationBarTitle({
					title: this.newsObj.title
				})
			})
		},
		methods: {
			backtoindex() {
				uni.reLaunch({
					url: "/pages/index/index"
				})
			},
			showNewsImg(index) {
				uni.previewImage({
					urls: this.newsObj.fileUrl,
					current: index
				})
			},
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
					// console.log(res)

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

			.picUrl {
				margin-bottom: 30rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		.bottomconsole {
			font-size: 24rpx;
			color: #5b5b5b;
			margin-bottom: 30rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;

			.item {
				height: 14px;
				border-radius: 30rpx;
				background-color: #f0f0f0;
				padding: 10px;
				display: inline-block;
				white-space: nowrap;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.item:last-child {
			        background-color: #ffcc00; 
			    }
		}
	}
</style>