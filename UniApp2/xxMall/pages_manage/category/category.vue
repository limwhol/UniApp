<template>
	<view class="category">
		<view class="row add" @click="clickAdd">
			<view class="left">
				<u-icon name="plus" color="#576b95" size="22"></u-icon>
				<text class="text">新增分类</text>
			</view>
		</view>
		<view class="row" v-for="(item,index) in categoryList" :key="index">
			<view class="left">
				<view class="name">
					{{item.name}}
				</view>
			</view>
			<view class="right">
				<u-icon name="edit-pen" size="26" color="#576b95" @click="updateData(item)"></u-icon>
				<u-icon name="trash" size="26" color="#ec544f" @click="deleteDate(index)"></u-icon>
			</view>
		</view>
		<uni-popup ref="inputDialog">
			<uni-popup-dialog placeholder="请输入分类名称" mode="input" title="分类名称" @confirm="dialogConfirm" :value="iptValue"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				categoryList: [{
					_id: 1,
					name: "干果"
				}, {
					_id: 2,
					name: "饮料"
				}, {
					_id: 3,
					name: "酒类"
				}],
				iptValue:""
			};
		},
		methods:{
			updateData(item){
				this.iptValue=item.name
				this.$refs.inputDialog.open()
			},
			dialogConfirm(e){
				console.log(e);
				this.categoryList.push({
					_id:Date.now(),
					name:e
				})
				
			},
			clickAdd(){
				this.iptValue=""
				this.$refs.inputDialog.open()
			},
			deleteDate(e){
				uni.showModal({
					content:"是否删除该分类？",
					success:res=>{
						if(res.confirm){
							this.categoryList.splice(e,1)
						}
					},
					fail:err=>{
						console.log(err);
					}
				})
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.category {
		padding: 30rpx;

		.row {
			@include flex-box();
			border-bottom: 1px solid $border-color-light;
			padding: 26rpx 0;

			.left {
				font-size: 34rpx;

				.text {
					padding-left: 14rpx;
					font-size: 36rpx
				}
			}

			.right {
				@include flex-box();

				.u-icon {
					margin-left: 30rpx;
				}
			}
		}

		.row.add {
			.left {
				color: $brand-theme-color-aux;
				@include flex-box();
			}
		}
	}
</style>