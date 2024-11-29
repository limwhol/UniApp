<template>
	<view class="customHead" :style="{height:totalHeight+'px'}">
		<view class="bg">
			<image class="bgImg" src="../../static/images/x.png" mode="aspectFill"></image>
		</view>
		<view class="container">
			<view class="statusBar" :style="{height: statusBarHeight+'px'}"></view>
			<view class="service" :style="{height:titleBarHeight+'px'}" v-if="!foldState">
				<view class="kefu">
					<u-icon name="server-fill" size="20" color="#fff"></u-icon>
				</view>
				<navigator class="manage">
					<u-icon name="bag-fill" size="20" color="#fff"></u-icon>
					后台管理
				</navigator>
			</view>
			<view class="body" :class="foldState?'fold':''" :style="{height:bodyBarHeight+'px'}">
				<view class="brand">
					<view class="pic">
						<image src="../../static/images/x.png" mode="aspectFill" class="img"></image>
					</view>
					<view class="text">
						<view class="title">
							<text class="font">李雨嘉的小店</text>
							<u-icon class="icon" name="more-circle" size="20" color="#fff"></u-icon>
						</view>
						<view class="des">一大堆品牌介绍一大堆品牌介绍一大堆品牌介绍一大堆品牌介绍一大堆品牌介绍</view>
					</view>
				</view>
				<view class="code">
					<view class="pic">
						<image src="../../static/images/qrcode.png" mode="aspectFill" class="img"></image>
					</view>
					<text class="pay">付款</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapGetters} from "vuex"
	export default {
		name:"custom-head-bar",
		data() {
			return {
				//已经通过vuex调用下面的数据，不再需要在本页面进行定义
				// statusBarHeight:0,
				// titleBarHeight:0
			};
		},
		props:{
		},
		computed:{
			...mapGetters(["statusBarHeight","titleBarHeight","bodyBarHeight","totalHeight","foldState"])
			// totalHeight(){
			// 	if(this.foldState){
			// 		return this.statusBarHeight+this.titleBarHeight+10
			// 	}else{
			// 		return this.statusBarHeight+this.titleBarHeight+110
			// 	}
			// },
			// bodyBarHeight(){
			// 	if(this.foldState){
			// 		return this.titleBarHeight
			// 	}else{
			// 		return
			// 	}
			// }
		}
		// mounted(){
		// 	let systemInfo=uni.getSystemInfoSync()
		// 	console.log(systemInfo);
		// 	this.statusBarHeight=systemInfo.statusBarHeight
		// 	//胶囊按钮的相关信息
		// 	// #ifdef MP-WEIXIN
		// 	let menuBtnInfo=uni.getMenuButtonBoundingClientRect()
		// 	this.titleBarHeight=menuBtnInfo.height+(menuBtnInfo.top-this.statusBarHeight)*2
		// 	// #endif
		// 	// #ifndef MP-WEIXIN
		// 	this.titleBarHeight=40
		// 	// #endif
		// }
	}
</script>

<style lang="scss">
.customHead{
	height: 400rpx;
	overflow: hidden;
	position: relative;
	.bg{
		width: 100%;
		height: 100%;
		.bgImg{
			width: 100%;
			height: 100%;
			filter:blur(30rpx) ;
			transform: scale(3);
		}
	}
	.container{
		position: absolute;
		top: 0;
		left: 0;
		//border: 3px solid red;
		width: 100%;
		.statusBar{
			//border: 1px solid green;
		}
		.service{
			//border: 1px solid blue;
			padding-left: 30rpx;
			@include flex-box-set(start);
			color: #fff;
			.manage{
				margin-left: 20rpx;
				@include flex-box-set(start);
			}
		}
		.body{
			@include flex-box();
			padding: 0 20rpx;
			padding-top: 60rpx;
			height: 100px;
			transition: 0.3s;
			// border: 1px solid yellow;
			.brand{
				width: 580rpx;
				@include flex-box-set(start);
				.pic{
					width: 110rpx;
					height: 110rpx;
					border-radius: 50%;
					overflow: hidden;
					border: 1px dashed #999;
					.img{
						width: 100%;
						height: 100%;
					}
				}
				.text{
					flex: 1;
					padding: 0 20rpx;
					color: #fff;
					.title{
						font-size: 36rpx;
						font-weight: 800;
						display: flex;
						align-items: center;
						.font{
							margin-right: 10rpx;
						}
					}
					.des{
						font-size: 26rpx;
						width: 100%;
						opacity: 0.6;
						padding-top: 5rpx;
						@include ellipsis(1)
					}
				}
			}
			.code{
				width: 80rpx;
				height: 80rpx;
				border-left: 1px dashed #cecece;
				@include flex-box-set(between);
				flex-direction: column;
				.pic{
					width: 50rpx;
					height: 50rpx;
					.img{
						width: 100%;
						height: 100%;
					}
				}
				.pay{
					font-size: 24rpx;
					color: #fff;
					text-align: center;
				}
			}
		}
		.fold{
			padding: 0 30rpx;
			.code{
				display: none;
			}
			.brand{
				.pic{
					width: 40rpx;
					height: 40rpx;
					border-radius: 50%;
					overflow: hidden;
					border: 1px solid #c1c0cb;
					.img{
						width: 100%;
						height: 100%;
					}
				}
				.text{
					padding-left: 15rpx;
					.title{
						font-size: 28rpx;
					}
					.des{
						display: none;
					}
					.icon{
						transform: scale(0.8);
					}
				}
			}
		}
	}
}
</style>