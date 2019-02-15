const app = getApp()
var QQMapWX = require('../.././libs/qqmap-wx-jssdk.min.js')
var demo = new QQMapWX({
	key: 'GOEBZ-HICCO-QWTWO-SUU42-G25DE-H4FOD' // 必填
})
var regeneratorRuntime = require('../.././libs/runtime.js')  //使用 Promise 需要引入


Page({
	data: {
		btnText: "展开↓",
		bool: true,
		movieDetails: "",
		collectColor: "#c2b9bb",
		commentList:[],
		total:"",
		city:"",
		locationId:"",
		query:"",
		boxOffice:""
	},
	toggle: function() {
		if (this.data.btnText === "展开↓") {
			this.setData({
				btnText: "关闭↑",
				bool: false
			})
		} else {
			this.setData({
				btnText: "展开↓",
				bool: true
			})
		}
	},
	
	getLocation: function() {
		return new Promise(function(resolve,reject) {
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
	
					},
					fail: function(res) {
						reject(res)
					}
				})
	
			})
		},
		getLocationId:function(locationId){
			var that = this
			return new Promise(function(resolve,reject){
				wx.request({
							url: "https://ticket-api-m.mtime.cn/movie/detail.api",
							data: {
								locationId:locationId,
								movieId:that.data.query.id
							},
							success: function(res) {
							 console.log(res.data.data.boxOffice)
								that.setData({
									movieDetails: res.data.data.basic,
									boxOffice: res.data.data.boxOffice
								})
								//写法一  （注：wx.getStorage 和 wx.getStorageSync 一个不是同步一个是同步，注意写法不同而已）
								var v = wx.getStorageSync('filmInfo') //保持收藏状态,因为需要一进入页面就获取数据状态
				
								for (var i = 0; i < v.length; i++) {
									if (v[i].name === res.data.data.basic.name) {
										that.setData({
											collectColor: "red"
										})
									}
								}
								//写法二
								// 					wx.getStorage({
								// 						key:"filmInfo",
								// 						success:function(res){
								// 							var v = res.data
								// 							
								// 							v.forEach(function(item,i){
								// 								if(item.name === that.data.movieDetails.name){
								// 									that.setData({collectColor:"red"})
								// 								}
								// 							})
								// 						}
								// 					})	
								
								//console.log(that.data.movieDetails.name)  动态设置当前页面的标题
								wx.setNavigationBarTitle({
									title:"影片详情-"+that.data.movieDetails.name
								})
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
	onLoad: function(query) {
		//因为getLocationId方法中的query没定义，所以先将query放在data中，那么就可以movieId:that.data.query.id
		this.setData({query:query})
		this.asyncFn()
		var that = this
		//onLoad自带参数query，从首页点击跳转到详情页 
		console.log(query)
		//详情接口
		
		//影评接口
		wx.request({
			url:'https://ticket-api-m.mtime.cn/movie/hotComment.api',
			data:{
				movieId:query.id
			},
			success:function(res){
				// console.log(res.data)
				that.setData({total:res.data.data.mini.total})//总影评数
				var commentList = res.data.data.mini.list     //1.先提取数据 (数据从上往下读取)
				
				commentList.forEach(function(item,i){         //2.数据中的rating需要处理
					var rating = parseInt(item.rating/2)
				    item.rating = rating
				})	
				that.setData({commentList:commentList})       //3.最终处理完的数据再赋予data中的commentList
			}
		})
	},
	collectClick: function() {
		var that = this
		var arr = []

		var collectObj = {
			movieId: "",
			img: "",
			name: ""
		}
		//为了防止每次添加就只有一个数据，需先获取本地存储有的就添加到arr中
		try {
			var v = wx.getStorageSync('filmInfo') //判断本地离线存储是否有数据
			if (v) {
				arr = v
			}
		} catch (e) {
			arr = []
		}

		if (this.data.collectColor === "#c2b9bb") {
			this.setData({
				collectColor: "red"
			})
			wx.showToast({
				title: "收藏成功",
				icon: 'success',
				duration: 2000
			})
			//将三个数据先存入一个对象，然后把这个对象存入一个数组里
			collectObj.name = that.data.movieDetails.name
			collectObj.img = that.data.movieDetails.img
			collectObj.movieId = that.data.movieDetails.movieId

			arr.push(collectObj)
			wx.setStorage({
				key: "filmInfo",
				data: arr
			})
		} else {
			this.setData({
				collectColor: "#c2b9bb"
			})
			wx.showToast({
				title: "取消收藏",
				icon: 'none',
				duration: 2000
			})

			arr.forEach(function(item, i) { //取消收藏状态
				if (item.name === that.data.movieDetails.name) {
					arr.splice(i, 1)
					wx.setStorage({
						key: 'filmInfo',
						data: arr
					})
				}
			})
		}
	},
	onShareAppMessage: function(res) { //转发接口
		if (res.from === 'button') {
			// 来自页面内转发按钮
			console.log(res.target)
		}
		return {
			title: '影讯一百', //转发的标题
			path: '/pages/prodetails/prodetails'  //转发的页面
			//,
			//imageUrl: 'https://languanzhao.github.io/img-for-wxproject/pic.png' //转发显示的图片
		}
	},
	//可以解决图片  加载错误  的方法之一 ，其二在收藏页
	imageError:function(event){
  var index = event.currentTarget.dataset.index
 
  var img = 'movieDetails.actors['+index+'].img'
    this.setData({
      [img]: 'https://languanzhao.github.io/img-for-wxproject/none.jpg'
    })   
	},
	previewImage:function(){
		var arr = []
		arr.push(this.data.movieDetails.img)
		
		wx.previewImage({
			current:arr[0],
			urls:arr
		})
		
	},
	//注：urls 需要的是数组形式
	previewImageActors:function(event){
		var index = event.currentTarget.dataset.index
		var arr = this.data.movieDetails.actors
		
		var imgList = []
		var img = arr[index].img
		imgList.push(img)
		
		wx.previewImage({
			current:img,
			urls:imgList
		})
	},
	previewImageDirector:function(){
		var img = this.data.movieDetails.director.img
		var arr = []
		arr.push(img)
		wx.previewImage({
			current:img,
			urls:arr
		})
	},
	//点赞
	addPraiseCount:function (e) { 
		//需要根据下标来判断点击是哪一个
		var index = e.currentTarget.dataset.index
		var list = this.data.commentList
	    var praiseCount = list[index].praiseCount + 1
		list[index].praiseCount = praiseCount
		this.setData({commentList:list})
	 },
	 changePraiseColor:function (e) { 
		var index = e.currentTarget.dataset.index
		console.log(index)
	  }
})
//图片加载错误 https://blog.liuguofeng.com/p/3898

