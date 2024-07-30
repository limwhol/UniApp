<template>
	<view class="outbox">
		<uni-forms ref="form" :model="formData" validate-trigger="submit" err-show-type="toast">
			<uni-forms-item name="title" label="游戏名" required>
				<uni-easyinput placeholder="游戏名" v-model="formData.gameInfo.title" trim="both"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="description" label="游戏描述">
				<uni-easyinput placeholder="游戏描述" v-model="formData.gameInfo.description" trim="right"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="productImgUrl" label="游戏大图地址">
				<uni-easyinput placeholder="游戏大图地址" v-model="formData.gameInfo.productImgUrl"
					trim="both"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="icon_id" label="icon的ID集合">
				<uni-easyinput placeholder="icon的ID集合" v-model="formData.gameInfo.icon_id" trim="both"></uni-easyinput>
			</uni-forms-item>

			<!-- 平台信息列表 -->
			<div v-for="(platform, index) in formData.platforms" :key="index">
				<uni-forms-item :name="'platformName' + index" label="平台名称">
					<uni-easyinput placeholder="平台名称" v-model="platform.name" trim="both"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item :name="'platformIconUrl' + index" label="平台ICON">
					<uni-easyinput placeholder="平台ICON" v-model="platform.iconUrl" trim="both"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item :name="'platformLink' + index" label="跳转链接">
					<uni-easyinput placeholder="跳转链接" v-model="platform.link" trim="both"></uni-easyinput>
				</uni-forms-item>
			</div>

			<!-- 添加平台信息按钮 -->
			<button type="default" class="uni-button" @click="addPlatform">添加平台信息</button>

			<view class="uni-button-group">
				<button type="primary" class="uni-button" @click="submit">提交</button>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					gameInfo: {
						title: '',
						description: '',
						productImgUrl: '',
						icon_id: ''
					},
					platforms: [] // 初始为空数组
				}
			};
		},
		methods: {
			addPlatform() {
				this.formData.platforms.push({
					name: '',
					iconUrl: '',
					link: ''
				});
			},
			submit() {
				if (this.formData.platforms.length === 0) {
					// 至少需要一个平台信息
					uni.showToast({
						title: '请至少添加一个平台信息',
						icon: 'none'
					});
					return;
				}
				// 表单提交逻辑
			}
		}
	}
</script>

<style lang="scss">
	.outbox {
		padding: 150rpx 800rpx;
	}
</style>