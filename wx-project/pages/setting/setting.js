Page({
	data: {
		info: "",
		showLeft1: false,
		showTop:false,
		networkType:"",
		battery:"",
		name:"",
		phoneNum:""
	},
	onLoad: function(options) {
		var that = this
		wx.getSystemInfo({
			success(res) {
				that.setData({
					info: res
				})

				console.log(res.batteryLevel) //电池电量
				console.log(res.brand) 		  //品牌
				console.log(res.model)        //型号
				console.log(res.language)     //语言
				console.log(res.version)      //版本
				console.log(res.system)       //系统
			}
		})
		//获取手机网络类型
		wx.getNetworkType({
			success:(res)=>{
				this.setData({networkType:res.networkType})
			}
		})
		//获取手机电量及是否正在充电中
		wx.getBatteryInfo({
			success:(res)=>{
				this.setData({battery:res})
			}
		})
	},
	phoneInfo: function() {
		this.setData({
			showLeft1: !this.data.showLeft1
		})
	},
	clearStorage: function() {
		wx.showModal({
			title: '确认要清除',
			content: '清除缓存会删除收藏影片和相册照片及个人资料等设置',
			success(res) {
				if (res.confirm) {
					wx.clearStorage()
					wx.showToast({
						title: '清除成功',
						icon: 'success',
						duration:1000
					})
				} else if (res.cancel) {
						return false
				}
			}
		})
	},
	addPhoneContact:function(){
		this.setData({
			showTop: !this.data.showTop
		})
	},
	//输入姓名
	inputName:function(e){
		console.log(e.detail.value)
		this.setData({name:e.detail.value})
	},
	//输入手机号
	inputPhoneNum:function(e){
		console.log(e.detail.value)
		this.setData({phoneNum:e.detail.value})
	},
	toaddPhoneContact:function(){
// 		this.setData({
// 			showTop:false
// 		})
		var that=this;
		//检测input是否为空
		if(this.data.phoneNum != "" && this.data.name != ""){
		// 提示呼叫号码还是将号码添加到手机通讯录
			wx.showActionSheet({
				itemList: ['呼叫','添加联系人','取消'],
				success:function(res){        
					if(res.tapIndex === 0){
						// 呼叫号码
						wx.makePhoneCall({
							phoneNumber: that.data.phoneNum,
						})
					}else if(res.tapIndex === 1){
						// 添加到手机通讯录
						wx.addPhoneContact({
							firstName:that.data.name,						  //联系人姓名
							mobilePhoneNumber: that.data.phoneNum,//联系人手机号
						})
					}else if(res.tapIndex === 2){
						that.setData({showTop:false})
					}
					
					
				},
				fail:function(res){
					
					that.setData({showTop:false})
					
				}
			})
		}else if(this.data.phoneNum === "" && this.data.name === ""){
				wx.showToast({
					title:"请输入姓名和手机号",
					icon:"none",
				})
		}else if(this.data.name === ""){
			  wx.showToast({
			  	title:"请输入姓名",
			  	icon:"none",
			  })
		}else if(this.data.phoneNum === ""){
			wx.showToast({
				title:"请输入手机号",
				icon:"none",
			})
		}
		
	},
	//注意：1
	//wx.showActionSheet有个bug就是无法像在开发者工具那样显示，
	//在安卓下，是在中间弹窗出来，而且没有取消这个选项，需要自己在数组里添加上去
	
	//注意：2
	//     可以设置点击确定（ toaddPhoneContact） 就 取消 蒙层（输入手机号的蒙层），
	//     也可当弹出 showActionSheet 时选择取消或点击蒙层时 取消 （输入手机号的蒙层），
	//Android 6.7.2 以下版本，点击取消或蒙层时，回调 fail, errMsg 为 "fail cancel"；
	//Android 6.7.2 及以上版本 和 iOS 点击蒙层不会关闭模态弹窗，所以尽量避免使用「取消」分支中实现业务逻辑
  
  //扫一扫
  scanCode:function(){
    wx.scanCode({
      success(res) {
        //res.result是个链接，可用wx.request请求，但需要的是 https
        console.log(res)
      }
    })
  },
  //振动
  vibrateLong:function(){
    wx.vibrateLong({
      success: function (res) {
        console.log(res)
      }
    })
    setTimeout(function () {
      wx.vibrateLong({
        success: function (res) {
          console.log(res)
        }
      })
    },2000)
    setTimeout(function () {
      wx.vibrateLong({
        success: function (res) {
          console.log(res)
        }
      })
    },4000)
  }
})
