Page({
  data: {
    addressInfo: null,
		bool:false
  },
  chooseAddress() {
    wx.chooseAddress({
      success: (res) => {
				try {
							wx.setStorageSync('chooseAddress',res)
				} catch (e) { }
      },
      fail: function(err) {
        console.log(err)
      }
    })
  },
	onShow:function(){
		var v = wx.getStorageSync("chooseAddress")
		if(v != ""){
			this.setData({
				bool:true,
				addressInfo:v,
				})
		}else{
			this.setData({bool:false})
		}
	}
})