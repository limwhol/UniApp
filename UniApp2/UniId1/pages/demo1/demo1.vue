<template>
	<view>
		
	</view>
</template>

<script>
	const db=uniCloud.database()
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			getData(){
				db.collection("users").where("age<43&&age>30").get().then(res=>{
					console.log(res)
				})
			}
		}
	}
</script>

<style>

</style>
