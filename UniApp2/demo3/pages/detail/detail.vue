<template>
	<view class="detail">
		<view class="title">{{newsObj.title}}</view>
		<view class="info">
			<view class="author">
				作者:{{newsObj.author}}
			</view>
			<view class="time">
				发布时间:{{newsObj.posttime}}
			</view>
		</view>
		<view class="picurl">
			<image :src="newsObj.picurl" mode="aspectFill"></image>
		</view>
		<view class="content">
			{{newsObj.content}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newsObj: {},
				options:null
			};
		},
		methods: {
			getNewsData() {
				uni.request({
					url: "https://ku.qingnian8.com/dataApi/news/detail.php",
					data:{
						cid:this.options.classid,
						id:this.options.id
					},
					success: res => {
						console.log(res)
						this.newsObj = res.data
					}
				})
			}
		},
		onLoad(e) {
			this.getNewsData()
			console.log(e)
			this.options=e
		}
	}
</script>

<style lang="scss">
	.detail {
		padding: 30rpx;

		.title {
			font-size: 46rpx;
			color: #333333;
			margin-bottom: 30rpx;
		}

		.info {
			margin-bottom: 30rpx;
			font-size: 26rpx;
			color: #999999;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #f1f1f1;
			padding: 20rpx;

			.author {}

			.time {}
		}

		.picurl {
			margin-bottom: 30rpx;
		}

		.content {
			color: #4f4f4f;
			font-size: 30rpx;
		}
	}
</style>