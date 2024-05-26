<template>
<view>
	<view v-if="state" class="out">研发好棒棒</view>
	<view v-else>
		{{title}}
	</view>
	<view v-for="(item,index) in arr" class="out" :key="index">
		<view class="row">{{(index+1)+" - "+item}}</view>
	</view>
	<view v-for="(item,index) in object" :key="index" class="out">
		<view class="row">{{object[index]}}</view>
	</view>
	<view class="out">
		<image :src="'../../static/images/pic'+(index+1)+'.jpg'" mode="widthFix" v-for="(item,index) in [1,2,3]"></image>
	</view>
	<view v-on:click="doSomething" class="addNumber">
		ClickMe
	</view>
	<view v-on:click="addOne" class="addNumber">
		{{addNumber}}
	</view>
	<view v-on:click="changeColor" class="changeColor" :style="{background:backColor}">
		
	</view>
	<view v-on:click="changeClass" class="changeColor3" :class="isClassChanged?'changeColor2':''">
		asdada
	</view>
</view>

</template>

<script>
	export default {
		data() {
			return {
				imgUrl:"../../static/images/pic1.jpg",
				title:"李秋风好棒棒",
				state:true,
				arr:["PHP","Java","Python"],
				object:{
					name:"janet",
					age:45,
					gender:"female"
				},
				addNumber:1,
				backColor:"#ccc",
				isClassChanged:false
			};
		},
		methods:{
			doSomething(){
				console.log("doSomething");
				this.state=false;
				this.title="李秋风傻逼"
			},
			addOne(){
				this.addNumber++
			},
			changeColor(){
				  var randomColor = Math.floor(Math.random() * 16777215).toString(16);
				  while (randomColor.length < 6) {
				    randomColor = '0' + randomColor;
				  }
				  randomColor='#' + randomColor;
				this.backColor=randomColor;
			},
			changeClass(){
				console.log("method on");
				this.isClassChanged=!this.isClassChanged
				console.log(this.isClassChanged);
			}
		}
	}
</script>

<style lang="scss">
.out{
	padding: 20rpx;
	.row{
		font-size: 20rpx, 20rpx;
		border-bottom: 1rpx dashed #ccc;
	}
}
.addNumber{
	margin-top: 5rpx;
	width: 100%;
	padding: 20rpx;
	background-color: #ccc;
	text-align: center;
	border-bottom: 1rpx dashed #5a5a5a;
}
.changeColor{
	width: 400rpx;
	height: 400rpx;
	background-color: #ccc;
}
.changeColor2{
	background-color: red;
}
.changeColor3{
	width: 400rpx;
	height: 400rpx;
	background-color: green;
}
</style>
