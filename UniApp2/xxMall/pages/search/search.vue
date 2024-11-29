<template>
	<view class="searchLayout">
		<u-search placeholder="我去你妈个大逼斗" v-model="keyword" :clearabled="true" :showAction="true" actionText="搜索"
			:animation="true" @search="onSearch" @custom="onSearch"></u-search>
		<view class="historyList">
			<view class="item" v-for="item in historyList" :key="item">
				<view class="text">
					{{item}}
				</view>
				<view class="close" @click="onClose()">
					<u-icon name="close" size="16" color="#999"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: "",
				historyList: []
			};
		},
		onLoad() {
			let historyList=uni.getStorageSync("historyList")
			if(historyList){
				this.historyList=historyList
			}
		},
		methods:{
			onSearch(){
				this.historyList.unshift(this.keyword)
				//去重
				this.historyList=[...new Set(this.historyList)]
				uni.setStorageSync("historyList",this.historyList)
			},
			onClose(item){
				this.historyList.splice(item,1)
				uni.setStorageSync("historyList",this.historyList)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.searchLayout {
		padding: 30rpx;

		.historyList {
			margin-top: 30rpx;

			.item {
				@include flex-box();
				padding: 30rpx 0;
				color: #333;
				border-bottom: 1px solid $border-color-light;
			}
		}
	}
</style>