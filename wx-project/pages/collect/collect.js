// pages/collect/collect.js
Page({
  data:{
			list:[],
			bool:false
  },
  onShow: function () {
		wx.getStorage({
			key:"filmInfo",
			success:(res)=>{
				var list = res.data
				
				list.forEach(function(item,i){     //可以解决图片的  src为空  的方法之一 ，其二在详情页
					if(item.img === ""){
						item.img = 'https://languanzhao.github.io/img-for-wxproject/none.jpg'
					}
				})
				
				wx.setNavigationBarTitle({
					title:'我的收藏'+ '(' + list.length + ')'
				})
				
				this.setData({list:list})
				
				if(list.length > 0){
					this.setData({bool:true})
				}else{
					this.setData({bool:false})
				}
			}
		})
  }
})