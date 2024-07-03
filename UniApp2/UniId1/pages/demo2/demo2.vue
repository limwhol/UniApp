<template>
	<view>
		<unicloud-db v-slot:default="{data, loading, error, options}" collection="article,uni-id-users"
			orderby="_id desc" field="title,content,userid.username,userid.avatar_file" loadtime="auto" ref="udb">

			<view v-if="error">{{error.message}}</view>
			<view v-else-if="loading">
				<uni-load-more status="loading"></uni-load-more>
			</view>
			<view v-else>
				<uni-list>
					<uni-list-item v-for="item in data" :key="item._id" :title="item.title" :note="item.content"
						:rightText="item.userid[0].username" :thumb="item.userid[0].avatar_file.url" clickable
						@click="onRemove(item._id)"></uni-list-item>
				</uni-list>
			</view>
		</unicloud-db>
		<view class="">
			<!-- <button @click="getData">获取数据</button> -->
			<button @click="addData">添加数据</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			// getData() {
			// 	this.$refs.udb.loadData()
			// },
			onRemove(id) {
				this.$refs.udb.remove(id)
			},
			addData() {
				let obj = {
					title: "小肥猪",
					content: "小猫咪喵喵叫"
				}
				this.$refs.udb.add(obj)
				this.$refs.udb.refresh()
			}
		},
		onReady() {

		}
	}
</script>

<style>

</style>