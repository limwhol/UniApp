const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	let {keyword}=event
	let res = await db.collection("users").where({
		// age: dbCmd.or(dbCmd.gt(43),dbCmd.lt(41))
		// name:/keyword/ig,//^是开始$是结束i是不区分大小写g是全局
		name:new RegExp(keyword,"ig")
	}).get()
	return res
};