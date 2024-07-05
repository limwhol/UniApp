export function getImgSrc(richtext, num = 3) {
	let imgList = []
	richtext.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, (match, capture) => {
		imgList.push(capture)
	})
	imgList = imgList.slice(0, num)
	return imgList
}
export function getProvince() {
	return new Promise((resolve, reject) => {
		let historyProvince = uni.getStorageSync("historyProvince")
		if (historyProvince) {
			resolve(historyProvince.province)
		} else {
			uni.request({
				url: "https://restapi.amap.com/v3/ip?key=4a43fb1fc001e386a52215b6feea63f4&ip=100.100.100.100",
				success: res => {
					console.log("开始网络请求")
					let str = ""
					if (typeof(res.data.province) == "string") {
						str = res.data.province
					} else {
						str = "未知中华人民共和国境外地区"
					}
					resolve(str)
					let obj = {
						province: str,
						time: Date.now()
					}
					uni.setStorageSync("historyProvince", obj)
				},
				fail: err => {
					reject(err)
				}
			})
		}
	})
}