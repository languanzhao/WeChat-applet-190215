Page({

	data: {
		list: [],
		bool: false
	},
	onShow: function() {
		try {
			var v = wx.getStorageSync('photoInfo')
			this.setData({
				list: v
			})
		} catch (e) {}

		if (v.length > 0) {
			this.setData({bool: true})
		}
	},
	upload: function() {
		var that = this
		var arr = []
		//为了防止每次添加就只有一个数据，需先获取本地存储有的就添加到arr中
		try {
			var v = wx.getStorageSync('photoInfo') //判断本地离线存储是否有数据
			if (v) {
				arr = v
			}
		} catch (e) {
			arr = []
		}
		//选择图片上传
		wx.chooseImage({
			count: 3,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success(res) {
				console.log(res)
				var photoList = res.tempFilePaths
				photoList.forEach(function(item, i) {
					arr.push(item)
					console.log(item)
				})

				wx.setStorage({
					key: "photoInfo",
					data: arr
				})
			}
		})
	},
	//点击放大预览图片
	previewImage: function(e) {

		var list = this.data.list
		var current = e.target.dataset.src

		wx.previewImage({
			current: current, // 当前显示图片的http链接
			urls: list // 需要预览的图片http链接列表
		})

	},
	//长按功能(用于删除图片)
	deleteImage:function(e){
		try{
			var v = wx.getStorageSync('photoInfo')
		}catch(e){	
		}
		var index = e.currentTarget.dataset.index  //获取当前长按图片下标
		wx.showModal({
			title:"温馨提示",
			content:"确认要删除此图片吗",
			success:(res)=>{
				if(res.confirm){                   //点击确认执行事件
					v.splice(index,1)
				}else if(res.cancel){              //点击取消执行事件
					return false
				}
				wx.setStorage({
					key: "photoInfo",
					data: v
				})
				this.setData({list:v})
				if(v.length === 0){
					this.setData({bool:false})
				}
			}
			
		})
		
	}
})
