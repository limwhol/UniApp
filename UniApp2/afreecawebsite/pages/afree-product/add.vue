<template>
	<view class="uni-container">
		<view class="topout" style="margin: 50px;">
			<h1>阿飞卡游戏产品管理后台 CMS V0.0.1</h1>
		</view>
		<view class=""
			style="border-radius: 3px;padding: 5px;background-color: antiquewhite;display: flex;justify-content: flex-start;align-items: center;margin-bottom: 10px;height: 24px;">
			<view class="" style="width:5px;background-color: #cc754d;height: 20px;margin-right: 10px">
		
			</view>
			<h5>填写产品基础信息</h5>
		</view>
		<uni-forms ref="form" :model="formData" validate-trigger="submit" err-show-type="toast">
			
			<uni-forms-item name="game_title" label="游戏名" required>
				<uni-easyinput placeholder="如：暗黑破坏神" v-model="formData.game_title" trim="both"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="game_type" label="游戏类型" required>
				<uni-easyinput placeholder="如：放置挂机类" v-model="formData.game_type" trim="both"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="game_description" label="游戏描述" required>
				<uni-easyinput placeholder="如：这是一款以中世纪题材为背景的游戏，讲述的是亚瑟王和他的武士们打天下的故事。" v-model="formData.game_description"
					trim="right"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="game_imgUrl" label="游戏大图地址" required>
				<uni-easyinput placeholder="游戏产品在首页的展示大图" v-model="formData.game_imgUrl" trim="both"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="publish_date" label="游戏产品注册时间">
				<uni-datetime-picker return-type="timestamp" v-model="formData.publish_date"></uni-datetime-picker>
			</uni-forms-item>

			<!-- 平台信息列表 -->
			<view v-for="(platform, index) in formData.platforms" :key="index">
				<view class=""
					style="border-radius: 3px;padding: 5px;background-color: antiquewhite;display: flex;justify-content: flex-start;align-items: center;margin-bottom: 10px;height: 24px;">
					<view class="" style="width:5px;background-color: #cc754d;height: 20px;margin-right: 10px">

					</view>
					<h5>添加第{{index+1}}个平台</h5>
				</view>
				<uni-forms-item :name="'formData.platforms[index].platform_name' + index" label="平台名称">
					<uni-easyinput placeholder="如：抖音平台" v-model="formData.platforms[index].platform_name" trim="both"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item :name="'formData.platforms[index].platform_iconUrl' + index" label="平台ICON">
					<uni-easyinput placeholder="平台ICON的图片链接" v-model="formData.platforms[index].platform_iconUrl" trim="both"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item :name="'formData.platforms[index].platform_link' + index" label="跳转链接">
					<uni-easyinput placeholder="平台的跳转链接" v-model="formData.platforms[index].platform_link" trim="both"></uni-easyinput>
				</uni-forms-item>
			</view>

			<!-- 添加平台信息按钮 -->
			<button type="default" class="uni-button" @click="addPlatform">+ 添加平台</button>
			<view class="uni-button-group">
				<button type="primary" class="uni-button" @click="submit">提交</button>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	import {
		validator
	} from '../../js_sdk/validator/afree-product.js';

	const db = uniCloud.database();
	const dbCollectionName = 'afree-product';

	function getValidator(fields) {
		let result = {}
		for (let key in validator) {
			if (fields.indexOf(key) > -1) {
				result[key] = validator[key]
			}
		}
		return result
	}



	export default {
		data() {
			let formData = {
				"publish_date": null,
				"game_title": "",
				"game_type": "",
				"game_description": "",
				"game_imgUrl": "",
				"platforms": [{
					"platform_name": "",
					"platform_iconUrl": "",
					"platform_link": ""
				}]
			}
			return {
				formData,
				formOptions: {},
				rules: {
					...getValidator(Object.keys(formData))
				}
			}
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		methods: {
			addPlatform() {
				this.formData.platforms.push({
					platform_name: '',
					platform_iconUrl: '',
					platform_link: ''
				});
			},
			/**
			 * 验证表单并提交
			 */
			submit() {
				uni.showLoading({
					mask: true
				})
				this.$refs.form.validate().then((res) => {
					console.log(res);
					return this.submitForm(res)
				}).catch(() => {}).finally(() => {
					uni.hideLoading()
				})
			},

			/**
			 * 提交表单
			 */
			submitForm(value) {
				// 使用 clientDB 提交数据
				return db.collection(dbCollectionName).add(value).then((res) => {
					uni.showToast({
						icon: 'none',
						title: '新增成功'
					})
					this.getOpenerEventChannel().emit('refreshData')
					setTimeout(() => uni.navigateBack(), 1000)
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.uni-container {
		padding: 15px 600px;
		.topout{
			text-align: center;
			padding: 10px;
			border-bottom: 4px solid #0f3fff;
		}
	}

	.uni-input-border,
	.uni-textarea-border {
		width: 100%;
		font-size: 14px;
		color: #666;
		border: 1px #e5e5e5 solid;
		border-radius: 5px;
		box-sizing: border-box;
	}

	.uni-input-border {
		padding: 0 10px;
		height: 35px;

	}

	.uni-textarea-border {
		padding: 10px;
		height: 80px;
	}

	.uni-button-group {
		margin-top: 20px;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
	}

	.uni-button {
		width: 184px;
	}
</style>