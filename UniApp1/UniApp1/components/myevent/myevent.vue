<template>
	<view>
		{{title}}
		<view class="">
			<input type="text" placeholder="Pls input..." @input="oninput">
		</view>
	</view>

</template>

<script>
	export default {
		name:"myevent",
		data() {
			return {
				
			};
		},
		props:{
			title:{
				type:String,
				default:"大逼斗"
			}
		},
		methods:{
			oninput(e){
				console.log(e.detail.value)
				this.$emit("myenv",e.detail.value)
			}
		}
	}
</script>

<style lang="scss">

</style>