// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js')
// 实例化API核心类
    var qqmapsdk = new QQMapWX({
      key: 'GOEBZ-HICCO-QWTWO-SUU42-G25DE-H4FOD'
    })
Page({
  data: {
    latitude:"",
    longitude:"", //地图显示
    markers:[],
		list:[],
		region:[],    //当前的位置
    customItem:'' //可为每一列的顶部添加一个自定义的项
  },
  onShow:function(){
 		var that = this
//1.获取当前位置
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
//         that.setData({
//           latitude: res.latitude,
//           longitude: res.longitude
//         })

//2.逆地址解析(经纬度解析成地址)			
				qqmapsdk.reverseGeocoder({
					location: {
						latitude: res.latitude,
						longitude: res.longitude
					},
					success: function(res) {
						var place = res.result.address_component
						var region = []
						region.push(place.province)
						region.push(place.city)
						region.push(place.district)
						that.setData({region:region})
//3.地址解析（地址解析成经纬度）						
						qqmapsdk.geocoder({
							address:that.data.region[0]+that.data.region[1]+that.data.region[2],
							success:function(res){
								var latitude = res.result.location.lat
								var longitude = res.result.location.lng
								that.setData({
									latitude:latitude,
									longitude:longitude
								})
								qqmapsdk.search({
									keyword: '电影院',															  //搜索关键词
									success: function (res) { 									
									console.log(res)
										var mks = []
										for (var i = 0; i < res.data.length; i++) {
											mks.push({ 																	// 获取返回结果，放到mks数组中
												title: res.data[i].title,
												id: res.data[i].id,
 												 latitude: res.data[i].location.lat,
												 longitude: res.data[i].location.lng,
												iconPath: "https://languanzhao.github.io/img-for-wxproject/position.png", //图标路径
												width:50,
												height: 60
											})
										}
										that.setData({markers:mks})
										
										that.setData({list:res.data})	
									}
								})
							}
						})
					}
				})
      }
    })
		
		//移除 tabBar 某一项右上角的文本
		wx.removeTabBarBadge({
			index: 1             //第二页 （从左算起）
		})
		
  },
  onShareAppMessage: function (res){                 //转发接口
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '影之讯',                             //转发的标题
      path: '/pages/cimema/cimema',
      // imageUrl:'https://languanzhao.github.io/img-for-wxproject/pic.png'                          //转发显示的图片
    }
  },
	//切换地址事件
	bindRegionChange: function (e) {
		var that = this
		var address = e.detail.value
    
		this.setData({
      region:e.detail.value
    })
	//地址解析（切换地址时地图切换到相对应位置）	
		qqmapsdk.geocoder({
				address:address[0]+address[1]+address[2],
				success:function(res){
					var latitude = res.result.location.lat
					var longitude = res.result.location.lng
					that.setData({
						latitude:latitude,
						longitude:longitude
					})
				}
		})	
		
		
//切换地址时影院信息切换
		qqmapsdk.search({
			keyword: '电影院', 														//搜索关键词
			location: {
						latitude: that.data.latitude,
						longitude: that.data.longitude
								}, 																	//设置周边搜索中心点
			success: function (res) { 
				var mks = []
				for (var i = 0; i < res.data.length; i++) {
					mks.push({ 																// 获取返回结果，放到mks数组中
						title: res.data[i].title,
						id: res.data[i].id,
						latitude: res.data[i].location.lat,
						longitude: res.data[i].location.lng,
						iconPath: "https://languanzhao.github.io/img-for-wxproject/position.png", //图标路径
						width:50,
						height:60
					})
				}
				that.setData({markers:mks})
				
				that.setData({list:res.data})	
			}
		})	
  }
})