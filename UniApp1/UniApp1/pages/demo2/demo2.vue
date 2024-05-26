<template>
	<view>
		<view class="nav">
			<view class="item" :class="navIndex==index? 'active':''" v-for="(item,index) in navArr" :key="index" @click="selectItem(index)">
				{{item.title}}
			</view>
		</view>
		<view class="vbind">
			<view class="">
				您的名字是:{{title}}</view>
			<input type="text" v-model="title" class="innerInput" />
		</view>
		<view class="out">
			<view>请输入表单信息：</view>
			<view class="row">
				<input type="text" v-model="userInfo.name" placeholder="输入姓名..." class="border" />
			</view>
			<view class="row">
				<input type="text" v-model="userInfo.phone" placeholder="输入电话号码..." class="border" />
			</view>
			<view class="row">
				<textarea v-model="userInfo.content" placeholder="输入留言..." />
			</view>
			<view>
				<button type="primary" @click="onSubmit">点击提交</button>
			</view>
			<br />
			<view>
				姓名：{{userInfo.name}}
			</view>
			<view>
				电话：{{userInfo.phone}}
			</view>
			<view>
				内容：{{userInfo.content}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navArr:[
					{title:"首页"},
					{title:"列表"},
					{title:"人力"},
					{title:"产品"},
					{title:"市场"},
					{title:"商务"}
				],
				isSelected:false,
				navIndex:0,
				title:"章華",
				userInfo:{
					name:"",
					phone:"",
					content:""
				}
			};
		},
		methods:{
			selectItem(e){
				this.navIndex=e
			},
			onSubmit(){
				console.log(this.userInfo.name+" - "+this.userInfo.phone+" - "+this.userInfo.content)
			}
		}
	}
</script>

<style lang="scss">
.nav{
	display: flex;
	align-items: center;
	justify-content: space-around;
	margin: 12rpx;
	.item{
		flex: 1;
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #6d6d6d;
		font-size: 26rpx;
		&.active{
			background-color: #779084;
			color: #efefef;
			border-radius: 30rpx;
		}
	}
}
	.vbind{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 12rpx;
		.innerInput{
			width:80%;
			height: 40rpx;
			margin: 12rpx;
			padding: 2rpx 8rpx;
			border: 1rpx solid #6d6d6d;
			border-radius: 15rpx;
		}
}
		.out{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin: 12rpx;
			.row{
				width:80%;
				margin: 12rpx;
				padding: 10rpx;
				border: 1rpx solid #6d6d6d;
				border-radius: 15rpx;
				input{
					height: 40rpx;
				}
				textarea{
					height: 300rpx;
				}
			}
		}
</style>
