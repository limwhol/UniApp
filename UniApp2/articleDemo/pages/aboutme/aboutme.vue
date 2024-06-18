<template>
	<view class="aboutme">
		<view class="title">
			阮佳
		</view>
		<view class="content">
			阮佳，男， [2]CG艺术家、概念设计师。 [1]曾在ArenaNET（《激战》开发商）以及美国的微软343 Industries等公司就职，从事开发《光晕》系列的次世代游戏。参与项目《激战2》、《光晕》、《魔兽世界》、《暗黑破坏神3》、《狮子王》。
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
			// async getInfor(){
			// 	let id,res
			// 	res=await this.getNav()
			// 	id=res.deta[0].id
				
			// 	res=await this.getList(id)
			// 	id=res.data[0].id
				
			// 	res=await this.getCommnet(id)
			// 	console.log(res)
			// }
		}
	}
</script>

<style lang="scss" scoped>
.aboutme{
	padding: 30rpx;
	.title{
		font-size: 50rpx;
		color: black;
		font-weight: bold;
		text-align: center;
		margin-bottom: 26rpx;
	}
	.content{
		text-indent: 2em;
		font-size: 30rpx;
		color:#767676;
		line-height: 1.8em;
	}
}
</style>
