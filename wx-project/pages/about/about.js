Page({
  data:{
    info:[
      {
        label:'作者',
        value:'蓝观钊'
      },
      {
        label: '职业',
        value: 'web前端'
      },
      {
        label: '微信',
        value: '15913552130'
      },
      {
        label: 'github',
        value: 'https://github.com/'
      },
			{
				label:'座右铭',
        value:'The harder you work, the luckier you are!'
			}
    ],
		wxList:[
			{wx:"wx.request",cn:"发起网络请求"},
			{wx:"wx.login",cn:"微信授权登录功能"},
			{wx:"wx.getLocation",cn:"获取当前位置"},
			{wx:"wx.getNetworkType",cn:"获取手机网络状态"},
			{wx:"wx.chooseImage",cn:"从相册选择图片，或者拍照"},
			{wx:"wx.previewImage",cn:"预览图片"},
			{wx:"wx.getSystemInfo",cn:"获取系统信息"},
			{wx:"wx.getSystemInfoSync",cn:"获取系统信息"},
			{wx:"wx.getStorage",cn:"获取本地数据缓存"},
			{wx:"wx.getStorageSync",cn:"获取本地数据缓存"},
			{wx:"wx.setStorage",cn:"设置本地数据缓存"},
			{wx:"wx.setStorageSync",cn:"设置本地数据缓存"},
			{wx:"wx.clearStorage",cn:"清理本地数据缓存"},
			{wx:"wx.clearStorageSync",cn:"清理本地数据缓存"},
			{wx:"wx.showToast",cn:"显示提示框"},
			{wx:"wx.showModal",cn:"显示模态弹窗"},
			{wx:"wx.navigateTo",cn:"跳转到非 tabBar 页面"},
			{wx:"wx.switchTab",cn:"跳转到 tabBar 页面"},
			{wx:"wx.showNavigationBarLoading",cn:"顶部出现加载动画"},
			{wx:"wx.startPullDownRefresh",cn:"触发下拉刷新"},
			{wx:"wx.stopPullDownRefres",cn:"停止下拉刷新"},
			{wx:"wx.getUserInfo",cn:"获取用户信息"},
			{wx:"wx.getBatteryInfo",cn:"获取手机电量及是否正在充电中"},
			{wx:"wx.setClipboardData",cn:"设置剪贴板内容"},
			{wx:"wx.getClipboardData",cn:"获取剪贴板内容"},
			{wx:"wx.setNavigationBarTitle",cn:"动态设置当前页面的标题"},
			{wx:"wx.createCameraContext",cn:"相机功能"},
			{wx:"wx.showActionSheet",cn:"显示操作菜单"},
			{wx:"wx.setTabBarBadge",cn:"为 tabBar 某一项的右上角添加文本"},
			{wx:"wx.removeTabBarBadge",cn:"移除 tabBar 某一项右上角的文本"},
			{wx:"wx.showTabBarRedDot",cn:"显示 tabBar 某一项的右上角的红点"},
			{wx:"wx.hideTabBarRedDot",cn:"隐藏 tabBar 某一项的右上角的红点"},
			{wx:"wx.pageScrollTo",cn:"将页面滚动到目标位置"},
			{wx:"wx.chooseAddress",cn:"获取用户收货地址"},
			{wx:"wx.makePhoneCall",cn:"拨打电话"},
			{wx:"wx.addPhoneContact",cn:"添加联系人"},
      {wx:"wx.scanCode",cn:"调起客户端扫码界面进行扫码"},
      {wx:"wx.vibrateLong",cn:"手机发生振动（400ms）"}
		]
  }
})

