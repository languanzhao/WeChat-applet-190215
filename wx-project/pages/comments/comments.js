
Page({
  data: {
	commentList:[]
  },
  onLoad: function (query) {
		var that = this
		wx.request({
			url:"https://api-m.mtime.cn/Movie/HotLongComments.api",
			data:{
				pageIndex:1,
				movieId:query.movieId
			},
			success:function(res){
				var commentList = res.data.comments     //1.先提取数据  (数据从上往下读取)
				console.log(commentList)
				commentList.forEach(function(item,i){   //2.数据中的rating需要处理
					var rating = parseInt(item.rating/2)
					item.rating = rating
				})
				that.setData({commentList:commentList}) //3.最终处理完的数据再赋予data中的commentList
			}
		})
	},
	//点赞 +1
	addPraiseCount:function (e) { 
		//需要根据下标来判断点击是哪一个
		var index = e.currentTarget.dataset.index
		var list = this.data.commentList
	  var commentCount = list[index].commentCount + 1
		list[index].commentCount = commentCount
		this.setData({commentList:list})
	 },
	 //点赞变色
	 changePraiseColor:function(e){
		var index = e.currentTarget.dataset.index

	 }
})