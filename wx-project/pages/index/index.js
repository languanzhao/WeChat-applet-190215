//index.js
//获取应用实例
const app = getApp()
var QQMapWX = require('../.././libs/qqmap-wx-jssdk.min.js')
var demo = new QQMapWX({
	key: 'GOEBZ-HICCO-QWTWO-SUU42-G25DE-H4FOD' // 必填
})
var regeneratorRuntime = require('../.././libs/runtime.js')  //使用 Promise 需要引入
Page({
	data: {
		active:0,
		tabList: ["即将上映", "正在热映"],
		imglist:[],
// 		imglist: [{
// 				"pic_url": "https://languanzhao.github.io/img-for-wxproject/banner01.jpg"
// 			},
// 			{
// 				"pic_url": "https://languanzhao.github.io/img-for-wxproject/banner02.jpg"
// 			},
// 			{
// 				"pic_url": "https://languanzhao.github.io/img-for-wxproject/banner03.jpg"
// 			}
// 		],
		list: [],
		filmList: [],
		bool: true,
		bool2: true,
		loadingText: "正在加载...",
		number: 3,
		count: 3,
		num:5,
		city: "",
		locationId: "",
		AttentionMovies:[],
		AttentionMoviesLength:"",
		listComings:[],
		moviecomings:[],
		moviecomingsLength:""
	},
	toClick(e) {
		var i = e.currentTarget.dataset.index //注意： e.currentTarget.dataset.index
		this.setData({
			active: i
		})
		wx.setNavigationBarTitle({
		  title:'影讯-'+this.data.tabList[i]
		})
	},
	getLocation: function() {
		return new Promise(function(resolve, reject) {
			wx.getLocation({
				type: "wgs84",
				success: function(res) {
					resolve(res)             //第一层 把res传下去
				},
				fail: function(res) {
					reject(res)
				}
			})
		})
	},
	reverseGeocoder: function(res) {  //接收 res
		var that = this
		return new Promise(function(resolve, reject) {
			demo.reverseGeocoder({
				location: {
					latitude: res.latitude,
					longitude: res.longitude
				},
				success: function(res) {
					var city = res.result.address_component.city 
					that.setData({
						city: city
					})
					resolve(city)             //第二层 把 city 传下去
				},
				fail: function(res) {
					reject(res)
				}
			})
		})
	},
	apiAddress: function(city) {          //接收 city
		var that = this
		return new Promise(function(resolve, reject) {
			wx.request({
				url: 'https://api-m.mtime.cn/Showtime/HotCitiesByCinema.api',
				success: function(res) {

					var address_city = res.data.p
					var address = city.substring(0, that.data.city.length - 1)

					address_city.forEach(function(item, i) {
						if (item.n === address) {
							that.setData({
								locationId: item.id
							})
						}
					})
					var locationId = that.data.locationId 
					resolve(locationId)        //第三层 把 locationId 传下去 
					
					//将locationId传到本地数据存储，在search页面提取
					wx.setStorageSync("locationId",that.data.locationId)
					
				},
				fail: function(res) {
					reject(res)
				}
			})

		})
	},
	getLocationId: function(locationId) {  //接收 locationId
		var that = this
		return new Promise(function(resolve, reject) {
			wx.request({//正在上映接口
				url: "https://api-m.mtime.cn/Showtime/LocationMovies.api",
				data: {
					locationId:locationId
				},
				success: function(res) {
					var list = res.data.ms
					var arr = []
					
					//传到 search 页面 给 hotList
					var hotList = []

					list.forEach(function(item, i) {
						arr.push(item)
						hotList.push(item.t)
						that.setData({
							list: arr
						})
					})
					
					//传到 search 页面 给 hotList,裁剪15个过去
					var hotListName = hotList.slice(0,15)
					wx.setStorageSync("hotList",hotListName)
					
					
					//为了为下面做的 onReachBottom 加载更多 ，所以先显示3个当上拉时显示更多
					var newList = that.data.list.slice(0,3)
					console.log(newList)
					that.setData({
						filmList: newList,
						imglist: newList
					})
					resolve("已成功获取" + locationId + "进入数据接口")
				},
				fail: function(res) {
					reject(res)
				}
			})
			
			console.log(that.data.locationId)
			wx.request({//即将上映接口
				url:"https://api-m.mtime.cn/Movie/MovieComingNew.api?locationId="+that.data.locationId,
				success:function(res){
					var AttentionMoviesLength = res.data.attention.length
					var moviecomingsLength = res.data.moviecomings.length
					that.setData({AttentionMoviesLength:AttentionMoviesLength})
					that.setData({moviecomingsLength:moviecomingsLength})
					
					that.setData({AttentionMovies:res.data.attention})
					
					var moviecomings = res.data.moviecomings
					that.setData({listComings:moviecomings})
					
					var fiveList = moviecomings.slice(0,5)
					that.setData({moviecomings:fiveList})
				}
			})
		})
	},
	asyncFn: async function() {
			try {
				var res = await this.getLocation()                    //latitude:23.12908 longitude:113.26436
				// console.log(res)
				var city = await this.reverseGeocoder(res)            //广州市
				// console.log(city)
				var apiAddress = await this.apiAddress(city)          //365
				// console.log(apiAddress)
				var locationId = await this.getLocationId(apiAddress) //已成功获取 365 进入数据接口
				// console.log(locationId)
			} catch (err) {
				console.log(err)
			}
		},
		onLoad: function() {
			this.asyncFn()
			//设置动态标题
			wx.setNavigationBarTitle({
				title:'影讯-'+this.data.tabList[this.data.active]
				})

			//隐藏 tabBar 某一项的右上角的红点
			wx.hideTabBarRedDot({
				index:0             //首页（从左算起）
			})
			
			
			
			// 		var that = this
			// 		wx.getLocation({
			// 			type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
			// 			success: function(res) {        //第一层传 res
			// 				demo.reverseGeocoder({
			// 					location: {
			// 						latitude: res.latitude,       
			// 						longitude: res.longitude
			// 					},
			// 					success: function(res) {
			// 						var city = res.result.address_component.city    //第二层传city
			// 						that.setData({city: city})
			// 						
			// 						wx.request({
			// 							url: 'https://api-m.mtime.cn/Showtime/HotCitiesByCinema.api',
			// 							success: function(res) {
			// 
			// 								var address_city = res.data.p
			// 								var address = city.substring(0, that.data.city.length - 1)
			// 								
			// 								address_city.forEach(function(item, i) {
			// 									if (item.n === address) {
			// 										that.setData({
			// 											locationId: item.id
			// 										})
			// 									}
			// 								})
			// 								var locationId = that.data.locationId       //第三层传 locationId
			// 
			// 								wx.request({
			// 									url: "https://api-m.mtime.cn/Showtime/LocationMovies.api",
			// 									data: {
			// 										locationId: locationId
			// 									},
			// 									success: function(res) {
			// 										var list = res.data.ms
			// 										var arr = []
			// 
			// 										list.forEach(function(item, i) {
			// 											arr.push(item)
			// 											that.setData({
			// 												list: arr
			// 											})
			// 										})
			// 
			// 										//为了为下面做的 onReachBottom 加载更多 ，所以先显示3个当上拉时显示更多
			// 										var newList = that.data.list.slice(0, 3)
			// 										that.setData({
			// 											filmList: newList
			// 										})
			// 									}
			// 								})
			// 							}
			// 						})
			// 					}
			// 				})
			// 			}
			// 		})
		},
		//页面事件处理函数 onReachBottom() 监听用户上拉触底事件
		//使用前在全局或使用页面添加 滑动距离 "onReachBottomDistance":50
		onReachBottom: function() { 
			var that = this 
			//因为在同一页面，所以判断是在哪个选项页，否则只要上拉就执行叠加操作
			if(this.data.active === 0){
				this.setData({num:that.data.num += that.data.count})       //即将上映
			}else if(this.data.active === 1){
				this.setData({number:that.data.number += that.data.count})//正在上映
			}
			console.log(that.data.number)
			console.log(that.data.num)
			setTimeout(function() {
				that.setData({bool:true,bool2:true})
					//当上拉动作发生时，获取对应数据
					var flimIngs = that.data.list.slice(0, that.data.number) 
					var flimComings = that.data.listComings.slice(0, that.data.num)
					that.setData({
						filmList: flimIngs
					})
					that.setData({
						moviecomings:flimComings
					})
					if (that.data.filmList.length === that.data.list.length) {
						that.setData({bool:false})
						}
					if (that.data.moviecomings.length === that.data.listComings.length) {
						that.setData({bool2:false})
						}
				},2000)
		},
		onPullDownRefresh() { //监听用户下拉刷新事件。
			wx.startPullDownRefresh() //触发下拉刷新
			wx.showNavigationBarLoading() //顶部出现加载动画
			wx.stopPullDownRefresh() //停止当前页面的下拉刷新
			console.log("首页正在刷新")
		},
		onShareAppMessage: function(res) { //转发接口
			if (res.from === 'button') {
				// 来自页面内转发按钮
				console.log(res.target)
			}
			return {
				title: '影讯一百', //转发的标题
				path: '/pages/index/index' //转发的页面
				//,
				//imageUrl: 'https://languanzhao.github.io/img-for-wxproject/pic.png' //转发显示的图片
			}
		},
		//回到顶部
		scrollTop:function(){
			wx.pageScrollTo({
						scrollTop: 0,
						duration: 2000
					})
		}
})



