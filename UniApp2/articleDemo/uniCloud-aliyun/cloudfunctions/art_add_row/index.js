const db = uniCloud.database()
exports.main = async (event, context) => {
	let {
		detail
	} = event;
	return await db.collection("article").add({
		posttime: Date.now(),
		// title:detail.title,
		// author:detail.author,
		// content:detail.content
		...detail
	})
};