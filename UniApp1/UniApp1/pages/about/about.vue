<template>
	<view>
		<pubTitle title="关于我们" subtitle="自从2019年开始" />
		
		<myevent title="笑屁顿" @myenv="onmyenv" @click.native="onclick" />
		<button @click="clickBtn">Open {{mystate}}</button>
		<mypop :state="mystate" @stateEnv="onStateEnv" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mystate:false
			}
		},
		methods: {
			onmyenv(e){
				console.log(e)
			},
			onclick(){
				console.log(555555)
			},
			clickBtn(){
				this.mystate=true
			},
			onStateEnv(e){
				this.mystate=e
			}
		}
	}
</script>

<style lang="scss">

</style>
