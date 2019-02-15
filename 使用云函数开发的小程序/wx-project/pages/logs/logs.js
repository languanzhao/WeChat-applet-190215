// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk
// 实例化API核心类

Page({
  data: {
    latitude:"",
    longitude:"",
    markers:[]
  },

  // 事件触发，调用接口
  onLoad:function(){
    var that = this

    var qqmapsdk = new QQMapWX({
      key: 'GOEBZ-HICCO-QWTWO-SUU42-G25DE-H4FOD'
    })

    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    })

    // 调用接口
    qqmapsdk.search({
      keyword: '电影院', //搜索关键词
      success: function (res) { //搜索成功后的回调
        var mks = []
        for (var i = 0; i < res.data.length; i++) {
          mks.push({ // 获取返回结果，放到mks数组中
            title: res.data[i].title,
            id: res.data[i].id,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng,
            iconPath: "https://languanzhao.github.io/img-for-wxproject/position.png", //图标路径
            width:50,
            height: 60
          })
          
        }
        that.setData({
          markers:mks
        })
      }
    })
  },
  onShareAppMessage: function (res) {                 //转发接口
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '蓝观钊测试版',                            //转发的标题
      path: '',
      imageUrl:'https://languanzhao.github.io/img-for-wxproject/pic.png'                          //转发显示的图片
    }
  }

})