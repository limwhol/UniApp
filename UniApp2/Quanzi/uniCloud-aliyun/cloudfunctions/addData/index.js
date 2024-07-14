'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	let {name,tel}=event;
	let res=await db.collection('users').add({
		name,
		tel
	})
	return res;
};
