const db=uniCloud.database()
exports.main = async (event, context) => {
	let {skip}=event;
return await db.collection("article").limit(8).skip(skip).orderBy("posttime","desc").get()
	
};
