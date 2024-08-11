<template>
	<view class="top">
		<view class="leftcontainer">
			<img src="@/static/images/logo.png" alt="阿飞卡游戏" @click="backtoindex" />
		</view>
		<view class="rightcontainer">
			<view class="navBtn">
				<view class="maintitle" @click="tolatestproduct">最新产品</view>
				<view class="subtitle">products latest</view>
			</view>
			<view class="navBtn">
				<view class="maintitle">商务合作</view>
				<view class="subtitle">business</view>
			</view>
			<view class="navBtn">
				<view class="maintitle">关于我们</view>
				<view class="subtitle">about</view>
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
			},
			tolatestproduct(){
				uni.navigateTo({
				    url: "#aboutus"
				});
			},
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
						padding: 4px 10px;
						background-color: rgb(14, 93, 197);
						width: auto;
						height: auto;
						transition: background-color 0.4s;

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
							font-size: 12px;
							opacity: 0.5;
							/* background-color: #32c018; */
						}

						&:hover {
							border-bottom: 2px solid #dee7f5d2;
							background-color: rgb(5, 42, 91);
						}

						/* background-color: #858585; */

					}
				}
			}
</style>