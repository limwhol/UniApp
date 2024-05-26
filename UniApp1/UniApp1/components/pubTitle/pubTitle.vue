<template>
	<view class="pubTitle">
		<view class="time">
			{{time}}
		</view>
		<view class="big">
			{{title}}
		</view>
		<view class="small">
			{{subtitle}}
		</view>
		<view class="line">
			
		</view>
		<view class="list">
			{{list}}
		</view>
		<view class="obj">
			{{obj}}
		</view>
	</view>
</template>

<script>
	export default {
		name:"pubTitle",
		props:{
			title:{
				type:String,
				default:"默认大标题"
			},
			subtitle:{
				type:String,
				default:"默认副标题"
			},
			time:{
				type:Number,
				default:function(){
					return Date.now()
				}
			},
			list:{
				type:Array,
				default:function(){
					return [1,2,3]
				}
			},
			obj:{
				type:Object,
				default:function(){
					return {name:"Kelly",gender:"girl"}
				}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.pubTitle{
	padding: 20rpx 30rpx;
	text-align: center;
	.time{
		font-size: 30rpx;
		color: #888;
	}
	.big{
		font-size: 50rpx;
		font-weight: 600;
		color: #333;
	}
	.small{
		font-size: 30rpx;
		color: #888;
	}
	.line{
		display: inline-block;
		width: 80rpx;
		height: 10rpx;
		background-color: #1aa034;
		border-radius: 15rpx;
	}
	.time{
		font-size: 30rpx;
		color: #888;
	}
}
</style>