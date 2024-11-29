<template>
	<view class="pro-item">
		<view class="pic">
			<image class="img" :src="pro.thumb" mode="aspectFill"></image>
		</view>
		<view class="text">
			<view class="title">
				{{pro.name}}
			</view>
			<view class="price">
				<view class="big">
					${{pro.price}}
				</view>
				<view class="small">
					${{pro.before_price}}
				</view>
			</view>
			<view class="discount">
				优惠了{{calcuDiscount(pro.price,pro.before_price)}}%
			</view>
			<view class="numbox">
				<view class="skuSelect" v-if="false">
					选规格
				</view>
				<view class="uNum" v-else>
					<pro-num-box :item="pro" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		methods
	} from '../../uni_modules/uview-ui/libs/mixin/mixin';
	export default {
		name: "product-item",
		data() {
			return {

			};
		},
		props:{
			pro:{
				type:Object,
				defaultValue(){
					return{}
				}
			}
		},
		methods:{
			calcuDiscount(price,price_before){
				let discount=((price_before-price)/price_before*100).toFixed(0)
				return discount
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pro-item {
		width: 100%;
		@include flex-box();
		padding: 25rpx 0;

		.pic {
			width: 160rpx;
			height: 160rpx;
			border-radius: 20rpx;
			overflow: hidden;

			.img {
				width: 100%;
				height: 100%;
			}
		}

		.text {
			flex: 1;
			padding-left: 20rpx;
			position: relative;

			.title {
				font-size: 30rpx;
				font-weight: bold;
				@include ellipsis();
			}

			.price {
				@include flex-box-set(start, end);
				font-weight: bold;
				padding: 25rpx 0;

				.big {
					font-size: 30rpx;
					color: $brand-theme-color;
				}

				.small {
					font-size: 24rpx;
					opacity: 0.4;
					text-decoration: line-through;
					padding-left: 10rpx;
				}
			}

			.discount {
				font-size: 22rpx;
				color: $brand-theme-color;
				padding: 3rpx 8rpx;
				border: 1rpx solid $brand-theme-color;
				display: inline-block;
				border-radius: 6rpx;
			}

			.numbox {
				.skuSelect {
					height: 40rpx;
					padding: 0 10rpx;
					background-color: $brand-theme-color;
					font-size: 28rpx;
					color: #fff;
				}
			}
		}
	}
</style>