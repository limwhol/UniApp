const db=uniCloud.database();
const dbCmd=db.command
exports.main=async(event,context)=>{
	// let res=await db.collection("users").doc("6662c98d816a3f647e0d3812").remove();
	let res=await db.collection("users").remove();
	return res
};
