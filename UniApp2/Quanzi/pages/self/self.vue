<template>
	<view class="main">
		<view class="user">
			<view class="leftbox">
				<view class="avatar">
					<image src="../../static/images/1.png"></image>
				</view>
				<view class="timeandlocation">
					<view class="author">
						作者<!-- {{dataObj.user_id[0].nickname?dataObj.user_id[0].nickname:dataObj.user_id[0].username}} -->
					</view>
					<view class="posttime">
						<!-- <uni-dateformat :date="dataObj.publish_date"
									format="yyyy年MM月dd hh:mm:ss "></uni-dateformat> -->天前注册
					</view>
				</view>
			</view>
			<view class="rightbox">
				...
			</view>
		</view>
		<view class="information">
			<view class="topinfo">
				<view class="like"></view>
				<view class="comment"></view>
				<view class="post"></view>
			</view>
			<view class="middleinfo">
				<view class="postcontainer">

				</view>
			</view>
		</view>
		<view class="btnGroup">
			<button @click="toLogin">登录</button>
			<button @click="toCenter">个人中心</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			toLogin() {
				uni.navigateTo({
					url: "../../uni_modules/uni-id-pages/pages/login/login-withpwd"
				})
			},
			toCenter() {
				uni.navigateTo({
					url: "../../uni_modules/uni-id-pages/pages/userinfo/userinfo"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		padding: 0rpx;

		.user {
			padding: 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;

			.leftbox {
				display: flex;
				justify-content: space-between;
				align-items: center;


				.avatar {
					width: 80rpx;
					height: 80rpx;
					margin-right: 20rpx;

					image {
						border-radius: 50%;
						width: 100%;
						height: 100%;
					}
				}

				.timeandlocation {
					display: flex;
					flex-direction: column;
					justify-content: flex-start;
					align-items: flex-start;
					font-size: 24rpx;
					color: #999;

					.author {
						font-size: 28rpx;
						color: #333;
					}

					.posttime {
						margin-right: 10rpx;
					}
				}
			}

			.rightbox {
				font-size: 23rpx;
			}
		}


		.btnGroup {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-start;

			button {
				width: 200rpx;
				height: 80rpx;
				margin-top: 20rpx;
			}
		}
	}
</style>