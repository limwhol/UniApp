<template>
	<view class="user">
		<view class="top">
			<view class="userinfo">
				<view class="dashboard">
					<h1>阿飞卡游戏产品管理后台 CMS V0.0.1</h1>
				</view>
				<view class="text" v-if="hasLogin">
					<view class="nickname">您好！<span
							style="color: #f8b4b4;">{{userInfo.nickname||userInfo.username||userInfo.mobile}}</span>，欢迎回来！
					</view>

				</view>
				<view class="text" v-else>
					<view class="nickname" @click="onLogin()">检测到您还未登录，请点击登录以发布产品信息！</view>
				</view>
			</view>
		</view>

		<view class="main">


			<view class="list">
				<view class="group">
					<view class="item" @click="toProductList" style="font-size: 20px;">
						<view class="left"><text class="iconfont icon-a-2-caidan" style="font-size: 20px;"></text><text class="text">产品列表</text>
						</view>
						<view class="right"><text class="iconfont icon-a-10-you" style="font-size: 20px;"></text></view>
					</view>
					<view class="item" @click="addNewProduct" style="font-size: 20px;">
						<view class="left"><text class="iconfont icon-a-24-bianji" style="font-size: 20px;"></text><text class="text"
								style="color:orangered;font-size: 20px;">发新产品</text></view>
						<view class="right"><text class="iconfont icon-a-10-you"></text></view>
					</view>
					<view class="item" @click="logout" style="font-size: 20px;">
						<view class="left"><text class="iconfont icon-a-73-tuichu" style="font-size: 20px;"></text><text class="text">退出登录</text>
						</view>
						<view class="right"><text class="iconfont icon-a-10-you" style="font-size: 20px;"></text></view>
					</view>
				</view>
			</view>
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
			return {};
		},
		onLoad() {
			// this.showUserData()
			this.getUserInfo()
		},
		computed: {
			userInfo() {
				return store.userInfo
			},
			hasLogin() {
				return store.hasLogin
			}

		},
		methods: {
			toProductList() {
				uni.navigateTo({
					url: "/pages/afree-product/list"
				})
			},
			addNewProduct() {
				uni.navigateTo({
					url: "/pages/afree-product/add"
				})
			},
			async getUserInfo() {
				console.log(this.hasLogin+"ADMIN");
				console.log(this.userInfo);
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
			// showUserData() {
			// 	if (userInfo != null) {
			// 		console.log(userInfo)
			// 	}
			// },
			onLogin() {
				uni.navigateTo({
					url: "/uni_modules/uni-id-pages/pages/login/login-withpwd"
				})
			},
			logout() {
				if (this.goLoginPage()) return;
				uni.showModal({
					title: "是否确认退出?",
					success: res => {
						console.log(res);
						if (res.confirm) {
							mutations.logout()
						}
					}
				})

			},


			goLoginPage() {
				if (!this.hasLogin) {
					uni.showToast({
						title: "未登录",
						icon: "none"
					})
					return true;
				}
				return false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user {

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.top {
			width: 100%;
			height: 100rpx;
			background: rgb(14, 93, 197);
			padding: 50px;

			.userinfo {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				color: #efefef;

				.dashboard {
					width: 100%;
					text-align: center;
					// background-color: #555;
				}

				.text {
					margin-top: 10px;

					.nickname {
						font-size: 18px;
					}
				}
			}
		}

		.main {
			background-color: #f7f7f7;
			padding: 0px 600px;



			.list {
				width: 1000px;
				// background-color: #555;

				.group {
					padding: 15px 30px;
					border-bottom: 15px solid #f4f4f4;

					.item {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 25px 0;
						color: #555;

						border-bottom: 1px dashed #d9d9d9;

						.left {
							display: flex;
							align-items: center;

							.iconfont {
								margin-right: 10rpx;
							}
						}

						.right {
							.iconfont {}
						}
					}

					.item:last-child {
						border: none;
					}
				}

				.group:last-child {
					border: none;
				}
			}
		}
	}
</style>