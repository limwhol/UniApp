<template>
	<view class="main">
		<view class="btnGroup">
			<button @click="toLogin">登录</button>
			<button @click="toCenter">个人中心</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			toLogin(){
				uni.navigateTo({
					url:"../../uni_modules/uni-id-pages/pages/login/login-withpwd"
				})
			},
			toCenter(){
				uni.navigateTo({
					url:"../../uni_modules/uni-id-pages/pages/userinfo/userinfo"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.main{
	padding: 30rpx;
}
</style>
