// pages/collect/collect.js
Page({
  data:{
			list:[],
			bool:false
  },
  onLoad: function () {
		wx.getStorage({
			key:"filmInfo",
			success:(res)=>{
				console.log(res)
				this.setData({list:res.data})
				if(res.data.length > 0){
					this.setData({bool:true})
				}
			}
		})
  }
})