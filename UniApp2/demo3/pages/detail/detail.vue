<template>
	<view class="detail">
		<view class="title">{{newsObj.title}}</view>
		<view class="info">
			<view class="author">
				作者：{{newsObj.author}}
			</view>
			<view class="time">
				发布时间：{{realtime}}
			</view>
		</view>
		<!-- 		<view class="picurl">
			<image :src="newsObj.picurl" mode="aspectFill"></image>
		</view> -->
		<view class="content">
			<rich-text :nodes="newsObj.content"></rich-text>
		</view>
		<view class="declaration">
			本人承诺遵守本次活动大家的共同约定,本着风险自担的原则,安全骑行。如果本骑行活动过程中给本人造成损害,除非损害为其他人故意或者重大过失行为造成,否则参与活动的其他人员不承担任何法律和经济责任(包括本次活动发起人或召集人以及交流平台、介绍人或邀请人),由本人依据法律规定和本声明依法解决。特此声明!
			本声明自活动开始之日起生效。 免责声明人(签字): 年月日 免责声明 篇六 第一条 本网站所刊载的所有资料及图表仅供参考使用。
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newsObj: {},
				options: null,
				realtime: ""
			};
		},
		methods: {
			getNewsData() {
				uni.request({
					url: "https://ku.qingnian8.com/dataApi/news/detail.php",
					data: this.options,
					success: res => {
						console.log(res)
						uni.setNavigationBarTitle({
							title: res.data.title
						})
						this.newsObj = res.data
						this.realtime = this.timestampToDate(this.newsObj.posttime)
						this.saveHistory()
					}
				})
			},
			saveHistory() {
				let historyArr = uni.getStorageSync("historyArr") || []
				let item = {
					id: this.newsObj.id,
					classid: this.newsObj.classid,
					title: this.newsObj.title,
					picurl: this.newsObj.picurl,
					author: this.newsObj.author,
					hits:this.newsObj.hits
				}
				let exists = false;

				for (let i = 0; i < historyArr.length; i++) {
					if (historyArr[i].id == item.id) {
						exists = true;
						break; // Exit the loop if item already exists
					}
				}

				// If item doesn't exist, add it to the beginning of the array
				if (!exists) {
					historyArr.unshift(item);
				}

				uni.setStorageSync("historyArr", historyArr)
			},
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
			}
		},
		onLoad(e) {
			this.getNewsData()
			// console.log(e)
			this.options = e
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
			padding-bottom: 0rpx;

			img {
				max-width: 100%;
			}
		}

		.declaration {
			color: #ff73b7;
			font-size: 26rpx;
			background-color: #ffe7f2;
			border-radius: 15rpx;
			padding: 20rpx;
			line-height: 1.8;
		}
	}
</style>