import { api, request } from "../../api/request"
import { iRecipePage } from "../../ts/interface/iGallery";
import { RootObject } from "../../ts/model/mGallery";
import { iData } from '../../ts/interface/iGallery';

const contacts: object[] = [{}]
const app = getApp<IAppOption>()
Page({
  /**
   * 页面的初始数据
   */
  data: <iData>{
    contacts,
    contact: contacts[0],
    transformIdx: 0,
    duration: 300,
    show: false,
    overlay: false,
    dataList: [],
    page: 1,
    pageSize: 20,
    top: app.globalData.top,
    container: null,
    showTopMask: false,
    classifies: [{ label: '炒菜', id: 0 },
    { label: '煲汤', id: 1 },
    { label: '主食', id: 1 },
    { label: '甜点', id: 1 },
    { label: '凉菜', id: 1 },
    { label: '饮品', id: 1 },
    ]
  },

  showNext(e: any) {
    const idx = e.currentTarget.dataset.idx
    console.log('>>>>', idx);
    this.setData({
      show: true,
      contact: this.data.contacts[idx],
      transformIdx: idx
    })
  },
  // get reply form component page
  getShowPrev(e: any) {
    console.log('prev:', e)
    this.setData({
      show: e.detail
    })
  },
  getShowNext(e: any) {
    console.log('next', e);
    this.setData({
      transformIdx: e.currentTarget.id,
      contact: this.data.contacts[e.currentTarget.id],
    }, () => {
      this.setData({
        show: true,
      })
    })
  },
  _animate() {
    wx.createSelectorQuery().select('#gscroller').fields({
      scrollOffset: true,
      size: true
    }, () => {
      this.animate('#tse', [{
        width: '100%',
        marginLeft: '0px'
      }, {
        width: '15%',
        marginLeft: '110px'
      }], 2000, {
        scrollSource: '#gscroller',
        timeRange: 1000,
        startScrollOffset: 0,
        endScrollOffset: 50
      })
    }).exec()
  },
  async getData() {
    const data: RootObject = await request(api.recipePage,
      <iRecipePage>{
        current: this.data.page,
        size: this.data.pageSize,
        quertOption: {
          "parseDetail": false,
          "parseProcedure": false
        },
      }, "POST");
    this.setData({
      contacts: data.data.records
    })
    console.log(this.data.contacts);

  },
  bindScroll(scrollState: any) {
    const currshow = scrollState.detail.isFixed;
    currshow !== this.data.showTopMask &&
      this.setData({
        showTopMask: currshow
      })
    console.log(this.data.showTopMask);

  },
  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options: any) {
    console.log('top', app.globalData.top);
    //  wx.createSelectorQuery().select('.van-sticky')

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getData();
    this._animate();
    this.setData({
      container: () => wx.createSelectorQuery().select('#classify')
    })
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

  }
})