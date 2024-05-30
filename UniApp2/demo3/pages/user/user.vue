<template>
	<view>
		<view class="top">
			<view class="topbox">
				<image src="../../static/images/member.png" mode="aspectFill" class="topimage"></image>
			</view>

		</view>
		<view class="user">
			<view class="row" v-for="item in newsArr" :key="item.id">
				<newsbox :item="{title:item.title,author:item.author,picurl:item.picurl,posttime:item.posttime}"
					@click.native="getDetails(item.id)" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newsArr: []
			};
		},
		methods: {
			getDetails(e) {
				uni.navigateTo({
					url: `/pages/detail/detail?id=${e}`
				})
			},
			getNewsData() {
				uni.request({
					url: "https://ku.qingnian8.com/dataApi/news/newslist.php",
					success: res => {
						console.log(res)
						this.newsArr = res.data
					}
				})
			}
		},
		onLoad() {
			this.getNewsData()
		}

	}
</script>

<style lang="scss">
	.top {
		background-color: #ffffff;

		.topbox {
			height: 250rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.topimage {
				width: 150rpx;
				height: 150rpx;
			}
		}


	}

	.user {
		padding: 0rpx 30rpx;

		.row {
			margin-bottom: 30rpx;
		}
	}
</style>