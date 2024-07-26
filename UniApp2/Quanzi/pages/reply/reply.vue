<template>
	<view class="reply">
		<view class="top">
			<comment-item :closeBtn="true" :childState="true" :item="replyItem"></comment-item>
			
		</view>
		<view class="list">
			<view class="row" v-for="item in childReplyArr">
				<comment-item @removeEnv="PremoveEnv" :childState="true" :item="item"></comment-item>
			</view>
		</view>

		<view>
			<comment-frame @commentEnv="PcommentEnv" :commentObj="commentObj"
				:placeholder="`回复：${getUserName(this.replyItem)}`"></comment-frame>
		</view>

	</view>
</template>

<script>
	import {
		store
	} from '@/uni_modules/uni-id-pages/common/store.js'
	import {
		getUserAvatar,
		getUserName
	} from "../../utils/tools.js"
	const db = uniCloud.database()
	export default {
		data() {
			return {
				replyItem: {},
				childReplyArr: [],
				commentObj: {
					article_id: "",
					comment_type: 1,
					reply_user_id: "",
					reply_comment_id: ""
				}
			}
		},
		onLoad() {
			this.getStorageData()
			this.commentObj.article_id = this.replyItem.article_id
			this.commentObj.reply_user_id = this.replyItem.user_id[0]._id
			this.commentObj.reply_comment_id = this.replyItem._id
			this.getData()
		},
		onUnload() {
			uni.removeStorageSync("replyItem")
		},
		methods: {
			getUserAvatar,
			getUserName,
			getData() {
				let commentTemp = db.collection("quanzi-comment").where({
					article_id:this.commentObj.article_id,
					comment_type:1,
					reply_comment_id:this.replyItem._id
				}).getTemp()
				let userTemp = db.collection("uni-id-users").field("_id,username,nickname,avatar_file").getTemp()
				db.collection(commentTemp, userTemp).orderBy("comment_date desc").get().then(res => {
					console.log(res)
					this.childReplyArr = res.result.data
					if (!this.childReplyArr) {
						uni.showToast({
							title: "二级评论数据获取失败",
							icon: "fail"
						})
					}
				})
			},
			PremoveEnv(e) {
				// console.log(e);
				let index = this.childReplyArr.findIndex(item => {
					return item._id == e
				})
				this.childReplyArr.splice(index, 1)
				this.noComment = this.childReplyArr.length ? false : true
			},
			PcommentEnv(e) {
				console.log(e)
				this.childReplyArr=[]
				this.getData()
				this.childReplyArr.unshift({
					...this.commentObj,
					...e,
					user_id: [store.userInfo]
				})
			},
			getStorageData() {
				if (uni.getStorageSync("replyItem")) {
					this.replyItem = uni.getStorageSync("replyItem")
					return
				} else {
					uni.showToast({
						title: "缓存获取失败！",
						icon: "fail"
					})
				}
				uni.navigateBack()
			}
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
				padding-top: 15rpx;
				border-bottom: 1rpx dashed #eee;
			}
		}
	}
</style>