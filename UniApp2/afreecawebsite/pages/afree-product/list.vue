<template>
	<view class="container">
		<view class="dashboard">
			<h1>阿飞卡游戏产品管理后台 CMS V0.0.1</h1>
		</view>
		<view class="main">
			<unicloud-db ref="udb" v-slot:default="{data, pagination, loading, hasMore, error}"
				:collection="collectionList"
				field="publish_date,game_title,game_type,game_bigpicUrl,game_description,game_imgUrl,platforms">
				<view v-if="error">{{error.message}}</view>
				<view v-else-if="data">
					<uni-list>
						<uni-list-item v-for="(item, index) in data" :key="index" showArrow :clickable="true"
							@click="handleItemClick(item._id)">
							<template v-slot:body>
									<view class=""
										style="display: flex;flex-direction: column;background-color: #f7f7f7;padding:20px;border-radius: 5px;">
										<view class="" style="margin-bottom: 15px;">游戏名称：{{item.game_title}}</view>
										<view class="" style="margin-bottom: 15px;">游戏类型：{{item.game_type}}</view>
										<view class="" style="margin-bottom: 15px;">玩法简介：{{item.game_description}}
										</view>
										<view class=""
											style="margin-bottom: 15px;display: flex;justify-content: flex-start;align-items: center;">
											大缩略图：<img style="width: 400px;height: 300px;" :src="item.game_bigpicUrl"
												alt="item.game_title" /></view>
										<view class=""
											style="margin-bottom: 5px;display: flex;justify-content: flex-start;align-items: center;">
											小缩略图：<img style="width: 150px;height: 200px;" :src="item.game_imgUrl"
												alt="item.game_title" /></view>
									</view>
							</template>
						</uni-list-item>
					</uni-list>
				</view>
				<uni-load-more :status="loading?'loading':(hasMore ? 'more' : 'noMore')"></uni-load-more>
			</unicloud-db>
		</view>
	</view>
</template>

<script>
	import {
		store,
		mutations
	} from '@/uni_modules/uni-id-pages/common/store.js'
	const db = uniCloud.database()
	export default {
		data() {
			return {
				collectionList: "afree-product",
				loadMore: {
					contentdown: '',
					contentrefresh: '',
					contentnomore: ''
				}
			}
		},
		onPullDownRefresh() {
			this.$refs.udb.loadData({
				clear: true
			}, () => {
				uni.stopPullDownRefresh()
			})
		},
		computed: {
			userInfo() {
				return store.userInfo
			},
			hasLogin() {
				return store.hasLogin
			}

		},
		onReachBottom() {
			this.$refs.udb.loadMore()
		},
		onLoad() {
			this.onLoginChecking()
		},
		methods: {
			handleItemClick(id) {
				uni.navigateTo({
					url: './detail?id=' + id
				})
			},
			onLoginChecking() {
				console.log(this.hasLogin+"LIST");
				if (!this.hasLogin) {
					uni.showToast({
						title: "还未登录，请登录！",
						icon: "error"
					})
					setTimeout(res => {
						uni.navigateTo({
							url: "../../uni_modules/uni-id-pages/pages/login/login-withpwd"
						})
					}, 2000)
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.dashboard {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			// background-color: #555;
			background: rgb(14, 93, 197);
			padding: 50px;
			margin-bottom: 20px;
			color: #efefef;
			height: 100rpx;
		}

		.main {
			padding: 15px 600px;
		}
	}
</style>