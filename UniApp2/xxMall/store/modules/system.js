const systemInfo = uni.getSystemInfoSync()
const getStatusBarHeight = () => systemInfo.statusBarHeight || 20
const getTitleBarHeight = () => {
	// #ifdef MP-WEIXIN
	let menuBtnInfo = uni.getMenuButtonBoundingClientRect();
	let height = menuBtnInfo.height + (menuBtnInfo.top - getStatusBarHeight()) * 2;
	return height;
	// #endif
	return 40;
}
const system = {
	state: {
		statusBarHeight: getStatusBarHeight(),
		titleBarHeight: getTitleBarHeight(),
		foldState: false
	},
	mutations: {
		setFoldState(state, value) {
			state.foldState = value
		}
	}
}

export default system