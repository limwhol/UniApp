<template>
	<view class="home">
		<custom-head-bar id="customHeadBar" />
		<view class="wrapper">
			<view class="infoModel">
				<view class="left">
					免费配送
				</view>
				<navigator url="/pages/order/order" class="right">
					<u-icon name="photo" color=$brand-theme-color-aux size="22"></u-icon>我的订单
				</navigator>
			</view>
			<view class="scrollLayout">
				<view class="leftScroll">
					<scroll-view scroll-y class="sContent" :scroll-top="leftScrollValue" scroll-with-animation="true">
						<view class="navitem" :class="index==navIdx?'active':''" v-for="(item,index) in dataList"
							@click="clickNav(index)" :key="item.id">
							{{item.name}}
						</view>
					</scroll-view>
				</view>
				<view class="rightScroll">
					<navigator class="searchView" url="/pages/search/search">
						<u-icon name="search" size="22" color="#576b95"></u-icon>
						搜索
					</navigator>
					<scroll-view scroll-y="true" class="sContent" :scroll-top="rightScrollValue"
						scroll-with-animation="true" @scroll="rightScrollEnt">
						<view class="productView" v-for="item in dataList" :key="item.id">
							<u-sticky :customNavHeight="0" zIndex="2">
								<view class="proTitle">{{item.name}}</view>
							</u-sticky>
							<view class="proContent">
								<view class="proitem" v-for="pro in item.children">
									<product-item :pro="pro" />
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<car-layout v-if="buyNum>0" />
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from "vuex"
	export default {
		data() {
			return {
				navIdx: 0,
				leftScrollValue: 0,
				rightScrollValue: 0,
				rightHeightArr: [],
				leftHeightArr: [],
				dataList:[{
					id: 1,
					name: "豆干制品",
					children: [{
						id: 11,
						name: "卫龙辣条",
						price: 10,
						before_price: 22,
						thumb: "https://mp-c422c6b7-799d-4ff5-9531-5051a0481131.cdn.bspapp.com/cloudstorage/83562e26-cfac-4cec-8f51-9ae6986942af.jpg",
						numvalue: 0
					}, {
						id: 12,
						name: "卫龙大面筋",
						price: 5,
						before_price: 12,
						thumb: "https://mp-c422c6b7-799d-4ff5-9531-5051a0481131.cdn.bspapp.com/cloudstorage/30569d48-bb94-40de-8d2b-a3be99d710cd.jpg",
						numvalue: 0
					}]
				}, {
					id: 2,
					name: "饼干糕点",
					children: [{
						id: 21,
						name: "丹麦曲奇",
						price: 25,
						before_price: 36,
						thumb: "https://mp-3309c116-4743-47d6-9979-462d2edf878c.cdn.bspapp.com/cloudstorage/6758e11c-949b-48c5-ae69-ddad030c2f94.png",
						numvalue: 0
					}]
				}, {
					id: 3,
					name: "酒水饮料",
					children: [{
						id: 31,
						name: "韩国烧酒",
						price: 18,
						before_price: 29,
						thumb: "https://mp-3309c116-4743-47d6-9979-462d2edf878c.cdn.bspapp.com/cloudstorage/b1a12bee-0602-4cb5-927d-b2b246700e89.jpeg",
						numvalue: 0
					}]
				}]
			}
		},
		onLoad() {
			//在dom渲染完毕后再执行this.getHeightArr()
			this.$nextTick(() => {
				this.getHeightArr()
			})
		},
		computed: {
			...mapGetters(["buyNum"])
		},
		methods: {
			...mapMutations(["setFoldState"]),
			//点击左侧项目时，相应项目高亮
			clickNav(e) {
				if (this.navIdx == e) {
					return
				}
				this.navIdx = e
				//console.log(e);
				//防抖切换
				if (this.timeout) {
					clearTimeout(this.timeout)
				}
				this.timeout = setTimeout(() => {
					this.leftScrollValue = this.leftHeightArr[e]
					this.rightScrollValue = this.rightHeightArr[e]
				}, 200)
			},
			rightScrollEnt(e) {
				let scrollTop = Math.ceil(e.detail.scrollTop)
				let idx = this.rightHeightArr.findIndex((value, index, arr) => scrollTop >= value && scrollTop < arr[
					index + 1])
				this.navIdx = idx
				this.leftScrollValue = this.leftHeightArr[idx]
				if (scrollTop > 400) {
					this.setFoldState(true)
				} else {
					this.setFoldState(false)
				}
			},
			getHeightArr() {
				let selectorQuery = uni.createSelectorQuery()
				let customHeadBar
				//左侧节点获取组
				selectorQuery.select("#customHeadBar").boundingClientRect(rect => {
					//这里的150是第一个容器距离屏幕顶部的高度减去头部导航以及第二个头部元素高度的结果
					//console.log(rect);
					customHeadBar = rect.height
				}).exec()

				selectorQuery.selectAll(".navitem").boundingClientRect(rects => {
					//这里的150是第一个容器距离屏幕顶部的高度减去头部导航以及第二个头部元素高度的结果
					this.leftHeightArr = rects.map(item => item.top - customHeadBar - 40)
				}).exec()
				//右侧节点组获取
				selectorQuery.selectAll(".productView").boundingClientRect(rects => {
					//这里的150是第一个容器距离屏幕顶部的高度减去头部导航以及第二个头部元素高度的结果
					this.rightHeightArr = rects.map(item => item.top - customHeadBar - 40)
				}).exec()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home {
		height: 100vh;
		display: flex;
		flex-direction: column;

		.wrapper {
			border-radius: 10px 10px 0 0;
			background-color: #fff;
			flex: 1;
			margin-top: -10px;
			z-index: 2;
			overflow: hidden;

			.infoModel {
				@include flex-box-set(between, center);
				height: 50px;
				padding: 0 30rpx;
				background-color: #fff;
				font-size: 26rpx;
				border-bottom: 1px solid $border-color-light;

				.right {
					@include flex-box-set();
					color: $brand-theme-color-aux;
				}
			}

			.scrollLayout {
				height: calc(100% - 100rpx);
				@include flex-box();

				.leftScroll {
					height: 100%;
					width: 190rpx;
					background-color: $page-bg-color;
					border-right: 1px solid $border-color-light;

					.navitem {
						font-size: 30rpx;
						padding-left: 30rpx;
						line-height: 100rpx;
						color: $text-font-color-2;
						position: relative;

						&.active {
							color: $text-font-color-1;
							background-color: #fff;

							&::after {
								content: "";
								width: 10rpx;
								height: 40rpx;
								background-color: $brand-theme-color;
								position: absolute;
								left: 6rpx;
								top: 50%;
								transform: translateY(-50%);
							}
						}
					}
				}

				.rightScroll {
					height: 100%;
					flex: 1;
					position: relative;

					.searchView {
						position: absolute;
						right: 30rpx;
						top: -5rpx;
						z-index: 3;
						@include flex-box-set(center, center);
						height: 90rpx;
						color: $brand-theme-color-aux;
					}

					.productView {
						padding: 0 30rpx;

						.proTitle {
							line-height: 90rpx;
							font-size: 30rpx;
							padding-left: 20rpx;
							border-bottom: 12rpx solid #fcf6e8;
							background-color: #fff;
						}
					}
				}

				.sContent {
					height: 100%;
				}
			}
		}
	}
</style>