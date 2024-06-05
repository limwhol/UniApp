'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	let res = await db.collection('users').get()
	// await db.collection('users').add(
	// {
	// 	name:"Liqiufeng",
	// 	gender:"Male",
	// 	age:46,
	// 	tel:"18601943690"
	// }
	// )
	return res
};