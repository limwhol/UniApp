<template>
	<view class="totalbox">
		<view class="out">
			<top />
		</view>
		<view class="title">
			<view>AFREECA GAMES` LATEST</view>
			<view class="titlesub">最新发布的游戏</view>
		</view>
		<view class="gamescontainer">
			<view class="container">
				<view class="" v-for="item in newsArr">
					<product-item :item="item"></product-item>
				</view>
			</view>
		</view>
		<view class="title">
			<view>BUSINESS COOPERATIONS</view>
			<view class="titlesub">商务合作洽谈</view>
		</view>
		<view class="gamescontainer">
			<view class="subcontainer">
				<business-item></business-item>
			</view>
		</view>
		<view class="title">
			<view>ABOUT US</view>
			<view class="titlesub">关于我们团队</view>
		</view>
		<view class="aboutus">
			<aboutus></aboutus>
		</view>
		<view class="endbox">
			<enditem></enditem>
		</view>
	</view>
</template>

<script>
	const db = uniCloud.database()
	export default {
		data() {
			return {
				newsArr: []
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			getData() {
				db.collection("afree-product").get().then(res=>{
					console.log(res);
					this.newsArr=res.result.data
				})
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
			margin-top: 80px;
			font-size: 20px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			color: #858585;

			.titlesub {
				font-size: 50px;
				color: #292828;
			}
		}

		.gamescontainer {
			margin-top: 20px;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;

			.container {
				box-shadow:
					3px 0 2px -2px rgba(0, 0, 0, 0.2),
					/* 右侧阴影 */
					-3px 0 2px -2px rgba(0, 0, 0, 0.2),
					/* 左侧阴影 */
					0 3px 2px -2px rgba(0, 0, 0, 0.2),
					/* 下方阴影 */
					0 -3px 2px -2px rgba(0, 0, 0, 0.2);
				/* 上方阴影 */
				border-radius: 10px;
				padding-top: 70px;
				padding-left: 70px;
				padding-right: 70px;
				padding-bottom: 70px;
				background-color: #fff;
				width: 1000px;

				display: flex;
				justify-content: space-between;
				align-items: center;
				flex-wrap: wrap;

				.subbox:nth-last-child(-n+3) {
					// background-color: #b845ff;
					margin-bottom: 0px;
				}
			}
		}

		.businesscontainer {
			margin-top: 20px;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;


		}

		.aboutus {
			margin-top: 20px;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.endbox {
			margin-top: 100px;
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