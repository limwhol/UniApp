<template>
	<view class="container">
		<view class="dashboard">
			<h1>阿飞卡游戏产品管理后台 CMS V0.0.1</h1>
		</view>
		<view class="main">
			<unicloud-db class="mainblock" ref="udb" v-slot:default="{data, loading, error, options}" :options="options"
				:collection="collectionList"
				field="publish_date,game_title,game_type,game_bigpicUrl,game_description,game_imgUrl,platforms"
				:where="queryWhere" :getone="true" :manual="true">
				<view v-if="error">{{error.message}}</view>
				<view v-else-if="loading">
					<uni-load-more :contentText="loadMore" status="loading"></uni-load-more>
				</view>
				<view v-else-if="data" class="mainbox">
					<view class="item">
						<text>注册时间：</text>
						<uni-dateformat :threshold="[0, 0]" :date="data.publish_date"></uni-dateformat>
					</view>
					<view class="item">
						<text>游戏名称：</text>
						<text>{{data.game_title}}</text>
					</view>
					<view class="item">
						<text>游戏类型：</text>
						<text>{{data.game_type}}</text>
					</view>
					<view class="item">
						<text>游戏描述：</text>
						<text>{{data.game_description}}</text>
					</view>
					<view class="item" style="margin-bottom:15px;display: flex;align-items: center;">
						<text>游戏大图地址：</text>
						<img style="width: 150px;height: 200px;" :src="data.game_imgUrl" alt="item.game_title" />
					</view>
					<view class="item" style="margin-bottom:15px;display: flex;align-items: center;">
						<text>游戏详情页横图地址：</text>
						<img style="width: 400px;height: 300px;" :src="data.game_bigpicUrl" alt="item.game_title" />
					</view>
					<view class="item">
						<view class="subitem" style="font-weight: bold;margin-top: 10px;">
							上线平台：
						</view>
						<view class="" v-for="(item,index) in data.platforms" :key="index"
							style="margin-bottom:14px;border-bottom: 1px dashed #e5e5e5;">
							<view style="margin-bottom:4px;">平台名称：{{item.platform_name}}</view>
							<view style="margin-bottom:4px;">平台连接：{{item.platform_link}}</view>
							<view style="margin-bottom:4px;display: flex;align-items: center;">平台ICON地址：<img
									style="width: 30px;height: 30px;" :src="item.platform_iconUrl"
									alt="item.game_title" /> {{item.platform_iconUrl}}</view>
						</view>
					</view>
				</view>
			</unicloud-db>
			<view class="btns">
				<button type="primary" @click="handleUpdate" class="subBtn">修改</button>
				<button type="warn" class="btn-delete" @click="handleDelete">删除</button>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		store,
		mutations
	} from '@/uni_modules/uni-id-pages/common/store.js'
	// 由schema2code生成，包含校验规则和enum静态数据
	import {
		enumConverter
	} from '../../js_sdk/validator/afree-product.js'
	const db = uniCloud.database()

	export default {

		data() {
			return {
				queryWhere: '',
				collectionList: "afree-product",
				loadMore: {
					contentdown: '',
					contentrefresh: '',
					contentnomore: ''
				},
				options: {
					// 将scheme enum 属性静态数据中的value转成text
					...enumConverter
				}
			}
		},
		computed: {
			userInfo() {
				return store.userInfo
			},
			hasLogin() {
				return store.hasLogin
			}

		},
		onLoad(e) {
			this._id = e.id
			this.onLoginChecking()
		},
		onReady() {
			if (this._id) {
				this.queryWhere = '_id=="' + this._id + '"'
			}
		},
		methods: {
			onLoginChecking() {
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
			},
			handleUpdate() {
				// 打开修改页面
				uni.navigateTo({
					url: './edit?id=' + this._id,
					events: {
						// 监听修改页面成功修改数据后, 刷新当前页面数据
						refreshData: () => {
							this.$refs.udb.loadData({
								clear: true
							})
						}
					}
				})
			},
			handleDelete() {
				this.$refs.udb.remove(this._id, {
					success: (res) => {
						// 删除数据成功后跳转到list页面
						uni.navigateTo({
							url: './list'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {

		// background-color: #e8e8e8;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.dashboard {
			width: 100%;
			text-align: center;
			// background-color: #555;
			background: rgb(14, 93, 197);
			padding: 50px;
			margin-bottom: 20px;
			color: #efefef;
			height: 100rpx;
		}

		.main {
			width: 1000px;
			padding: 5px 600px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			// background-color: #2ce8d2;
			.mainblock {
				.mainbox {
					.item {
						line-height: 1.8;
						
					}
				}
			}

			.btns {
				width: 50%;
				margin-top: 30px;
				display: flex;
				justify-content: center;
				align-items: center;
				// background-color: #e6e849;

				.subBtn {
					width: 120px;
				}

				.btn-delete {
					width: 120px;
				}
			}
		}


	}
</style>