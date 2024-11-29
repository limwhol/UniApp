<template>
	<view class="">
		<view class="carLayout">
			<view class="goods" v-if="carShow">
				<view class="head">
					<view class="text">已选商品</view>
					<view class="empty" @click="clearCars">清空</view>
				</view>
				<scroll-view scroll-y="true" class="body">
					<view class="sContent">
						<view class="caritem" v-for="item in carsList" :key="item.id">
							<car-pro-item :item="item" />
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="content">
				<view class="left">
					<view v-if="!type" class="icon" hover-class="iconhover" hover-stay-time="50">
						<u-icon name="shopping-cart" size="34" color="#ec544f" @tap="clickCarIcon"></u-icon>
						<view class="num">{{buyNum}}</view>
					</view>
					<view class="price">合计<text class="text">${{totalPrice}}</text></view>
				</view>
				<view class="right">
					<view class="btn" :class="carsList.length?'':'disable'" v-if="!type" @click="goPay">选好了</view>
					<view class="btn" v-else @click="confirmPay">支付</view>
				</view>
			</view>
			<view class="safe-area-bottom"></view>
		</view>
		<u-overlay :show="carShow" z-index="9" @click="clickCarIcon"></u-overlay>
	</view>
</template>

<script>
	import {mapGetters,mapMutations} from "vuex"
	export default {
		name: "car-layout",
		data() {
			return {
				carShow:false
			};
		},
		props:{
			type:{
				type:String,
				default:""
			}
		},
		computed:{
			...mapGetters(["carsList","totalPrice","buyNum"])
		},
		methods:{
			clickCarIcon(){
				this.carShow=!this.carShow
			},
			...mapMutations(["clearCars"]),
			goPay(){
				uni.navigateTo({
					url:"/pages/paypage/paypage"
				})
			},
			confirmPay(){
				console.log("Payment Done");
			}
		}
	}
</script>

<style lang="scss" scoped>
	.carLayout {
		position: relative;
		z-index: 10;

		.goods {
			border-bottom: 1px solid $border-color-light;
			padding: 30rpx 30rpx 0;
			border-radius: 20rpx;
			background-color: #fff;

			.head {
				@include flex-box();
				color: $text-font-color-3;
				padding: 25rpx 0;

				.empty {
					color: $brand-theme-color-aux;
				}
			}

			.body {
				height: 500rpx
			}
		}

		.content {
			@include flex-box();
			padding: 0 30rpx;
			height: 140rpx;
			background-color: #fff;

			.left {
				@include flex-box();

				.icon {
					width: 80rpx;
					height: 80rpx;
					background-color: #eeefee;
					@include flex-box-set(center, center);
					position: relative;
					margin-right: 30rpx;

					.num {
						position: absolute;
						width: 36rpx;
						height: 36rpx;
						background-color: $brand-theme-color;
						border-radius: 50%;
						color: #fff;
						right: -18rpx;
						top: -18rpx;
						@include flex-box-set(center, center);
						font-size: 22rpx;
					}
				}

				.iconhover {
					transform: scale(0.9);
				}

				.price {
					font-size: 28rpx;

					.text {
						font-weight: bold;
						font-size: 32rpx;
					}
				}
			}

			.right {
				.btn {
					width: 210rpx;
					height: 75rpx;
					background-color: $brand-theme-color;
					@include flex-box-set();
					color: #fff;
					border-radius: 10rpx;

					&.disable {
						opacity: 0.6;
					}
				}
			}
		}

		.safe-area-bottom {
			width: 100%;
			height: env(safe-area-inset-bottom);
			background-color: #fff;
		}
	}
</style>