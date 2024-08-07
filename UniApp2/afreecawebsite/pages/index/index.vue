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
		<view class="relativebox">
			<view class="introtext">
				<h3 style="color: beige;">About Afeika Game Studio</h3>

				<p>Founded with a passion for immersive storytelling and innovative gameplay, Afeika Game Studio is
					dedicated to creating unforgettable gaming experiences. Our team is a diverse collective of
					visionary
					developers, artists, and storytellers who are united by a shared love for gaming. At Afeika, we
					believe
					in pushing the boundaries of creativity and technology to craft games that not only entertain but
					also
					inspire and resonate with players around the world.</p>
				</br>

				<h3 style="color: beige;">Our Vision</h3>

				<p>At Afeika, we envision a world where games transcend traditional boundaries, merging art and
					technology
					to create deeply engaging experiences. We aim to produce games that captivate the imagination,
					challenge
					the intellect, and evoke emotions, offering players not just entertainment, but a journey they will
					cherish.</p>
				</br>
				<h3 style="color: beige;">Our Mission</h3>

				<p>Our mission is to develop games that leave a lasting impact. By blending innovative gameplay
					mechanics
					with compelling narratives, we strive to create worlds where players can lose themselves, exploring
					new
					dimensions of fun, strategy, and storytelling. We are committed to quality, creativity, and the
					relentless pursuit of excellence in every project we undertake.</p>
				</br>
				<h3 style="color: beige;">Our Games</h3>

				<p>From epic adventures to thought-provoking puzzles, Afeika Game Studio’s portfolio reflects our
					commitment
					to diversity in gaming. Whether you are a casual player or a hardcore enthusiast, our games are
					designed
					to offer something unique for everyone. Each title is crafted with care, ensuring a rich, immersive
					experience that stays with you long after the game is over.</p>
				</br>
				<h3 style="color: beige;">Join Us on Our Journey</h3>

				<p>As we continue to grow and evolve, we invite players, collaborators, and partners to join us on our
					journey. At Afeika, we are not just creating games—we are building a community of dreamers,
					creators,
					and gamers who share our passion for the extraordinary. Together, we can shape the future of gaming.
				</p>
			</view>

			<view class="absolutebox">
				1
			</view>
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

		.relativebox {
			position: relative;
			padding: 50px;
			background-color: #292828;
			height: auto;
			color: #858585;
			width: 1000px;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			align-items: center;
			z-index: 10;
			margin: 50px;
			border-radius: 5px;
			line-height: 1.8;
			text-indent: 2em;

			.introtext {}

			.absolutebox {
				border-radius: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				color: #fff;
				font-weight: bold;
				width: 60px;
				height: 60px;
				background-color: red;
				top: -35px;
				right: -35px;
				z-index: 12;
				font-size: 30px;
				border: 4px solid #fff;
				text-align: center;
				/* 确保文本水平居中 */
				line-height: 60px;
				/* 确保文本垂直居中 */
			}
		}
	}
</style>