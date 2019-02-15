
Page({
	data: {
		btnText: "↓",
		bool: true,
		movieDetails:"",
		collectColor:"#c2b9bb"
	},
	toggle: function() {
		if (this.data.btnText === "↓") {
			this.setData({
				btnText: "↑",
				bool: false
			})
		} else {
			this.setData({
				btnText: "↓",
				bool: true
			})
		}
	},
	onLoad: function(query) {
		var that = this
		wx.cloud.init({
			env: "test-3a6ab0"
		})
		// console.log(query.movieName)
		wx.cloud.callFunction({
			name: "showDetails",
			data: {
				movieName: query.movieName
			}
		}).then(function(res) {
			that.setData({movieDetails:res.result.data[0]})
			
		})
	},
	collectClick:function(){
		var that = this
		var arr = []
		
		try{
			var v = wx.getStorageSync('filmInfo')  //判断本地离线存储是否有数据
			if(v){
				arr = v
			}
		}catch(e){
			arr = []
		}
		
		if(this.data.collectColor === "#c2b9bb"){
			this.setData({collectColor:"red"})
			wx.showToast({
				title:"收藏成功",
				icon: 'success',
				duration:2000
			})
			
			arr.push(that.data.movieDetails.movieName)
			wx.setStorage({
				key:"filmInfo",
				data:arr
			})
		}else{
			this.setData({collectColor:"#c2b9bb"})
			wx.showToast({
				title:"取消收藏",
				icon: 'none',
				duration:2000
			})
		}	
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
	  }
})
