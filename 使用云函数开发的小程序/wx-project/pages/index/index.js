//index.js
//获取应用实例
const app = getApp()
var QQMapWX = require('../.././libs/qqmap-wx-jssdk.min.js');
var demo = new QQMapWX({
    key: 'GOEBZ-HICCO-QWTWO-SUU42-G25DE-H4FOD' // 必填
})
var regeneratorRuntime = require('../.././libs/runtime.js')
Page({
  data: {
		active:0,
    tabList:["正在热映","即将上映"],
    list:[],
    imglist:[
      {"pic_url":"https://languanzhao.github.io/img-for-wxproject/banner01.jpg"},
      {"pic_url":"https://languanzhao.github.io/img-for-wxproject/banner02.jpg"},
      {"pic_url":"https://languanzhao.github.io/img-for-wxproject/banner03.jpg"}
    ],
    filmList:[],
    bool:false,
    number:3,
		count:3,
    loadingText:"加载更多...",
		city:""
  },
  getLocation:function(){
    return new Promise(function(resolve,reject){
      wx.getLocation({
        type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
        success: function(res){
         resolve(res)
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    })
  },
  setLocation:function(res){
      return new Promise(function(resolve,reject){
        demo.reverseGeocoder({
          location:{
            latitude:res.latitude,
            longitude:res.longitude
          },
          success:function(res){
            resolve(res)
          },
          fail:function(res){
            reject(res)
          }
        })
      })
  },
  asyncFn:async function(){
      try{
        var res = await this.getLocation()
        var location = await this.setLocation(res)
        this.setData({city:location.result.address_component.city})
      }catch(err){
        console.log(err)
        this.setData({city:"广州市"})
      }
  },
	onLoad:function(){
    this.asyncFn()
		// var that = this
		// wx.getLocation({
		// 	success:function(res){
		// 		demo.reverseGeocoder({
		// 			location: {
		// 				latitude: res.latitude,
		// 				longitude: res.longitude
		// 			},
		// 			success: function(res) {
		// 				that.setData({city:res.result.address_component.city})
		// 			}
		// 		});
		// 	}
    // })
    // if(this.data.city === ""){
    //   this.setData({city:"广州市"})
    // }
	},
  toClick(e){
    var i = e.currentTarget.dataset.index             //注意： e.currentTarget.dataset.index
    this.setData({active:i})
		if(i === 1){
			wx.showToast({
				title: '暂无影片信息哦',
				icon: 'loading',
				duration:2000
      })
      // var that = this
      // setTimeout(function(){
      //   that.setData({active:0})
      // },2000)
			setTimeout(()=>{
				this.setData({active:0})
			},2000)
		}
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
      title: '蓝观钊测试版',                            //转发的标题
      path: '',
      imageUrl:'https://languanzhao.github.io/img-for-wxproject/pic.png'                          //转发显示的图片
    }
  },
    onShow:function(){
      var that = this
    // wx.request({
    //   url: "http://v.juhe.cn/movie/movies.today",   //仅为示例，并非真实的接口地址
    //   data: {
    //    cityid:5,
    //    key:"6fa03e769ee9cd8fcb836dd8692b319e"
    //   },
    //   success:function(res){
    //     console.log(res.data.result)
    //     that.setData({prolist:res.data.result})
    //     that.setData({imglist:res.data.result})
    //    that.setData({imglist:res.data.result.slice(0,3)}) 
    //   }
    // })
    
    wx.cloud.init({                               //先初始化
			env:"test-3a6ab0"
		})
		wx.cloud.callFunction({
      name:"showData"
      
		}).then(function(res){
      
			var newList = res.result.data[0].info        //获取调用数据库里的信息 注：data数组下的info数组
			that.setData({list:newList})                 //将获取的数组存进空数组list中
			
 			// var result = newList.slice(0,3)           //截取前三个数据进入banner里
      //  that.setData({imglist:result})           //截取放入

      var flim = newList.slice(0,3)                //为了为下面做的 onReachBottom 加载更多 ，所以先显示3个当上拉时显示更多
      that.setData({filmList:flim}),
			console.log(newList)
    })

   },
   onReachBottom:function(){                        //页面事件处理函数 onReachBottom() 监听用户上拉触底事件。
		var that = this                                 //使用前在全局或使用页面添加 滑动距离 "onReachBottomDistance":50
		this.setData({bool:true})
		this.setData({number:that.data.number+=that.data.count})
		setTimeout(function(){
			var flim = that.data.list.slice(0,that.data.number)    //当上拉动作发生时，获取对应数据
			
			that.setData({filmList:flim})
			
			that.setData({bool:false})
			
			if(that.data.filmList.length === that.data.list.length){
				that.setData({loadingText:"加载完毕"})
			}
		},1500)
	}
   
   
 
})
