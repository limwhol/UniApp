<template>
	<view class="subbox">
		<view class="uppic">
			<img class="imgview" :src="item.game_imgUrl" alt="" />
		</view>
		<view class="downinfo">
			<view class="gamename">《{{item.game_title}}》</view>
			<view class="gamedes">{{item.game_description}}</view>
			<view class="launchgame">
				<view class="platform" v-for="(find,index) in item.platforms" :key="index">
					<img :src="find.platform_iconUrl" alt="" class="platformImg" @click="goPlatform(find.platform_link)" />
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
		methods: {
			goPlatform(e) {
				console.log(e)
			}

		}
	}
</script>

<style lang="scss">
	.subbox {
		width: 300px;
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
				border: 1rpx solid #e2e2e2
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
				white-space: pre-wrap;
				// background-color: #858585;
				text-indent: 2em;
				margin-bottom: 1em;
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