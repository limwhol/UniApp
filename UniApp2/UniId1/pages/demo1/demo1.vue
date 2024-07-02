<template>
	<view>
		<view class="">
			<button @click="onLogin">登录</button>
			<button @click="onLogout">退出</button>
			<view class="">
				<uni-list>
					<uni-list-item v-for="item in listArr" :key="item._id" :title="item.title" :note="item.content" :thumb="getUserAvatar(item)" thumb-size="lg" :rightText="getUserName(item)"></uni-list-item>
				</uni-list>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mutations
	} from "@/uni_modules/uni-id-pages/common/store.js"
	const db = uniCloud.database()
	export default {
		data() {
			return {
				listArr: []
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			getData() {
				// db.collection("article").get().then(res=>{
				// 	console.log(res)
				let articleTemp = db.collection("article").field("userid,content,title").getTemp()
				let userTemp = db.collection("uni-id-users").field("_id,nickname,username,avatar_file").getTemp()
				db.collection(articleTemp, userTemp).orderBy("_id desc").get().then(res => {
					console.log(res)
					this.listArr = res.result.data
				})
			},
			onLogin() {
				uni.navigateTo({
					url: "/uni_modules/uni-id-pages/pages/login/login-withpwd"
				})
			},
			onLogout() {
				mutations.logout()
			},
			getUserName(item) {
				if (item.userid && item.userid.length > 0 && item.userid[0].username) {
					return item.userid[0].username
				} else {
					return 'Unknown User'
				}
			},
			getUserAvatar(item) {
				if (item.userid && item.userid.length > 0 && item.userid[0].avatar_file && item.userid[0].avatar_file
					.url) {
					return item.userid[0].avatar_file.url
				} else {
					return 'default-avatar-url' // 替换为实际的默认头像URL
				}
			}
		}
	}
</script>

<style>

</style>