//app.js
App({
  onLaunch: function () {
		//显示 tabBar 某一项的右上角的红点
			wx.showTabBarRedDot({
				index:0             //首页（从左算起）
			})
			
		//为 tabBar 某一项的右上角添加文本
		wx.setTabBarBadge({
			index: 1,             //第二页（从左算起）
			text: '1'             //文本 1
		})
  }
})