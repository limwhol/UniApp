<template>
	<view class="pronumbox">
		<u-number-box v-model="dataItem.numvalue" min="0" max="99" @change="valChange">
			<view slot="minus" class="minus numbtn" :class="dataItem.numvalue<=0?'none':''">
				<u-icon name="minus" size="12"></u-icon>
			</view>
			<text slot="input" class="input" :class="dataItem.numvalue<=0?'none':''">{{dataItem.numvalue}}</text>
			<view slot="plus" class="plus numbtn">
				<u-icon name="plus" size="12" color="#fff"></u-icon>
			</view>
		</u-number-box>
	</view>
</template>

<script>
	import {mapMutations} from "vuex"
	export default {
		name: "pro-num-box",
		data() {
			return {
				dataItem:this.item
			}
		},
		props:{
			item:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		methods: {
			...mapMutations(["setCarsList"]),
			valChange(e) {
				this.setCarsList({item:this.item,num:e.value})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pronumbox {
		position: absolute;
		right: 0;
		bottom: 0;

		.numbtn {
			width: 40rpx;
			height: 40rpx;
			@include flex-box-set();
		}

		.minus {
			border: 1px solid #ccc;
		}

		.plus {
			background-color: $brand-theme-color;

		}

		.input {
			width: 60rpx;
			height: 40rpx;
			font-size: 26rpx;
			color: #888;
			@include flex-box-set();
		}

		.none {
			display: none;
		}
	}
</style>