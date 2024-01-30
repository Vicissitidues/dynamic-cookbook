import { iData } from "miniprogram/ts/interface/iSteps";
import { api, request } from "../../api/request";
import { mDetailObject } from '../../ts/model/mGallery'
// pages/steps/steps.ts

Page({
  /**
   * 页面的初始数据
   */
  data: <iData>{
    steps: [],
    scrollLeft: 0,
    titleOffset: 0,
    currentStep: 0,
    timerIdentify: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(query: { id: string }) {
    this.getItems(query.id)
  },
  async getItems(id: string) {
    const result: mDetailObject = await request(api.recipeQuery, {
      "recipeId": id,
      "queryOption": {
        "parseProcedure": true
      }
    }, "POST");
    this.setData({
      steps: result.data.recipeProcedures
    })
  },
  async onTouchSubtitle(e: any) {
    const { screenWidth } = await wx.getSystemInfo();
    const { sort } = e.currentTarget.dataset;
    const stepOffset = sort * screenWidth;
    this.setData({
      scrollLeft: stepOffset,
      currentStep: sort
    })

  },
  onScrollEnd(e: any) {
    this.data.timerIdentify && clearTimeout(this.data.timerIdentify)
    this.setData({
      timerIdentify: Number(setTimeout(async () => {
        const { scrollLeft } = e.detail;
        const { screenWidth } = await wx.getSystemInfo();
        const rest = scrollLeft % screenWidth <= (screenWidth / 2) ? 0 : 1;
        const times = Math.floor(scrollLeft / screenWidth);
        const currentStep = rest + times;
        this.setData({
          scrollLeft: currentStep * screenWidth,
          currentStep,
          timerIdentify: 0
        })
      }, 200))
    })
  },
})