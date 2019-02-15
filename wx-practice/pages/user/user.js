
Page({

  data: {
    latitude:23.139579,
    longitude:113.336303,
    markers: [{
      latitude: 23.099994,
      longitude: 113.324520
    }],
		githubUrl: '长按我可以复制哦'
  },
	copyGithubUrl() {
		wx.setClipboardData({ data: this.data.githubUrl })
	}
})