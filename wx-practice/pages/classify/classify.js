
Page({

  /**
   * 页面的初始数据
   */
  data: {
    back:"返回",
     text:"分类",
     icon:"图标",
		 navbar: ['发布1', '发布2', '发布3', '发布4', '发布5'],
		 currentTab: 0

  },
	navbarTap:function(e){
		console.log(e)
		this.setData({
			currentTab:e.currentTarget.dataset.index
		})
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onPullDownRefresh(){                                 //监听用户下拉刷新事件。
    wx.startPullDownRefresh()                          //触发下拉刷新
    wx.showNavigationBarLoading()                      //顶部出现加载动画
    wx.stopPullDownRefresh()                           //停止当前页面的下拉刷新
    console.log("分类页正在刷新")
  }
})