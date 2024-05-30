<template>
	<view class="home">
		<view class="scrollNav">
			<scroll-view scroll-x="true" class="navscroll">
				<view class="item" :class="index==navIndex?'active':''" v-for="(item,index) in navArr"
					@click="onClickBtn(index,item.id)" :key="item.id">
					{{item.classname}}
				</view>
			</scroll-view>
		</view>
		<view class="content">
			<view class="row" v-for="item in newsArr" :key="item.id">
				<newsbox :item="{title:item.title,author:item.author,hits:item.hits,picurl:item.picurl}"
					@click.native="navToDetails(item)"></newsbox>
			</view>
			<view class="isloading" v-if="!newsArr.length">
				暂无记录...
			</view>
			<view class="isloading" v-if="isLoading==0">
			</view>
			<view class="isloading" v-if="isLoading==1">
				读取中...
			</view>
			<view class="isloading" v-if="isLoading==2&&newsArr.length">
				到底啦...
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
				newsArr: [],
				newsId: 50,
				newsPage: 1,
				isLoading: 0
			}
		},
		onLoad() {
			this.getNavData();
			this.getNewsData()
		},
		onReachBottom() {
			this.isLoading = 1
			this.newsPage++
			this.getNewsData()


		},
		methods: {
			onClickBtn(e, id) {
				this.newsArr.length = 0
				this.newsPage = 1
				this.isLoading = 0
				this.navIndex = e //决定哪个按钮高亮显示
				this.newsId = id //传递按钮类型，内容区按照类型显示数据
				this.getNewsData()
			},
			getNewsData() {
				uni.request({
					url: "https://ku.qingnian8.com/dataApi/news/newslist.php",
					data: {
						num: 8,
						cid: this.newsId,
						page: this.newsPage
					},
					success: res => {
						console.log(res)
						if (res.data.length == 0) {
							this.isLoading = 2
							return
						}
						this.newsArr = this.newsArr.concat(res.data)
					}
				})
			},
			navToDetails(e) {
				uni.navigateTo({
					url: `/pages/detail/detail?cid=${e.classid}&id=${e.id}`
				})

			},
			getNavData() {
				uni.request({
					url: "https://ku.qingnian8.com/dataApi/news/navlist.php",
					success: res => {
						// console.log(res)
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
				border-bottom: 1rpx solid #efefef;

				::-webkit-scrollbar {
					display: none;
				}

				.item {
					font-size: 30rpx;
					display: inline-block;
					line-height: 100rpx;
					padding: 0 30rpx;

					&.active {
						color: #56b32f;
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
				margin-bottom: 30rpx;
			}

			.isloading {
				text-align: center;
				padding: 30rpx;
				padding-top: 0;
				color: #d5d5d5;
			}
		}
	}
</style>