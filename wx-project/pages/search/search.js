Page({
  data: {
		value:"",
		list:[],
		historyList:[],
		hotList:[
						 "毒液：致命守护者",
						 "龙猫",
						 "海王",
						 "亡命救赎",
						 "狗十三",
						 "二十岁",
						 "克隆人",
						 "惊涛飓浪",
						 "闽宁镇"
						 ],
		locationId:""
  },
	input:function(event){        //注意事项 2) event.detail.value => event.detail
		// console.log(event)
		this.setData({value:event.detail})
	},
	search:function(){
		
		var that = this
		if(this.data.value != ""){      //判断是否输入值
				
				wx.request({
					url:"https://api-m.mtime.cn/PageSubArea/HotPlayMovies.api",
					data:{
						locationId:that.data.locationId
					},
					success:function(res){
						var list = res.data.movies
						var arr = []
							for(var i = 0;i < list.length;i++){         //模糊搜索
							if(list[i].titleCn.match(that.data.value) != null){
								arr.push(list[i])
							}
						}
						wx.showToast({
							title:"查询中...",
							icon:"loading"
						})
						setTimeout(function(){
							that.setData({list:arr})
						},1500)
						console.log(arr)
						if(arr.length === 0){
							wx.showToast({
								title:"无该影片",
								icon:"loading"
							})
						}
					}
					
				})	

		setTimeout(function(){                     //点击搜索后两秒再添加到历史记录
			var hList = that.data.historyList
			hList.push(that.data.value)
			that.setData({historyList:hList,value:""})
		},2000)
	 }
	},
	copyWord:function(e){
		var index = e.currentTarget.dataset.index
//单纯的复制		
// wx.setClipboardData({data:this.data.hotList[index]})
//方法一：只能设置到指定的地方
// 		var word = this.data.hotList[index]
// 		this.setData({value:word})
//方法二：可复制到剪贴板，粘贴到任何可以粘贴的位置
		wx.setClipboardData({
			data:this.data.hotList[index],//指定的data
			success:(res)=>{
				wx.getClipboardData({
				success:(res)=>{
						this.setData({value:res.data})
					}
			})
			}
		})
	},
	onLoad:function(){
		//提取从index传过来的locationId
		try{
			var v = wx.getStorageSync("locationId")
			var hotList = wx.getStorageSync("hotList")
			if(v != ""){
				this.setData({
					locationId:v,
					hotList:hotList
					})
				console.log(v)
			}else{
				//this.setData({locationId:365})
			}
		}catch(e){}
	}
})



// const app = getApp()
// var QQMapWX = require('../.././libs/qqmap-wx-jssdk.min.js')
// var demo = new QQMapWX({
// 	key: 'GOEBZ-HICCO-QWTWO-SUU42-G25DE-H4FOD' // 必填
// })
// var regeneratorRuntime = require('../.././libs/runtime.js')  //使用 Promise 需要引入
// 
// Page({
//   data: {
// 		value:"",
// 		list:[],
// 		historyList:[],
// 		city:"",
// 		locationId:""
//   },
// 	input:function(event){        //注意事项 2) event.detail.value => event.detail
// 		// console.log(event)
// 		this.setData({value:event.detail})
// 	},
// 	getLocation: function() {
// 		return new Promise(function(resolve, reject) {
// 			wx.getLocation({
// 				type: "wgs84",
// 				success: function(res) {
// 					resolve(res)             //第一层 把res传下去
// 				},
// 				fail: function(res) {
// 					reject(res)
// 				}
// 			})
// 		})
// 	},
// 	reverseGeocoder: function(res) {  //接收 res
// 		var that = this
// 		return new Promise(function(resolve, reject) {
// 			demo.reverseGeocoder({
// 				location: {
// 					latitude: res.latitude,
// 					longitude: res.longitude
// 				},
// 				success: function(res) {
// 					var city = res.result.address_component.city 
// 					that.setData({
// 						city: city
// 					})
// 					resolve(city)             //第二层 把 city 传下去
// 				},
// 				fail: function(res) {
// 					reject(res)
// 				}
// 			})
// 		})
// 	},
// 	apiAddress: function(city) {          //接收 city
// 			var that = this
// 			return new Promise(function(resolve, reject) {
// 				wx.request({
// 					url: 'https://api-m.mtime.cn/Showtime/HotCitiesByCinema.api',
// 					success: function(res) {
// 	
// 						var address_city = res.data.p
// 						var address = city.substring(0, that.data.city.length - 1)
// 	
// 						address_city.forEach(function(item,i) {
// 							if (item.n === address) {
// 								that.setData({
// 									locationId: item.id
// 								})
// 							}
// 						})
// 						var locationId = that.data.locationId 
// 						resolve(locationId)        //第三层 把 locationId 传下去 
// 	
// 					},
// 					fail: function(res) {
// 						reject(res)
// 					}
// 				})
// 	
// 			})
// 		},
// 		getLocationId:function(locationId){
// 			var that = this
// 			return new Promise(function(resolve,reject){
// 					wx.request({
// 						url:"https://api-m.mtime.cn/PageSubArea/HotPlayMovies.api",
// 						data:{
// 							locationId:locationId
// 						},
// 						success:function(res){
// 							var list = res.data.movies
// 							var arr = []
// 								for(var i = 0;i < list.length;i++){         //模糊搜索
// 								if(list[i].titleCn.match(that.data.value) != null){
// 									arr.push(list[i])
// 								}
// 							}
// 							that.setData({list:arr})
// 							console.log(arr)
// 							if(arr.length === 0){
// 								wx.showToast({
// 									title:"无该影片",
// 									icon:"loading"
// 								})
// 							}
// 						}
// 						
// 					})	
// 			})
// 		},
// 		asyncFn:async function(){
// 			try {
// 				var res = await this.getLocation()                    //latitude:23.12908 longitude:113.26436
// 				// console.log(res)
// 				var city = await this.reverseGeocoder(res)            //广州市
// 				// console.log(city)
// 				var apiAddress = await this.apiAddress(city)          //365
// 				// console.log(apiAddress)
// 				var locationId = await this.getLocationId(apiAddress) //已成功获取 365 进入数据接口
// 				// console.log(locationId)
// 			} catch (err) {
// 				console.log(err)
// 			}
// 		},
// 	search:function(){
// 		
// 		var that = this
// 		if(this.data.value != ""){      //判断是否输入值
// 				
// 				this.asyncFn()
// 
// 		setTimeout(function(){                     //点击搜索后两秒再添加到历史记录
// 			var hList = that.data.historyList
// 			hList.push(that.data.value)
// 			that.setData({historyList:hList,value:""})
// 		},2000)
// 	 }
// 	}
// })

