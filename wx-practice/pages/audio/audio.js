//酷狗音乐 f12 复制src
Page({
  onReady(e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
		//设置src
    // this.audioCtx.setSrc('http://fs.w.kugou.com/201901221030/1b900e8a24ebec3d42a0bfb20667e6bb/G149/M02/15/18/NYcBAFvo8v6AUzwCADTY9URVT8U514.mp3')
  },
  data: {
    src: 'http://fs.w.kugou.com/201901221030/1b900e8a24ebec3d42a0bfb20667e6bb/G149/M02/15/18/NYcBAFvo8v6AUzwCADTY9URVT8U514.mp3'
  },
  audioPlay() {
    this.audioCtx.play()
  },
  audioPause() {
    this.audioCtx.pause()
  },
  audio14() {
    this.audioCtx.seek(50)
  },
  audioStart() {
    this.audioCtx.seek(0)
  }
})