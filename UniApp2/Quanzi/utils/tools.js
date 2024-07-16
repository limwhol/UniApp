//在富文本中获取3个图片地址
export function getImgSrc(richtext, num = 3) {
	let imgList = []
	richtext.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, (match, capture) => {
		imgList.push(capture)
	})
	imgList = imgList.slice(0, num)
	return imgList
}

//向外导出省份信息
export function getProvince() {
	return new Promise((resolve, reject) => {
		let historyProvince = uni.getStorageSync("historyProvince")
		if (historyProvince) {
			if (Date.now() - historyProvince.time > 1000 * 60 * 60) {
				getNewIP().then(res => {
					resolve(res)
				}).catch(err => {
					reject(err)
				})
			} else {
				resolve(historyProvince.province)
			}
		} else {
			getNewIP().then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		}
	})
}

//获取省份信息，有缓存信息且读取间隔小于一小时的直接读取缓存信息，读取间隔超过一小时或者缓存无省份信息记录的，重新通过网络读取省份信息
function getNewIP() {
	return new Promise((resolve, reject) => {
		uni.request({
			url: "https://restapi.amap.com/v3/ip?key=2db084495cd8a9ac9fe87aecf301fd62",
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
	})
}
export function getUserAvatar(item) {
	return item.user_id[0]?.avatar_file?.url ?? '../../static/images/user-default.jpg'
}
export function getUserName(item) {
	return item.user_id[0].nickname || item.user_id[0].username || item.user_id[0].mobile
}

const db = uniCloud.database()
const utilsObj = uniCloud.importObject("utilsObj", {
	customUI: true
})

export async function  likeFun(artid){				
	let count= await db.collection("quanzi_like").where(`article_id=="${artid}" && user_id==$cloudEnv_uid`).count()				
	if(count.result.total){
		db.collection("quanzi_like").where(`article_id=="${artid}" && user_id==$cloudEnv_uid`)
		.remove();
		utilsObj.operation("quanzi_article","like_count",artid,-1)
		
	}else{
		db.collection("quanzi_like").add({
			article_id:artid
		})
		utilsObj.operation("quanzi_article","like_count",artid,1)					
	}
}