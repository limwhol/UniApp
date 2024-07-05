<template>
	<view class="edit">
		<view class="title">
			<input type="text" placeholder="输入标题……" placeholder-class="placeholderClass" />
		</view>
		<view class="content">
			<editor placeholder="输入内容……"></editor>
		</view>
		<view class="btnGroup">
			<u-button text="确认发表" type="primary" disabled="false"></u-button>
		</view>
		<view class="tools">
			<view class="item"><text class="iconfont icon-xiaoxi"></text></view>
			<view class="item"><text class="iconfont icon-zan"></text></view>
			<view class="item"><text class="iconfont icon-shezhi"></text></view>
			<view class="item"><text class="iconfont icon-faxian"></text></view>
			<view class="item"><text class="iconfont icon-xiugai"></text></view>
			<view class="item"><text class="iconfont icon-youleyuan"></text></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	/deep/ .ql-blank::before {
		font-style: normal;
		color: #e4e4e4;
		font-size: 36rpx;
	}

	.edit {
		padding: 30rpx;

		.title {
			input {
				font-size: 46rpx;
				height: 120rpx;
				border-bottom: 1rpx solid #e4e4e4;
				margin-bottom: 30rpx;
			}

			.placeholderClass {
				color: #e4e4e4;
			}
		}

		.content {
			height: calc(100vh - 500rpx);
			margin-bottom: 30rpx;
		}

		.tools {
			width: 100%;
			height: 80rpx;
			display: flex;
			border-top: 1rpx solid #f4f4f4;
			position: fixed;
			left: 0;
			bottom: 0;
			justify-content: space-around;
			align-items: center;

			.iconfont {
				font-size: 36rpx;
				color: #333;

				&.active {
					color: #0199FE;
				}
			}

		}
	}
</style>