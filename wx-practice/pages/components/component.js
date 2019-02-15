
Component({                          //注意事项：组件里的是Component而不是Page
  /**
   * 组件的属性列表
   */
  properties:{                      //porp  公有的属性，即可以让其它页面去修改text2
      text:{
        type:String,
        value:"公有组件"
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
      text1:"私有组件"                //只能在本页面使用的数据
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
