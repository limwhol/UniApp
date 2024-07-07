<template>
	<view class="detail">

		<unicloud-db :where="`_id=='${artID}'`" v-slot:default="{data, loading, error, options}" :getone="true"
			:collection="collectionList">
			<view v-if="error">{{error.message}}</view>
			<view v-else-if="loading">
				<view class="loadingState" v-if="loading">
					<u-skeleton rows="5" title loading avatar></u-skeleton>
				</view>
			</view>
			<view v-else>
				<view class="top">
					{{data.title}}
				</view>
				<view class="topinfo">
					<view class="avatar">
						<image
							:src="data.user_id[0].avatar_file.url?data.user_id[0].avatar_file.url:'@/static/images/1.png'">
						</image>
					</view>
					<view class="authorbox">
						<view class="author">
							{{data.user_id[0].nickname?data.user_id[0].nickname:data.user_id[0].username}}
						</view>
						<view class="timeandlocation">
							<view class="posttime">
								<uni-dateformat :date="data.publish_date"
									format="yyyy年MM月dd hh:mm:ss "></uni-dateformat>发布于{{data.province}}
							</view>
							<view class="location">

							</view>
						</view>
					</view>
				</view>
				<view class="middlecontent">
					<u-parse :content="data.content"></u-parse>
				</view>
			</view>
		</unicloud-db>

	</view>
</template>

<script>
	const db = uniCloud.database()
	export default {
		data() {
			return {
				artID: "",
				collectionList: [
					db.collection('mayiquanzi_article').field(
						'title,user_id,description,picurls,comment_count,like_count,view_count,publish_date,province,content')
					.getTemp(),
					db.collection('uni-id-users').field('_id,username,nickname,avatar_file').getTemp()
				]
			};
		},
		onLoad(e) {
			console.log(e)
			this.artID = e.id
		}
	}
</script>

<style lang="scss">
	.detail {

		padding: 30rpx;
		background-color: #f8f8f8;
		min-height: calc(100vh-var(--window-top));

		.top {
			font-size: 48rpx;
			color: #333;
			font-weight: 1.7em;
			margin-bottom: 20rpx;
		}

		.topinfo {
			display: flex;
			justify-content: left;
			align-items: center;
			margin-bottom: 20rpx;

			.avatar {
				width: 60rpx;
				height: 60rpx;
				margin-right: 20rpx;

				image {
					border-radius: 50%;
					width: 100%;
					height: 100%;
				}
			}

			.authorbox {
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				align-items: flex-start;

				.author {
					font-size: 26rpx;
					color: #333;
				}

				.timeandlocation {
					display: flex;
					justify-content: left;
					align-items: center;
					font-size: 22rpx;
					color: #999;

					.posttime {
						margin-right: 10rpx;
					}
				}
			}
		}
	}
</style>