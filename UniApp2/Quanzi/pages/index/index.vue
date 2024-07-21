<template>
	<view class="home">
		<view class="topnav">
			<u-tabs :list="navList" :activeStyle="{
				color:'#333',
				fontWeight:'bold',
				transform:'scale(1.06)'
			}" @click="clickNav"></u-tabs>
		</view>
		<view class="loadingState" v-if="isloadingState">
			<u-skeleton rows="5" title loading avatar></u-skeleton>
		</view>
		<view class="content">
			<view class="item" v-for="item in dataArr" :key="item._id">
				<blog-item @delEvent="P_delEvent" :item="item" />
			</view>
		</view>
		<view class="">
			<uni-load-more :status="uniloading"></uni-load-more>
		</view>
		<view class="edit">
			<text class="iconfont icon-a-21-xiugai" @click="goEdit"></text>
		</view>
	</view>
</template>

<script>
	import {
		store,
		mutations
	} from '@/uni_modules/uni-id-pages/common/store.js'
	const db = uniCloud.database()
	const dbCmd = db.command
	export default {
		data() {
			return {
				uniloading: "more",
				navList: [{
						name: "最新",
						type: "publish_date"
					},
					{
						name: "热门",
						type: "view_count"
					}
				],
				isloadingState: true,
				dataArr: [],
				navIndex: 0,
				totalItems:0
			}
		},
		onLoad() {
			//开启页面后就直接读取getData函数，此函数的作用是从数据库读取符合条件的文章相关数据，用于渲染页面
			this.getData()
		},
		onReachBottom() {
			//每次触底的时候再次刷新页面
			this.getData()
		},
		methods: {
			//这是一个子页面像父页面调用的函数，作用是先清空用于渲染页面的数组，然后读取getData函数，请求数据并再次渲染页面，本质作用是刷新页面
			P_delEvent() {
				this.dataArr = []
				this.getData()
			},
			clickNav(e) {
				//先将骨架屏激活
				this.isloadingState = true
				//清空用于渲染页面的数组，免得和之前的数据互相污染
				this.dataArr = []
				//将触底相关的布尔值重置为false，便于进入新页面后重新激活相关触底栏信息的正确显示，触底栏信息包括了，”读取中“，”没有更多信息等“。
				this.noMore = false
				console.log(e)
				//navIndex接受e.index传来的值，并确定navIndex对应的string值，并将这个string传给oderBy命令，用以确定数据以什么字段为基准进行展示
				this.navIndex = e.index
				this.getData()
			},
			goEdit() {
				//跳转到编辑页面
				uni.navigateTo({
					url: "/pages/edit/edit"
				})
			},
			async getData() {
				let artTemp = db.collection("quanzi_article").where(`delstate!=true`).field(
						"title,user_id,description,picurls,comment_count,like_count,view_count,publish_date,province")
					.getTemp()
				let userTemp = db.collection("uni-id-users").field("_id,username,nickname,avatar_file").getTemp()
				let res;
				try {
				  res = await db.collection(artTemp, userTemp).orderBy(this.navList[this.navIndex].type, "desc").get()
				  //totalItems用来记录符合查询要求的文章数组的总长度，让其与当前文章数组进行比较，相等则意味着当前查询结果已经到底了，从而决定底部栏的状态
				  this.totalItems = res.result.data.length;
				} catch (error) {
				  console.error("Database query failed:", error);
				}
				//将上面2个临时表连表查询，规则如下面代码所示，较为容易理解，其中orderBy的第一个字符串由首页顶部导航按钮决定，按钮选项里TYPE的值决定了按照什么字段查询
				db.collection(artTemp, userTemp).orderBy(this.navList[this.navIndex].type, "desc").skip(this.dataArr
					.length).limit(5).get().then(
					async res => {
						//新建一个空数组
						let idArr = []
						//查询结果的DATA数组长度是否为真，为真的话，底部栏状态为加载中，为假的话，底部栏状态为没有更多数据了
						if (res.result.data.length > 0) {
						  this.uniloading = this.totalItems == res.result.data.length ? "noMore" : "loading";
						} else {
						  this.uniloading = "noMore";
						}
						// res.result.data.length ? this.uniloading = "loading" : this.uniloading = "noMore"
						// console.log(res)
						//新建一个数组，将老的文章数据数组和刚刚查询出来的最新的文章数据数组进行拼接，组成最新的文章数据数组
						let resDataArr = [...this.dataArr, ...res.result.data]
						
						if (store.hasLogin) {
							resDataArr.forEach(item => {
								//查询用户登录状态，如果用户已经登录的话，将所有未删除的文章_id填充为一个数组
								idArr.push(item._id)
							})
							//在点赞表里把所有文章ID存在于IDARR数组里的，当前用户登录状态正确的点赞记录筛选出来
							//实际上likeRes表已经是用户点过的所有文章的记录了，除了那些被删除的文章
							let likeRes = await db.collection("quanzi_like").where({
								article_id: dbCmd.in(idArr),
								user_id: uniCloud.getCurrentUserInfo().uid
							}).get()
							// console.log(likeRes)
							//遍历筛选出来的点赞记录，每次遍历，一旦点赞记录里的文章ID和整体文章表ID一致，就返回一致时文章记录的数组index号。
							//通过下面的遍历，通过likeRes和resDataArr的比较，将当前用户点过赞的文章都加入新字段isLike并赋值为true
							likeRes.result.data.forEach(item => {
								let findIndex = resDataArr.findIndex(find => {
									return item.article_id == find._id
								})
								resDataArr[findIndex].isLike = true
								// console.log("resDataArr[findIndex].isLike "+resDataArr[findIndex].isLike)
							})
						}
						//将当前isLike赋过值的数据再次赋值给老数组，方便继续进行拼接，同时也将isLike数据封装到item里并传递给blog-item
						//方便在首页上blog-item组件有正确的点赞显示
						this.dataArr = resDataArr
						//关闭骨架屏
						this.isloadingState = false
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home {
		.topnav {
			margin-bottom: 30rpx;
		}

		.loadingState {
			padding: 30rpx;
		}

		.content {
			padding: 30rpx;
		}

		.edit {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			background-color: #0199FE;
			color: #ffffff;
			display: flex;
			z-index: 100;
			justify-content: center;
			align-items: center;
			position: fixed;
			right: 10rpx;
			bottom: 100rpx;
			box-shadow: 0 0 20rpx rgba(0, 153, 254, 0.1);

			.iconfont {
				font-size: 45rpx;
			}
		}
	}
</style>