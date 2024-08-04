<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "@/static/fonts/iconfont.css";
	page {
		padding-top: 0;
		/* 确保页面顶部没有内边距 */
	}

	/* 隐藏导航栏 */
	uni-page-head {
		display: none !important;
	}
</style>