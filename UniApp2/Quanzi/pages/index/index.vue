<template>
	<view class="home">
		<view class="topnav">
			<u-tabs :list="navList" :activeStyle="{
				color:'#333',
				fontWeight:'bold',
				transform:'scale(1.06)'
			}" @click="clickNav"></u-tabs>
		</view>
		<view class="loadingState" v-if="isloadingState">
			<u-skeleton rows="5" title loading avatar></u-skeleton>
		</view>
		<view class="content">
			<view class="item" v-for="item in dataArr" :key="item._id">
				<blog-item @delEvent="P_delEvent" :item="item" />
			</view>
		</view>
		<view class="">
			<uni-load-more :status="uniloading"></uni-load-more>
		</view>
		<view class="edit">
			<text class="iconfont icon-a-21-xiugai" @click="goEdit"></text>
		</view>
	</view>
</template>

<script>
	import {
		store,
		mutations
	} from '@/uni_modules/uni-id-pages/common/store.js'
	const db = uniCloud.database()
	const dbCmd = db.command
	export default {
		data() {
			return {
				uniloading:"more",
				navList: [{
						name: "最新",
						type: "publish_date"
					},
					{
						name: "热门",
						type: "view_count"
					}
				],
				isloadingState: true,
				dataArr: [],
				navIndex: 0
			}
		},
		onLoad() {
			this.getData()
		},
		onReachBottom() {
			// console.log("chudi")
			// if(!this.noMore)
			// {
			// 	console.log("222"+this.noMore)
			// 	this.uniloading="loading"
			// }
			this.getData()
		},
		methods: {
			P_delEvent() {
				this.dataArr = []
				this.getData()
			},
			clickNav(e) {
				this.isloadingState = true
				this.dataArr = []
				this.noMore=false
				console.log(e)
				this.navIndex = e.index
				this.getData()
			},
			goEdit() {
				uni.navigateTo({
					url: "/pages/edit/edit"
				})
			},
			async getData() {
				let artTemp = db.collection("quanzi_article").where(`delstate!=true`).field(
						"title,user_id,description,picurls,comment_count,like_count,view_count,publish_date,province")
					.getTemp()
				let userTemp = db.collection("uni-id-users").field("_id,username,nickname,avatar_file").getTemp()
				db.collection(artTemp, userTemp).orderBy(this.navList[this.navIndex].type, "desc").skip(this.dataArr.length).limit(5).get().then(
				async res => {

						let idArr = []
						res.result.data.length?this.uniloading="loading":this.uniloading="noMore"
						let resDataArr = [...this.dataArr,...res.result.data]
						if (store.hasLogin) {
							resDataArr.forEach(item => {
								idArr.push(item._id)
							})
							let likeRes = await db.collection("quanzi_like").where({
								article_id: dbCmd.in(idArr),
								user_id: uniCloud.getCurrentUserInfo().uid
							}).get()
							likeRes.result.data.forEach(item => {
								let findIndex = resDataArr.findIndex(find => {
									return item.article_id == find._id
								})
								resDataArr[findIndex].islike = true
							})
						}
						this.dataArr = resDataArr
						this.isloadingState = false
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home {
		.topnav {
			margin-bottom: 30rpx;
		}

		.loadingState {
			padding: 30rpx;
		}

		.content {
			padding: 30rpx;
		}

		.edit {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			background-color: #0199FE;
			color: #ffffff;
			display: flex;
			z-index: 100;
			justify-content: center;
			align-items: center;
			position: fixed;
			right: 10rpx;
			bottom: 100rpx;
			box-shadow: 0 0 20rpx rgba(0, 153, 254, 0.1);

			.iconfont {
				font-size: 45rpx;
			}
		}
	}
</style>