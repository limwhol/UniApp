<template>
	<view>
		<view class="commentFrame">
			<uni-easyinput ref="uipt" @confirm="goComment" suffixIcon="paperplane" v-model="replyContent"
				:placeholder="placeholder" @iconClick="goComment">
			</uni-easyinput>
		</view>
	</view>
</template>

<script>
	const db = uniCloud.database()
	import {
		getImgSrc,
		getProvince
	} from "@/utils/tools.js"
	export default {
		name: "comment-frame",
		data() {
			return {
				placeholder: "写点儿什么吧~",
				replyContent: ""
			};
		},
		props: {
			commentObj: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		methods: {
			async goComment() {
				let province = await getProvince()
				if (!this.replyContent) {
					uni.showToast({
						title: "内容不能为空",
						icon: "error"
					})
					return
				}
				console.log(this.replyContent)
				db.collection("quanzi-comment").add({
					"comment_content": this.replyContent,
					"province": province,
					...this.commentObj
				}).then(res => {
					console.log(res)
					uni.showToast({
						title: "评论成功！",
						icon: "success"
					})
					this.$emit("commentEnv", {
						_id: res.result.id,
						comment_content: this.replyContent,
						"province": province,
						comment_date: Date.now()
					})
					this.replyContent=""
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.commentFrame {
		width: 100%;
		background: #fff;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 100;
	}
</style>