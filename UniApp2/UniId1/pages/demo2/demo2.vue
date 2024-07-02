<template>
	<view>
		<unicloud-db v-slot:default="{data, loading, error, options}" 
		collection="article,uni-id-users" 
		orderby="_id desc" 
		field="title,content,userid.username,userid.avatar_file">

			<view v-if="error">{{error.message}}</view>
			<view v-else-if="loading">
				<uni-load-more status="loading"></uni-load-more>
			</view>
			<view v-else>
				<uni-list>
					<uni-list-item v-for="item in data" :key="item._id" 
					:title="item.title" 
					:note="item.content" 
					:rightText="item.userid[0].username" 
					:thumb="item.userid[0].avatar_file.url"></uni-list-item>
				</uni-list>
			</view>
		</unicloud-db>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
