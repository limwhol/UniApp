<template>
	<view>
		<myitem></myitem>
		<view @click="goback"> < 返回上一页</view>
		<form @submit="onSubmit">
			<view class="row">
				<input type="text" name="username" />
			</view>
			<view class="row">
							<radio-group name="gender">
			<radio value="男" checked="true">男</radio>
			<radio value="女">女</radio>
							</radio-group>
						</view>
						<view class="row">
<picker :range="options" @change="onChange" name="school" :value="selectValue">
	<view>点击选择学历：{{options[selectValue]}}</view>
</picker>
									</view>
			<view class="row">
				<button form-type="submit" type="primary">提交表单</button><button form-type="reset">重置</button>
			</view>

			<view>
				{{obj}}
			</view>
			<view>
				输入信息：<input type="text" v-model="title" />
				同步信息：{{title}}
				转化信息2：{{changeuper}}
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				obj:{},
				selectValue:0,
				options:["高中","大专","本科","研究生"],
				title:""
			};
		},
		methods:{
			onSubmit(e){
				
				this.obj=e.detail.value
				console.log(this.obj)
			},
			goback(){
				uni.navigateBack()
			},
			onChange(e){
				console.log(e)
				this.selectValue=e.detail.value
			}
		},
		computed:{
			changeuper(){
				return this.title.toLocaleUpperCase()
			}
		},
		mounted(){
			console.log(this.$route.query.wd+this.$route.query.ps)
		}
	}
</script>

<style lang="scss">

</style>
