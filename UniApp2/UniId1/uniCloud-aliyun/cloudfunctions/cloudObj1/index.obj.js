const db = uniCloud.database()
module.exports = {
	_before: function() { // 通用预处理器

	},
	async get(num) {
		return await db.collection("users").limit(num).get()
	},
	async add(){
		return await db.collection("users").add({
			name:"李秋风",
			tel:888888888
		})
	}
}