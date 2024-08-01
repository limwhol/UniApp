<template>
	<view class="top">
		<view class="leftcontainer">
			<img src="@/static/images/logo.png" alt="阿飞卡游戏" @click="backtoindex" />
		</view>
		<view class="rightcontainer">
			<view class="navBtn">
				<view class="maintitle">产品列表</view>
				<view class="subtitle">Products List</view>
			</view>
			<view class="navBtn">
				<view class="maintitle">商务合作</view>
				<view class="subtitle">Business</view>
			</view>
			<view class="navBtn">
				<view class="maintitle">关于我们</view>
				<view class="subtitle">About Us</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "top",
		data() {
			return {

			};
		},
		methods:{
			backtoindex(){
				uni.navigateTo({
					url:"/pages/index/index"
				})
			}
		}
	}
</script>

<style lang="scss">
.top {
				padding: 10px 30px;
				height: 100px;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.leftcontainer {
					width: 200px;
				}

				.rightcontainer {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.navBtn {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						margin-left: 20px;
						/* background-color: #c52121; */
						width: 80px;
						height: 40px;

						.maintitle {
							display: flex;
							justify-content: center;
							align-items: center;
							color: #fff;
							font-size: 16px;
							/* background-color: #292828; */
						}

						.subtitle {
							display: flex;
							justify-content: center;
							align-items: center;
							font-size: 10px;
							color: #9ebef5d2;
							/* background-color: #32c018; */
						}

						&:first-child {
							border-bottom: 1px solid #ffffff;
						}

						/* background-color: #858585; */

					}
				}
			}
</style>