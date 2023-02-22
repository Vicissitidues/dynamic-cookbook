// pages/detail/detail.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [{
      message: 'foo',
    }, {
      message: 'bar'
    }],
    prepare: {
      img:'https://img1.baidu.com/it/u=639981960,3283230142&fm=253&fmt=auto&app=120&f=JPEG?w=641&h=360',
      list:[{
        name:"盐",
        consumption:"2g",
        isPrepared:false,
        svg: "https://dynamic-cookbook-1316931011.cos.ap-chengdu.myqcloud.com/dycb/02%20%E4%BD%8E%E7%B3%96%E9%A3%9F%E7%89%A9.svg"
      },{
        name:"",
        consumption:"",
        isPrepared:"",
        svg:''
      },{
        name:"",
        consumption:"",
        isPrepared:"",
        svg:''
      },{
        name:"",
        consumption:"",
        isPrepared:"",
        svg:''
      },{
        name:"",
        consumption:"",
        isPrepared:"",
        svg:''
      }]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let arr = []
    for(var i = 0;i<100;i++){
      arr.push({message:`${i}`})
    }
    this.setData({
      array: arr
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})