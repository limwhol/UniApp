let db=uniCloud.database()
let bdCmd=db.command
exports.main = async (event, context) => {
 let res=await db.collection("users").doc("666045f2b9fb2360b0143046").update({
	 "like.0":"jumping"
 })
 return res
};