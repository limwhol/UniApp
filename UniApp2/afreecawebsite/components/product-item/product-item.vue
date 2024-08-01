<template>
	<view class="subbox" @click="toDetails(item._id)">
		<view class="uppic">
			<img class="imgview" :src="item.game_imgUrl" alt="" />
		</view>
		<view class="downinfo">
			<view class="gamename">《{{item.game_title}}》</view>
			<view class="gametype">{{item.game_type}}</view>
			<view class="gamedes">{{item.game_description}}</view>
			<!-- 			<view class="launchgame">
				<view class="platform" v-for="(find,index) in item.platforms" :key="index">
					<img :src="find.platform_iconUrl" alt="" class="platformImg" @click="goPlatform(find.platform_link)" />
				</view>
			</view> -->
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
			},
			toDetails(id){
				uni.navigateTo({
					url:"/pages/details/details?id="+id
				})
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

		.uppic {
			width: 300px;
			height: 400px;

			.imgview {
				width: 100%;
				height: 100%;
				border-radius: 5px;
				border: 1rpx solid #e2e2e2
			}
		}

		.downinfo {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-top: 3px;

			.gamename {
				margin-top: 3px;
				font-size: 30px;
				font-weight: bold;
			}

			.gametype {
				margin-top: 3px;
				font-size: 18px;
				color: #545454;
				white-space: pre-wrap;
			}

			.gamedes {
				margin-top: 3px;
				font-size: 14px;
				color: #b9b9b9;
				white-space: pre-wrap;
				// background-color: #858585;
				text-indent: 2em;
				margin-bottom: 1em;
			}
		}
	}
</style>