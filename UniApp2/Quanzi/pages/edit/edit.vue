<template>
	<view class="edit">
		<view class="title">
			<input type="text" placeholder="输入标题……" placeholder-class="placeholderClass" v-model="artObj.title" />
		</view>
		<view class="content">
			<editor class="myEditor" placeholder="输入内容……" show-img-size show-img-toolbar show-img-resize
				@ready="onEditReady" @focus="onEditFocus" @statuschange="onStaChange"></editor>
		</view>
		<view class="btnGroup">
			<u-button text="确认发表" @click="onSubmit" type="primary" :disabled="artObj.title.length == 0"></u-button>
		</view>
		<view class="tools" v-if="toolshow">
			<view class="item" @click="insertHead"><text class="iconfont icon-zitibiaoti"
					:class="headshow?'active':''"></text></view>
			<view class="item" @click="insertBold"><text class="iconfont icon-zitijiacu"
					:class="boldshow?'active':''"></text></view>
			<view class="item" @click="insertItalic"><text class="iconfont icon-zitixieti"
					:class="italicshow?'active':''"></text></view>
			<view class="item" @click="insertDivider"><text class="iconfont icon-fengexian"
					:class="dividershow?'active':''"></text></view>
			<view class="item" @click="insertImage"><text class="iconfont icon-charutupian"></text></view>
			<view class="item" @click="editok"><text class="iconfont icon-duigoux"></text></view>
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
		data() {
			return {
				toolshow: false,
				headshow: false,
				boldshow: false,
				dividershow: false,
				italicshow: false,
				artObj: {
					title: "",
					content: "",
					description: "",
					picurls: "",
					province: ""
				}
			};
		},
		onLoad() {
			getProvince().then(res => {
				console.log(res)
				this.artObj.province = res
			})
		},
		methods: {
			onEditFocus() {
				this.toolshow = true
			},
			onEditReady() {
				uni.createSelectorQuery().in(this).select('.myEditor').fields({
					size: true,
					context: true
				}, res => {
					console.log(res)
					this.editorCtx = res.context
				}).exec()
			},
			onSubmit() {
				this.editorCtx.getContents({
					success: res => {
						this.artObj.description = res.text.slice(0, 100)
						this.artObj.content = res.html
						this.artObj.picurls = getImgSrc(res.html)
						uni.showLoading({
							title: "提交信息中…"
						})
						this.addData()
						// console.log(this.artObj)
					}
				})
			},
			addData() {
				db.collection("mayiquanzi_article").add({
					...this.artObj
				}).then(res => {
					console.log(res)
					uni.hideLoading()
					uni.showToast({
						title: "发布成功！"
					})
					setTimeout(() => {
						uni.reLaunch({
							url: "/pages/index/index"
						})
					}, 2000);
				})
			},
			checkStatus(name, detail, obj) {
				if (detail.hasOwnProperty(name)) {
					this[obj] = true
				} else {
					this[obj] = false
				}
			},
			onStaChange(e) {
				console.log(e)
				let detail = e.detail
				this.checkStatus("header", detail, "headshow")
				this.checkStatus("bold", detail, "boldshow")
				this.checkStatus("italic", detail, "italicshow")
			},
			insertHead() {
				this.headshow = !this.headshow
				this.editorCtx.format("header", this.headshow ? "H2" : false)
				this.dividershow = false
			},
			insertBold() {
				this.boldshow = !this.boldshow
				this.editorCtx.format("bold")
			},
			insertDivider() {
				this.dividershow = true
				this.editorCtx.insertDivider()
				this.headshow = false
			},
			insertItalic() {
				this.italicshow = !this.italicshow
				this.editorCtx.format("italic")
				this.headshow = false
			},
			insertImage() {
				uni.chooseImage({
					success: async res => {
						uni.showLoading({
							title: "正在上传图片…",
							mask: true
						})
						for (let item of res.tempFiles) {
							let res = await uniCloud.uploadFile({
								filePath: item.path,
								cloudPath: item.name
							})
							this.editorCtx.insertImage({
								src: res.fileID
							})
						}
						uni.hideLoading()
					}
				})
			},
			editok() {
				this.toolshow = false
			}
		}
	}
</script>

<style lang="scss">
	/deep/ .ql-blank::before {
		font-style: normal;
		color: #e4e4e4;
		font-size: 36rpx;
	}

	.edit {
		padding: 30rpx;

		.title {
			input {
				font-size: 46rpx;
				height: 80rpx;
				border-bottom: 1rpx solid #e4e4e4;
				margin-bottom: 10rpx;
			}

			.placeholderClass {
				color: #e4e4e4;
			}
		}

		.content {
			.myEditor {
				height: calc(100vh - 500rpx);
				margin-bottom: 10rpx;
			}

		}

		.btnGroup {
			width: 100%;
			margin-bottom: 10rpx;
		}

		.tools {
			width: 100%;
			height: 80rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;

			.iconfont {
				font-size: 36rpx;
				color: #333;

				&.active {
					color: #0199FE;
				}
			}

		}
	}
</style>