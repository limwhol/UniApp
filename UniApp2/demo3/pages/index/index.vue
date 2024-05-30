<template>
	<view class="home">
		<view class="scrollNav">
			<scroll-view scroll-x="true" class="navscroll">
				<view class="item" :class="index==navIndex?'active':''" v-for="(item,index) in 10"
					@click="onClickBtn(index)">
					按钮</view>
			</scroll-view>
		</view>
		<view class="content">
			<view class="row" v-for="item in 10">
				<newsbox :item="{title:`首页界面标题`,author:`首页`,hits:985211}" @click.native="getDetails"></newsbox>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navIndex: 0
			}
		},
		onLoad() {

		},
		methods: {
			onClickBtn(e) {
				this.navIndex = e
			},

			getDetails(e) {
				uni.navigateTo({
					url: "/pages/detail/detail"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home {
		.scrollNav {

			.navscroll {
				position: fixed;
				top: var(--window-top);
				left: 0;
				height: 100rpx;
				background-color: #f9f9f9;
				white-space: nowrap;
				z-index: 10;

				::-webkit-scrollbar {
					display: none;
				}

				.item {
					font-size: 30rpx;
					display: inline-block;
					line-height: 100rpx;
					padding: 0 30rpx;

					&.active {
						color: #6da760;
						font-weight: bold;
					}
				}
			}
		}

		.content {
			padding-top: 130rpx;
			padding-right: 30rpx;
			padding-bottom: 0rpx;
			padding-left: 30rpx;

			.row {
				border: 1rpx solid #cccccc;
				margin-bottom: 30rpx;
			}
		}
	}
</style>