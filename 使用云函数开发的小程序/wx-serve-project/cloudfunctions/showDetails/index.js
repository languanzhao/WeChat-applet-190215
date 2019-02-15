// // 云函数入口文件
// const cloud = require('wx-server-sdk')
// 
// cloud.init({
// 	env: "test-3a6ab0"
// })
// const db = cloud.database()
// // 云函数入口函数
// exports.main = async (event, context) => {
// 	// return event
// 	return db.collection('movie-details').where({
// 		movieName:event.movieName
// 	}).get()
// }

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
	env: "test-3a6ab0"
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
	// return event
	return db.collection('movie-details').where({
		movieName: db.RegExp({
			regexp: event.movieName,
			options: 'i',
		})
	}).get()
}
