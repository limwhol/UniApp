<template>
	<view class="container">
		<unicloud-db ref="udb" v-slot:default="{data, pagination, loading, hasMore, error}" :collection="collectionList"
			field="publish_date,game_title,game_type,game_description,game_imgUrl,platforms">
			<view v-if="error">{{error.message}}</view>
			<view v-else-if="data">
				<uni-list>
					<uni-list-item v-for="(item, index) in data" :key="index" showArrow :clickable="true"
						@click="handleItemClick(item._id)">
						<template v-slot:body>
							<view class="" style="display: flex;flex-direction: column;background-color: #f7f7f7;padding: 10px 20px;border-radius: 3px;">
								<view class="" style="margin-bottom: 10px;">游戏名称：{{item.game_title}}</view>
								<view class="" style="margin-bottom: 10px;">游戏类型：{{item.game_type}}</view>
								<view class="" style="margin-bottom: 10px;">玩法简介：{{item.game_description}}</view>
								<view class="" style="margin-bottom: 5px;display: flex;justify-content: flex-start;align-items: center;">缩略图：<img style="width: 150px;height: 200px;" :src="item.game_imgUrl" alt="item.game_title" /></view>
							</view>
							
						</template>
					</uni-list-item>
				</uni-list>
			</view>
			<uni-load-more :status="loading?'loading':(hasMore ? 'more' : 'noMore')"></uni-load-more>
		</unicloud-db>
		<uni-fab ref="fab" horizontal="right" vertical="bottom" :pop-menu="false" @fabClick="fabClick" />
	</view>
</template>

<script>
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
		onReachBottom() {
			this.$refs.udb.loadMore()
		},
		methods: {
			handleItemClick(id) {
				uni.navigateTo({
					url: './detail?id=' + id
				})
			},
			fabClick() {
				// 打开新增页面
				uni.navigateTo({
					url: './add',
					events: {
						// 监听新增数据成功后, 刷新当前页面数据
						refreshData: () => {
							this.$refs.udb.loadData({
								clear: true
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 15px 600px;
	}
</style>