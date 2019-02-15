Page({
	data: {
			list:[],
	// list:[{
  //     "src": "https://languanzhao.github.io/img-for-wxproject/bgImg01.png",
  //     "theme": "适配红"
  //   },
  //   {
  //     "src": "https://languanzhao.github.io/img-for-wxproject/bgImg07.jpg",
  //     "theme": "深海蓝"
  //   },
  //   {
  //     "src": "https://languanzhao.github.io/img-for-wxproject/bgImg09.jpg",
  //     "theme": "蒲公英"
  //   },
  //   {
  //     "src": "https://languanzhao.github.io/img-for-wxproject/banner01.jpg",
  //     "theme": "电影海报01"
  //   },
  //   {
  //     "src": "https://languanzhao.github.io/img-for-wxproject/banner02.jpg",
  //     "theme": "电影海报02"
  //   },
  //   {
  //     "src": "https://languanzhao.github.io/img-for-wxproject/bgImg03.jpg",
  //     "theme": "深山公路"
  //   },
  //   {
  //     "src": "https://languanzhao.github.io/img-for-wxproject/bgImg05.jpg",
  //     "theme": "sunshine"
  //   }
  // ]
	},
	//如果要选择数组的某一个数据，需要其下标，可以通过data-index=“{{index}}”来设置下标
	//点击时间中自带event参数
	chooseImg: function(event) {
		var index = event.currentTarget.dataset.index
		var list = this.data.list
		var src = list[index].src
		wx.setStorage({
			key: "bgImg",
			data: src
		})
		wx.switchTab({
			url: "/pages/user/user"
		})
	},
	onLoad:function(){
		//easy-mock.com后台接口 1736626696		注：需添加服务器域名
		wx.request({
			url:"https://easy-mock.com/mock/5c3ae8ce1de3741096451235/example/wxbgImg",
			success:(res)=>{
				var list = res.data.list
				//判断是否为空，空则显示默认的那个
				var src = wx.getStorageSync("bgImg")
				if(src != ""){
							//写法一
							list.forEach(function(item,i){
								if(item.src === src){
									item.theme = item.theme + '（已选择）'
								}
							})
							//写法二
					// 		for(var i = 0;i < list.length;i++){
					// 			if(list[i].src === src){
					// 				list[i].theme = list[i].theme + '（已选择）'
					// 			}
					// 		}
					
				}else{
						list[0].theme = list[0].theme + '（已默认）'
				}
				
				this.setData({list:list})         //修改后重新返回list数据
			}
		})	
	}
})
