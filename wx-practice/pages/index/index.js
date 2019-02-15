
const app = getApp()

var common = require('.././common.js')                 //tip: require 暂时不支持绝对路径即/pages/common.js

Page({
  data: {
    prolist:[],
     val:"",
     list:[],
     arr:["下标一","下标二","下标三"],
     header:{                         //模板使用     注：classify和logs页面用其他显示方法
       back:"返回",
       text:"首页",
       icon:"图标"
     },
     msg:"组件里的插槽",
     text:"公有组件改为公有组件",
     avatarUrl:"",
		 nickName:"",
                                      //banner轮播参数  
     dots:true,
     dots_color:"#000",
     active_color:"#fff",
     autoplay:true,
     delaytime:1000,
     circular:true,
     show_num:3
  },
  getVal:function(e){                 //获取input里的值  
   var val = e.detail.value
   this.setData({val:val})
  },
  clickMe:function(){                 //点击添加到数组
    var arr = this.data.list
    arr.push(this.data.val)
      this.setData({list:arr,val:""})
  },
  indexClick(e){                      //点击显示下标
    console.log(e)
    console.log(e.target.dataset.index)
  },
  remove(e){                           //点击删除
    var i = e.target.dataset.index
    var arr = this.data.list
    arr.splice(i,1)
    this.setData({list:arr})
  },
  toReturn(){                   //路由
    wx.navigateTo({
      url: '/pages/details/details',            //跳转到非 tabBar 的页面的路径，tabBar 跳转使用  wx.switchTab
      success: function(res){                   //接口调用成功的回调函数
        console.log(res)
      },
      fail: function(res) {                     //接口调用失败的回调函数
        console.log(res)
      },
      complete: function(res) {                 //接口调用结束的回调函数（调用成功、失败都会执行）
        console.log(res)
      }
    })
  },
  mapClick(){                    //地图
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function(res){
        const latitude = res.latitude
        const longitude = res.longitude
        wx.openLocation({
          latitude,
          longitude,
          scale:28
        })
      },
      fail:function(){
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onShow(){                                           //1.生命周期回调函数 onShow()
                                                      
    var getData = getApp()                            //2.获取全局   -> app.js
    console.log(getData.globalData.myName)
    
    console.log(common.sayHello())                    //3.模块化,可以将一些公共的代码抽离成为一个单独的 js 文件，作为一个模块。

    wx.setStorage({                                   //4.发送信息到本地存储
      key:"proInfo",
      data:{
        proName:"本地存储",
        age:"18",
        sex:"男"
      }
    })
    wx.getStorage({                                   //5.获取本地存储信息
      key:"proInfo",
      success: function(res) {
        console.log(res.data)
      }
    })
    var that = this                                   //6.获取用户信息
    wx.getSetting({
      success:function(res){
        if(res.authSetting["scope.userInfo"]){
          wx.getUserInfo({
            success: function(res){
              console.log(JSON.parse(res.rawData))    //将json字符串转换成json对象。
							
							var info = res.userInfo
              that.setData({
                "avatarUrl":info.avatarUrl,
								"nickName":info.nickName
              })
            }
          })
        }
      }
    })
		//隐藏 tabBar 某一项的右上角的红点
		wx.hideTabBarRedDot({
			index:0
		})
		
		
  },
  onPullDownRefresh(){                                //监听用户下拉刷新事件。
    wx.startPullDownRefresh()                         //触发下拉刷新
    wx.showNavigationBarLoading()                     //顶部出现加载动画
    wx.stopPullDownRefresh()                          //停止当前页面的下拉刷新
    console.log("首页正在刷新")
  },
  onShareAppMessage: function (res) {                 //转发接口
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '莲花瓷白香器',                            //转发的标题
      path: '',
      imageUrl:'/img/pic.jpg'                          //转发显示的图片
    }
  }
})
