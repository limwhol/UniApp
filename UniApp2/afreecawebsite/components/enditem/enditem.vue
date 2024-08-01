<template>
	<view class="footcontainer">
		©{{currentYear}} 深圳市阿飞卡科技有限公司 版权所有 粤ICP备2022092546号-1
	</view>
</template>

<script>
	export default {
		name: "enditem",
		data() {
			return {
			};
		},
		props: {
			currentYear: {
				type: Number,
				default:null
			}
		}
	}
</script>

<style lang="scss">
	.footcontainer {
		display: flex;
		align-items: center;
		color: #fff;
		// background-color: #ffaa00;
		height: 30px;
	}
</style>