Page({
	data: {
		BackgroundImg:"",
		year:"",
		month:"",
		day:"",
		zIndex:null
	},
	onShareAppMessage: function(res) { //转发接口
		if (res.from === 'button') {
			// 来自页面内转发按钮
			console.log(res.target)
		}
		return {
			title: '影讯一百', //转发的标题
			path: 'pages/user/user' //转发的页面
			//imageUrl:'https://languanzhao.github.io/img-for-wxproject/pic.png'  //转发显示的图片
		}
	},
	changeImg: function(){
		wx.navigateTo({
			url: "/pages/bgImg/bgImg"
		})
	},
	onShow: function() {
		try {
			var v = wx.getStorageSync('bgImg')
			if(v != ""){
				this.setData({BackgroundImg:v})
			}else{
				this.setData({BackgroundImg:"https://languanzhao.github.io/img-for-wxproject/bgImg01.png"})
			}
		} catch (e) {}
		
		try{
			var date = wx.getStorageSync("date")
			if(date != ""){
						this.setData({
							year:date[0],
							month:date[1],
							day:date[2]
						})
			}else{
				var now = new Date()
				var year = now.getFullYear()
				var month = now.getMonth()+1
				var day = now.getDate()
				this.setData({
					year:year,
					month:month,
					day:day
					})
			}
		}catch(e){}
// 		

	},
	onLoad: function() {
    
	},
	//微信小程序滚动监听 
	//在页面Page()函数里，有个onPageScroll方法，可以输出滚动距离
	//这里使用z-index可以令其隐藏，也可使用 display:none;
	onPageScroll:function(e){
		console.log(e)
		var num = e.scrollTop
		if(num > 158){
			this.setData({zIndex:-1})
		}else{
			this.setData({zIndex:0})
		}
	}
})
