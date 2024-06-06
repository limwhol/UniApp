const db = uniCloud.database()
exports.main = async (event, context) => {
	let res = await db.collection("users").doc("666018c6a7c432936bff9358").update({
		name:"Kelly Pig"
	})
	return {
		msg: "Updated Complete!"
		res
	}
};