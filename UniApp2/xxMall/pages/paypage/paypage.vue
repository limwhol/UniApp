<template>
	<view class="paypage">
		<delivery-layout></delivery-layout>
		<view class="goodslist">
			<goods-list></goods-list>
		</view>
		<!-- #ifndef MP-WEIXIN -->
		<view class="paytype">
			<view class="box" :class="item.value==payDefValue?'active':''" v-for="item in payType"
				@click="clickPayBtn(item.value)">
				<u-icon :name="item.icon" class="icon" size="28" :color="item.color"></u-icon>
				<text class="font">{{item.name}}</text>
			</view>
		</view>
		<!-- #endif -->
		<view class="payTabbar">
			<car-layout type="pay"></car-layout>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// #ifdef APP-PLUS||H5
				payDefValue: "alipay",
				// #endif
				// #ifdef MP-WEIXIN
				payDefValue: "wxpay",
				// #endif
				payType: [{
					name: "支付宝",
					value: "alipay",
					color:"#1578ff",
					icon:"zhifubao"
				}, {
					name: "微信",
					value: "wxpay",
					color:"#04c15f",
					icon:"weixin-fill"
				}]
			};
		},
		methods: {
			clickPayBtn(value) {
				this.payDefValue = value
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $page-bg-color;
	}

	.paypage {
		padding: 30rpx;

		.goodslist {
			margin-top: 30rpx;
		}

		.paytype {
			@include flex-box();
			margin-top: 30rpx;

			.box {
				@include flex-box-set();
				width: 49%;
				height: 75rpx;
				background-color: #fff;
				border-radius: 10rpx;
				border: 1px solid #fff;
				filter: grayscale(100%);

				.font {
					padding-left: 10rpx;
				}
			}

			.box:first-child.active {
				border-color: #1578ff;
				color: #1578ff;
				filter: grayscale(0%);
			}

			.box:last-child.active {
				border-color: #04c15f;
				color: #04c15f;
				filter: grayscale(0%);
			}
		}
		.payTabbar{
			position: fixed;
			width: 100%;
			bottom: 0;
			left: 0;
		}
	}
</style>