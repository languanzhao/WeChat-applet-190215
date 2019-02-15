// pages/publicAccount/publicAccount.js
Page({
  data: {
		name:"生活百全",
		list:[
			"https://languanzhao.github.io/link-to-img/wxgzh.jpg"
		]
  },
	copyWord:function(e){
		wx.setClipboardData({
			data:this.data.name,
			success:(res)=>{
				wx.showToast({
					title:"复制成功!",
					icon:"success"
				})
			}
		})
	},
	previewImage:function(){
		
		wx.previewImage({
			current:this.data.list[0],
		  urls:this.data.list
		})
		
	}
})