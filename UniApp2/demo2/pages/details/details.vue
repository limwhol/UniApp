<template>
	<view>
		<view class="outbox">
				<view class="title">
					{{newsObj.title}}
				</view>
				<view class="body">
					{{newsObj.body}}
				</view>
				<view class="comment">
					<view class="title">COMMENTS</view>
					<view class="row" v-for="item in commentsArr" :key="item.id">
						<view class="top">
							<view class="username">
								UserName: {{item.name}}
							</view>
							<view class="useremail">
								Email: {{item.email}}
							</view>
						</view>
						<view class="body">
							{{item.body}}
						</view>
					</view>
				</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newsObj:{},
				itemNum:0,
				commentsArr:[]
			};
		},
		methods:{
			newsDetailsRequest(){
				uni.showLoading({
					title:"数据加载中...",
					mask:true
				})
				uni.request({
					url:"http://jsonplaceholder.typicode.com/posts/"+this.itemNum,
					success:res=>{
						this.newsObj=res.data
					},
					complete:()=>{
						uni.hideLoading() 
					}
				})
			},
			newsCommentsRequest(){
				uni.request({
					url:`http://jsonplaceholder.typicode.com/posts/${this.itemNum}/comments`,
					success:res=>{
						console.log(res)
						this.commentsArr=res.data
					}
				})
			}
		},
		onLoad(e) {
			
			this.itemNum=e.id;
			console.log(this.itemNum)
			this.newsDetailsRequest();
			this.newsCommentsRequest();
		}
	}
</script>

<style lang="scss">
.outbox{
	padding: 10rpx 30rpx;
	.title{
		font-size: 40rpx;
		font-weight: bold;
		color: #555555;
	}
	.body{
		padding: 20rpx 0rpx;
		font-size: 32rpx;
		color: #737373;
	}
	.comment{
		color: #737373;
		border-radius: 12rpx;
		.title{
			padding: 10rpx 0rpx;
			font-size: 24rpx;
			color: #a1a1a1;
		}
		.row{
			padding: 10rpx 20rpx;
			background-color: #efefef;
			
			.top{
				.username{
					padding-bottom: 10rpx;
					font-size: 20rpx;
				}
				.useremail{
					font-size: 20rpx;
				}
			}
			.body{
				padding-bottom: 30rpx;
				font-size: 26rpx;
				color: #3a3a3a;
				border-bottom: 1rpx dashed #636363;
			}
		}
	}
}	
</style>
