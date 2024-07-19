const db = uniCloud.database()
const dbCmd = db.command
module.exports = {
	_before: function() { // 通用预处理器

	},
	//代入表名、希望修改的字段、记录的ID、希望调整的数值，下面的云对象函数就可以进行表更新操作
	async operation(table, attr, id, num) {
		let obj={}
		obj[attr]=dbCmd.inc(num)
		return await db.collection(table).doc(id).update(obj)
	}
}