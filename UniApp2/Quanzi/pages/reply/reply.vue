<template>
	<view class="reply">
		<view class="top">
			<comment-item :item="replyItem"></comment-item>
			 <!-- :closeBtn="true" :childState="true" -->
		</view>
<!-- 		<view class="list">
			<view class="row" v-for="item in childReplyArr">
				<comment-item @removeEnv="commentEnv" :childState="true" :item="item"></comment-item>
			</view>
		</view> -->

<!-- 		<view>
			<comment-frame @commentEnv="commentEnv" :commentObj="commentObj"
				:placeholder="`回复：${getUserName(this.replyItem)}`"></comment-frame>
		</view> -->

	</view>
</template>

<script>
	import {
		getUserAvatar,
		getUserName
	} from "../../utils/tools.js"
	const db = uniCloud.database()
	export default {
		data() {
			return {
				replyItem: {}
			}
		},
		onLoad() {
			if(uni.getStorageSync("replyItem")){
				this.replyItem=uni.getStorageSync("replyItem")
				return
			}else{
				uni.showToast({
					title:"缓存获取失败！",
					icon:"fail"
				})
			}
			uni.navigateBack()
		},
		onUnload() {
			uni.removeStorageSync("replyItem")
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.reply {
		.top {
			padding: 30rpx;
			border-bottom: 15rpx solid #eee;
		}

		.list {
			padding: 30rpx;
			padding-bottom: 120rpx;

			.row {
				padding-bottom: 15rpx;
			}
		}
	}
</style>