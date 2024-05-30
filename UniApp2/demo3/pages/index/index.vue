<template>
	<view class="home">
		<view class="scrollNav">
			<scroll-view scroll-x="true" class="navscroll">
				<view class="item" :class="index==navIndex?'active':''" v-for="(item,index) in navArr"
					@click="onClickBtn(index)" :key="item.id">
					{{item.classname}}
				</view>
			</scroll-view>
		</view>
		<view class="content">
			<view class="row" v-for="item in newsArr" :key="item.id">
				<newsbox :item="{title:item.title,author:item.author,hits:item.hits,picurl:item.picurl}" @click.native="getDetails()"></newsbox>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navIndex: 0,
				navArr: [],
				newsArr:[]
			}
		},
		onLoad() {
			this.getNavArr();
			this.getNewsData()
		},
		methods: {
			onClickBtn(e) {
				this.navIndex = e
			},
			getNewsData() {
				uni.request({
					url: "https://ku.qingnian8.com/dataApi/news/newslist.php",
					data:{
						num:3,
						cid:50
					},
					success: res => {
						console.log(res)
						this.newsArr=res.data
					}
				})
			},
			getDetails(e) {
				uni.navigateTo({
					url: `/pages/detail/detail`
				})

			},
			getNavArr() {
				uni.request({
					url: "https://ku.qingnian8.com/dataApi/news/navlist.php",
					success: res => {
						console.log(res)
						this.navArr = res.data
					}
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