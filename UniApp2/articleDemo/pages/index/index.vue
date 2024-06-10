<template>
	<view class="content">
		<view class="row" v-for="item in newsArr" :key="item._id">
			<view class="pic">
				<image src="../../static/logo.png" mode="aspectFill"></image>
			</view>
			<view class="article">
				<view class="title">
					{{item.title}}
				</view>
				<view class="bottom">
					<view class="author">
						{{item.author}}
					</view>
					<view class="hits">
						{{item.posttime}}
					</view>
					<view class="delete">
						删除
					</view>
				</view>
			</view>

		</view>
		<view class="goedit" @click="goAdd">
			+
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newsArr: []
			}
		},
		onLoad() {
			this.get_article()
		},
		methods: {
			goAdd() {
				uni.navigateTo({
					url: "../add/add"
				})
			},
			get_article() {
				uniCloud.callFunction({
					name: "art_get_all"
				}).then(res => {
					// console.log(res)
					this.newsArr=res.result.data
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 30rpx;

		.row {
			.pic {
				width: 300rpx;
				height: 200rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			padding-bottom: 30rpx;
			display: flex;
			justify-content: space-between;
			margin-bottom: 30rpx;
			border-bottom: 1rpx dashed #ccc;

			.article {
				display: flex;
				flex: 1;
				flex-direction: column;
				justify-content: space-between;
				margin-left: 20rpx;

				.title {
					font-size: 34rpx;
					word-break: break-all;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
				}

				.bottom {
					display: flex;
					justify-content: space-between;
					font-size: 22rpx;
					color: #a3a3a3;
				}
			}
		}

		.goedit {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			background-color: #119c1f;
			font-size: 50rpx;
			color: #ffffff;
			display: flex;
			justify-content: center;
			align-items: center;
			position: fixed;
			right: 60rpx;
			bottom: 100rpx;
			box-shadow: 0 0 20rpx rgba(43, 153, 57, 0.7);
		}
	}
</style>