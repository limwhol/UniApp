<template>
	<view class="totalbox">
		<view class="" @click="toAdmin">
			toAdmin
		</view>
		<view class="out">
			<top />
		</view>
		<view class="title" id="latestproduct">
			<view>AFREECA GAMES` LATEST</view>
			<view class="titlesub">最新发布的游戏</view>
		</view>
		<view class="gamescontainer">
			<view class="container">
				<view class="" v-for="item in newsArr" :key="item._id">
					<product-item :item="item"></product-item>
				</view>
			</view>
		</view>
		<view class="title" id="businesscooperations">
			<view>BUSINESS COOPERATIONS</view>
			<view class="titlesub">商务合作洽谈</view>
		</view>
		<view class="gamescontainer">
			<view class="subcontainer">
				<business-item></business-item>
			</view>
		</view>
		<view class="title" id="aboutus">
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
				newsArr: [],
				currentYear: null
			}
		},
		onLoad(e) {
			this.getData()
		},
		methods: {
			toAdmin() {
				uni.navigateTo({
					url: "/pages/admin/admin"
				})
			},
			async getData() {
				let res
				try {
					res = await db.collection("afree-product").field(
						"game_description,game_imgUrl,game_title,game_type,publish_date").orderBy(
						"publish_date desc").get()
					this.newsArr = res.result.data
					// console.log(res);
				} catch (error) {
					console.log("Database query failed:", error);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.totalbox {
		background-color: rgb(241, 241, 241);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

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
				border-radius: 5px;
				padding: 70px;
				background-color: #fff;
				width: 1000px;

				display: flex;
				justify-content: space-around;
				align-items: flex-start;
				flex-wrap: wrap;
				gap: 50px;
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