
 Page({
	data:{
		show:false
	},
	onShow:function(){
		// var that = this           写法二
		// wx.getUserInfo({
		// 	success:function(res){
		// 		console.log(res)
		// 		that.setData({
		// 			avatarUrl:res.userInfo.avatarUrl,
		// 			nickName:res.userInfo.nickName
		// 		})
		// 	},
		// 	fail:function(res){
		// 		console.log(res)
		// 	}
		// })
	},
	onShareAppMessage: function (res) {                 //转发接口
		if (res.from === 'button') {
		  // 来自页面内转发按钮
		  console.log(res.target)
		}
		return {
		  title: '蓝观钊测试版',                            //转发的标题
		  path: '',
		  imageUrl:'https://languanzhao.github.io/img-for-wxproject/pic.png'                          //转发显示的图片
		}
	  },
	showCollect(){
		wx.navigateTo({
			url: '/pages/collect/collect',
			success: function(res){
				// success
			},
			fail: function() {
				// fail
			},
			complete: function() {
				// complete
			}
		})
	},
	showService(){
		wx.showModal({
			content:"1.（浏览影片信息）  使用微信小程序自带数据库，影片数据信息来源于数据库。 2.（点击收藏功能）   使用本地离线存储，将数据存储到本地离线存储，在我的收藏页面获取本地离线存储数据并显示出来。  3.(点击搜索影片功能)  使用查询数据库信息并将搜索相符合的信息显示出来，点击后可观看详情页。 5.（获取当前位置功能）。 6.（获取用户头像和昵称）",
			showCancel:false
		})
	},
	showAbout(){
		wx.showModal({
			content:"开发者：蓝观钊",
			showCancel:false,
			duration:6000
		})
	},
	showHot(){
		wx.showModal({
			content:"版本号：1.0.0",
			showCancel:false,
			duration:6000
		})
	},
	showWarn(){
		wx.showModal({
			content:"功能尚未开发完善！",
			showCancel:false,
			duration:6000
		})
	},
	showSetting(){
		wx.showModal({
			content:"此版本为测试版,暂无设置功能",
			showCancel:false,
			duration:6000
		})
	}
})