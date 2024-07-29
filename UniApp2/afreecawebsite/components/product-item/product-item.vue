<template>
	<view class="subbox">
		<view class="uppic">
			<img class="imgview" src="@/static/images/11.png" alt="" />
		</view>
		<view class="downinfo">
			<view class="gamename">《{{item.title}}》</view>
			<view class="gamedes">{{item.description}}</view>
			<view class="launchgame">
				<view class="platform">
					<img src="@/static/images/telegram.png" alt="" class="platformImg" />
				</view>
				<view class="platform">
					<img src="@/static/images/android.png" alt="" class="platformImg" />
				</view>
				<view class="platform">
					<img src="@/static/images/ios.png" alt="" class="platformImg" />
				</view>
				<view class="platform">
					<img src="@/static/images/tk.png" alt="" class="platformImg" />
				</view>
				<view class="platform">
					<img src="@/static/images/facebook.png" alt="" class="platformImg" />
				</view>
				<view class="platform">
					<img src="@/static/images/wx.png" alt="" class="platformImg" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "product-item",
		data() {
			return {

			};
		},
		props: {
			item: {
				type: Object,
				default () {
					return {}
				}
			}
		},
	}
</script>

<style lang="scss">
	.subbox {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 70px;

		/* background-color: aqua; */
		.uppic {
			width: 300px;
			height: 400px;

			.imgview {
				width: 100%;
				height: 100%;
				border-radius: 10px;
			}
		}

		.downinfo {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-top: 10px;

			.gamename {
				font-size: 24px;
				font-weight: bold;
			}

			.gamedes {
				margin-top: 6px;
				font-size: 14px;
				color: #858585;
			}

			.launchgame {
				margin-top: 6px;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.platform {
					width: 40px;
					height: 40px;
					margin-right: 5px;

					.platformImg {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
			}
		}
	}
</style>