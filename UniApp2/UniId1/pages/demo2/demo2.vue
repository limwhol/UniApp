<template>
	<view>
		<unicloud-db v-slot:default="{data, loading, error, options}" collection="article">
			<view v-if="error">{{error.message}}</view>
			<view v-else>
				<uni-list>
					<uni-list-item v-for="item in data" :key="item._id" :title="item.title" :note="item.content" :rightText="item.posttime"></uni-list-item>
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
