<template>
	<view class="totalbox">
		<view class="out">
			<top />
		</view>
		<view class="title">
			<view>《{{productObj.game_title}}》</view>
			<view class="titlesub">类型：{{productObj.game_type}}</view>
			<view class="fatherbigpic">
				<view class="bigpic" v-for="(item,index) in 5" :key="index">
					<img :src="productObj.game_imgUrl" alt="" />
				</view>
			</view>

			<view class="description">介绍：{{productObj.game_description}}</view>
			<view class="downloadpad">
				<view class="download">选择平台下载游戏</view>
				<view class="launchgame">
					<view class="platform" v-for="(find,index) in productObj.platforms" :key="index">
						<view class="leftbox">
							<img :src="find.platform_iconUrl" alt="find.platform_name" class="platformImg"
								@click="goPlatform(find.platform_link)" />
						</view>
						<view class="rightbox">{{find.platform_name}}</view>
					</view>
				</view>
			</view>

			<view class="posttime">
				阿飞卡游戏发布于<uni-dateformat :date="productObj.publish_date" format="yyyy年MM月dd日"></uni-dateformat>
			</view>
		</view>

		<view class="endbox">
			<enditem :currentYear="currentYear"></enditem>
		</view>
	</view>
</template>

<script>
	const db = uniCloud.database()
	export default {
		data() {
			return {
				product_id: "",
				productObj: {},
				currentYear: null
			}
		},
		onLoad(e) {
			// console.log(e);
			this.product_id = e.id
			this.getData()
			this.currentYear = new Date().getFullYear();
		},
		methods: {
			async getData() {
				let res
				try {
					res = await db.collection("afree-product").where(`_id=="${this.product_id}"`).get()
					this.productObj = res.result.data[0]
					console.log(this.productObj);
				} catch (error) {
					console.log("Database query failed:", error);
				}
			},
			goPlatform(link) {
				console.log(link);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.totalbox {
		background-color: rgb(241, 241, 241);


		.out {
			width: 100%;
			height: auto;
			background-color: rgb(14, 93, 197);
			color: #fff;

		}

		.title {
			margin-top: 50px;
			font-size: 50px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			color: #292828;

			/* 背景容器的z-index值 */
			.titlesub {
				margin-top: 10px;
				font-size: 22px;
				color: #858585;
			}

			.description {
				margin-top: 10px;
				font-size: 18px;
				color: #474747;
			}


			.fatherbigpic {
				margin-top: 10px;
				display: flex;
				justify-content: space-between;
				align-items: center;

				// background-color: #858585;
				.bigpic {
					margin-right: 20px;
					margin-top: 10px;
					width: 200px;

					img {
						width: 100%;
						height: 100%;
						border-radius: 5px;
					}
				}
			}

			.downloadpad {
				margin-top: 40px;
				width: 600px;
				height: 200px;
				border-radius: 5px;
				background-color: #fff;
				border: 1px solid #e8e8e8;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.download {
					font-size: 24px;
					color: #474747;
					height: 34px;
					font-weight: bold;
					text-align: center;
					border-bottom: 3px solid #2aeaff;
				}

				.launchgame {
					margin-top: 20px;
					display: flex;
					justify-content: center;
					align-items: center;

					.platform {
						margin: 0 10px;
						display: flex;
						justify-content: space-around;
						align-items: center;
						background-color: #cefbff;
						border-radius: 30px 0 0 30px;

						.leftbox {
							margin-right: 10px;
							width: 60px;
							height: 60px;

							img {
								width: 100%;
								height: 100%;
							}
						}

						.rightbox {
							font-size: 18px;
							height: 30px;
							margin-right: 10px;
							display: flex;
							justify-content: center;
							align-items: center;
						}

					}
				}
			}


			.posttime {
				margin-top: 160px;
				font-size: 12px;
				color: #cbcbcb;
			}
		}

		.endbox {
			margin-top: 10px;
			width: 100%;
			height: 100px;
			font-size: 16px;
			background-color: rgb(14, 93, 197);
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>