Page({
	data:{
		list:[],
		videoSrc:[],
		cameraBool:false,
		videoBool:false
	},
	onShow:function(){
		this.ctx = wx.createCameraContext()
		try {
			
				var v = wx.getStorageSync('cameraImage')
				var v1 = wx.getStorageSync('videoSrc')
				this.setData({list:v,videoSrc:v1})
				if(v === ""){
					this.setData({cameraBool:false})
				}else{
					this.setData({cameraBool:true})
				}
					
				if(v1 === ""){
					this.setData({videoBool:false})
				}else{
					this.setData({videoBool:true})
				}
		
		} catch (e) {}
	},
  takePhoto:function(){
		
		var arr = []
		//为了防止每次添加就只有一个数据，需先获取本地存储有的就添加到arr中
		try {
			var v = wx.getStorageSync('cameraImage') //判断本地离线存储是否有数据
			if (v) {
				arr = v
			}
		} catch (e) {
			arr = []
		}
		
    this.ctx.takePhoto({
      quality: 'high',
      success: (res) => {
				var src = res.tempImagePath		
				arr.push(src)
				 wx.setStorageSync('cameraImage', arr)
// 				wx.setStorage({
// 					key:"cameraImage",
// 					data:arr
// 				})
			
      }
    })
  },
  startRecord() {
    this.ctx.startRecord({
      success: (res) => {
        wx.showToast({
					title:"开始录像",
					icon:"none",
				})
      }
    })
  },
  stopRecord() {
		
		var arr = []
		//为了防止每次添加就只有一个数据，需先获取本地存储有的就添加到arr中
		try {
			var v = wx.getStorageSync('videoSrc') //判断本地离线存储是否有数据
			if (v) {
				arr = v
			}
		} catch (e) {
			arr = []
		}
		
    this.ctx.stopRecord({
      success: (res) => {
				var src = res.tempVideoPath
        arr.push(src)
        wx.setStorageSync('videoSrc', arr)
				wx.showToast({
					title:"录像完成"
				})
      }
    })
  },
	previewImage:function(e){
		var index = e.detail.currentTarget
		var list = this.data.list
		wx.previewImage({
			current:list[index],
			urls:list
		})
	}
})