//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    back:"返回",
    text:"日志",
    icon:"图标",
		phoneNum:"123"
  },
  onLoad: function () {
		//移除 tabBar 某一项右上角的文本
				wx.removeTabBarBadge({
					index: 1             //第二页 （从左算起）
				})
  },
  onPullDownRefresh(){                                 //监听用户下拉刷新事件。
    wx.startPullDownRefresh()                          //触发下拉刷新
    wx.showNavigationBarLoading()                      //顶部出现加载动画
    wx.stopPullDownRefresh()                           //停止当前页面的下拉刷新
    console.log("日志页面正在刷新")
  },
  showActionSheet(){
   wx.showActionSheet({
     itemList: ['A', 'B', 'C'],
		 itemColor:"blue",
     success(res) {
       console.log(res.tapIndex)
     },
     fail(res) {
       console.log(res.errMsg)
     }
   })
  },
	phoneNumTap:function(){
    var that=this;
    // 提示呼叫号码还是将号码添加到手机通讯录
    wx.showActionSheet({
      itemList: ['呼叫','添加联系人'],
      success:function(res){        
        if(res.tapIndex===0){
          // 呼叫号码
          wx.makePhoneCall({
            phoneNumber: that.data.phoneNum,
          })
        }else if(res.tapIndex==1){
          // 添加到手机通讯录
          wx.addPhoneContact({
            firstName: 'test',//联系人姓名
            mobilePhoneNumber: that.data.phoneNum,//联系人手机号
          })
        }
      }
    })
  },
  playAudio:function(res){
    console.log(res)
  }
})
