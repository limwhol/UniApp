<template>
	<view>
		<view class="">
			<button @click="onLogin">登录</button>
			<button @click="onLogout">退出</button>
			<view class="">
				<uni-list>
					<uni-list-item v-for="item in listArr" :key="item._id" :title="item.title" :note="item.content"></uni-list-item>
				</uni-list>
			</view>
		</view>
	</view>
</template>

<script>
	import {mutations} from "@/uni_modules/uni-id-pages/common/store.js"
	const db=uniCloud.database()
	export default {
		data() {
			return {
				listArr:[]
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			getData(){
				db.collection("article").get().then(res=>{
					console.log(res)
					this.listArr=res.result.data
				})
			},
			onLogin(){
				uni.navigateTo({
					url:"/uni_modules/uni-id-pages/pages/login/login-withpwd"
				})
			},
			onLogout(){
				mutations.logout()
			}
		}
	}
</script>

<style>

</style>
