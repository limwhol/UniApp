<template>
	<view>
		<view class="top">
			<view class="topbox">
				<view class="history">
					-- 浏览历史 --
				</view>
			</view>

		</view>
		<view class="user"  v-if="newsArr.length>0">
			<view class="row" v-for="item in newsArr" :key="item.id">
				<newsbox :item="{title:item.title,author:item.author,picurl:item.picurl,hits:item.hits}"
					@click.native="getDetails(item.id)" />
			</view>
		</view>
		<view class="user" v-if="newsArr.length==0">
			<view class="row2">
暂无记录...
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
			// getNewsData() {
			// 	uni.request({
			// 		url: "https://ku.qingnian8.com/dataApi/news/newslist.php",
			// 		success: res => {
			// 			// console.log(res)
			// 			this.newsArr = res.data
			// 			for (let i = 0; i < this.newsArr.length; i++) {
			// 				this.newsArr[i].posttime = this.timestampToDate(this.newsArr[i].posttime)
			// 			}
			// 		}
			// 	})
			// },
			timestampToDate(timestamp) {
				timestamp = parseInt(timestamp);
				if (timestamp.toString().length === 10) {
					timestamp *= 1000;
				}
				let date = new Date(timestamp);
				let year = date.getFullYear();
				let month = date.getMonth() + 1; // 月份从0开始，需要加1
				let day = date.getDate();
				// 格式化月份和日期为两位数
				month = month < 10 ? '0' + month : month;
				day = day < 10 ? '0' + day : day;
				return `${year}-${month}-${day}`;
			},
			getHistory() {
				this.newsArr = uni.getStorageSync("historyArr")||[]
				if(this.newsArr.length>11){
					this.newsArr=this.newsArr.slice(0,10)
				}
				console.log(this.newsArr)
			}
		},
		onShow() {
			this.getHistory()
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
			font-size: 46rpx;

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
		.row2 {
			margin-bottom: 30rpx;
			text-align: center;
			color: #8c8c8c;
		}
	}
</style>