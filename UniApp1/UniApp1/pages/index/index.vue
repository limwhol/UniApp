<template>
	<view class="box">
		<navigator url="/pages/demo3/demo3?wd=uniapp&ps=12345">跳转到DEMO3</navigator>
		<view style="width: 200rpx;height: 200rpx;background-color:blue;" @click="godemo3"></view>
		<view style="width: 200rpx;height: 200rpx;background-color:blanchedalmond;" @click="goabout"></view>	
		
		<pubTitle :obj="obj" :list="[4,5,6]" :time="123123" :title="test" subtitle="文章副标题" />
		<myitem></myitem>
		<h1>李秋风学习文档</h1>
		<navigator url="/pages/list/list">清单页面</navigator>
		<navigator url="/pages/demo/demo">Demo</navigator>
		<navigator url="/pages/about/about" open-type="redirect">关于我们</navigator>
		<button size="mini">确认提交</button>
		<button size="mini" type="primary">确认提交</button>
		<button size="mini" type="warn" loading>确认提交</button>
		<icon type="success" size="26" />
		<icon type="waiting" size="26" />
		<scroll-view class="scroll" scroll-x="true" >
			<view class="group">
				<view class="item">
					111
				</view>
				<view class="item">
					222
				</view>
				<view class="item">
					333
				</view>
				<view class="item">
					444
				</view>
			</view>
		</scroll-view>
		<swiper class="swiper" circular autoplay duration="100" interval="1500" indicator-dots>
			<swiper-item class="item">
				<image src="../../static/images/pic1.jpg" mode="aspectFill"></image>
			</swiper-item>
			<swiper-item class="item">
				<image src="../../static/images/pic2.jpg" mode="aspectFill"></image>
			</swiper-item>
			<swiper-item class="item">
				<image src="../../static/images/pic3.jpg" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				test:"狗屎一大堆",
				obj:{name:"Janet",gender:"boy"}
			}
		},
		methods:{
			godemo3(){
				uni.navigateTo({
					url:"/pages/demo3/demo3"
				})
			},
			goabout(){
				uni.reLaunch({
					url:"/pages/about/about"
				})
			}
		}
	}
</script>

<style lang="scss">
.box{
	width: 100%;
	height: 900rpx;
	padding: 0rpx 0rpx;
	background-color:pink;
	h1{
		text-align: center;
		color:#efefef;
	}
	.scroll{
		border: 1px solid red;
		box-sizing: border-box;
		.group{
			white-space: nowrap;
			.item{
				width: 220rpx;
				height: 220rpx;
				margin-right: 10rpx;
				background-color: royalblue;
				display: inline-block;
			}
			:last-child{
				margin-right: 0rpx;
			}
		}
	}
	.swiper{
		border: 1px solid red;
		box-sizing: border-box;
		white-space: nowrap;
		height: 440rpx;
		.item{
			width: 220rpx;
			display: inline-block;
			image{
				width: 100%;
			}
		}
	}
}
</style>
