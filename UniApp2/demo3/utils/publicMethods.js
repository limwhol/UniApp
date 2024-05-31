export default publicMethods;

function timestampToDate(timestamp) {
	timestamp = parseInt(timestamp);
	if (timestamp.toString().length === 10) {
		timestamp *= 1000;
	}
	let date = new Date(timestamp);
	let year = date.getFullYear();
	let month = date.getMonth() + 1; // 月份从0开始，需要加1
	let day = date.getDate();
	// 格式化月份和日期为两位数
	month = month < 10 ? '0' + month : month;
	day = day < 10 ? '0' + day : day;
	return `${year}-${month}-${day}`;
}