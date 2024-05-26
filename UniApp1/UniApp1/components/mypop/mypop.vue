<template>
	<view>
		<view class="out" :style="{height:state?'300rpx':'0'}">
			弹出窗口
		</view>
		<button size="mini" @click="closeBtn">Close</button>
	</view>
</template>

<script>
	export default {
		name:"mypop",
		data() {
			return {
				
			};
		},
		props:{
			state:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			closeBtn(){
				this.$emit("stateEnv",false)
			}
		}
	}
</script>

<style lang="scss">
.out{
	width: 300rpx;
	height: 300rpx;
	background-color: #999999;
}
</style>