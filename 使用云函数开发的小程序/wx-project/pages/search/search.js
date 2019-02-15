// pages/search/search.js
Page({
  data: {
		value:"",
		list:[],
		historyList:[]
  },
	input:function(event){        //注意事项 2) event.detail.value => event.detail
console.log(event)
		this.setData({value:event.detail})
	},
	search:function(){
		if(this.data.value != ""){      //判断是否输入值
		var that = this
		wx.cloud.init({               //初始化
			env: "test-3a6ab0"
		})
				wx.cloud.callFunction({             
					name: "showDetails",
					data: {
						movieName: that.data.value
					}
				}).then(function(res) {            	 //回调
					that.setData({list:res.result.data})
	console.log(res)
					if(res.result.data.length === 0){  //没有此影片
						wx.showToast({
							title: '没有此影片',
							icon: 'loading',
							duration:2000
						})
					}
				})
		
				setTimeout(function(){                     //点击搜索后两秒再添加到历史记录
					var hList = that.data.historyList
					hList.push(that.data.value)
					that.setData({historyList:hList,value:""})
				},2000)
					
				
	}
	}
})