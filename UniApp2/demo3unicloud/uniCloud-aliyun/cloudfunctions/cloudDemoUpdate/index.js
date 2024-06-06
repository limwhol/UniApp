const db = uniCloud.database()
const dbCmd=db.command
exports.main = async (event, context) => {
	let res = await db.collection("users").where({
		age:dbCmd.in([42,46])
	}).update({
		name:"看看看"
	})
	return {
		msg: "Update Completed!",
		res
	}
};