// index.ts
import globalSettings from "../../lib/globalEnum"
import bucketTargetHandler from "../../utils/bucketTargetHandler"

const handler = new bucketTargetHandler();
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    step: 0,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    top: 0,
    activity: [0],
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  navigate2Detail() {
    wx.navigateTo({
      url: '../detail/detail'
    })
  },
  navi2ppagard() {
    wx.navigateTo({
      url: '../detail/detail'
    })
  },
  tapGetObj() {
    handler.getObject('demo.png')
  },
  tapUpload() {
    const result = wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
    })
    result.then(res => {
      handler.uploadFile('mmprogram', res.tempFiles[0].tempFilePath, globalSettings.eRequest.PUT)
    })
  },
  tapVibrate() {
    let cont: number = 0;
    const intv: number = setInterval(() => {
      wx.vibrateShort({
        type: 'light'
      })
      cont++;
      cont > 10 && clearInterval(intv)
    }, 100)
  },
  slideChange(e: { detail: { value: number } }): void {
    this.setData({
      step: e.detail.value
    }, () => {
      (!(e.detail.value % 10) && ![0, 100].includes(e.detail.value)) &&
        wx.vibrateShort({ type: "light" });
    })
  },
  _animate() {
    wx.createSelectorQuery().select('#scroller').fields({
      scrollOffset: true,
      size: true,
    }, () => {
      this.animate('#rem', [{
        height: '360px'
      },{
        height: '0px'
      }], 2000, {
        scrollSource: '#scroller',
        timeRange: 1000,
        startScrollOffset: 0,
        endScrollOffset: 150,
      })
    }).exec()
  },
  onReady() {
    // start animation
    this._animate();
    // 获取基础信息
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
         console.log(res.code);
         
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    const menuBtnPos = wx.getMenuButtonBoundingClientRect();
    console.log(menuBtnPos);

    this.setData({
      top: menuBtnPos.top
    })
    console.log(menuBtnPos);
    wx.setStorageSync('menuBtnPos', menuBtnPos)

  },
  onLoad() {
    // 生成一组0或1的数组 
    let activity: any[] = new Array(5).fill(0);
    function any() {
      return arguments[Math.floor(Math.random() * arguments.length)]
    }
    activity = [...activity].map(() => {
      let c = 0;
      let item = [];
      do {
        item.push(
          // @ts-ignore
          any("lightgray", "#cddc39", "#8bc34a", "#4caf50")
        )
        c++;
      } while (c <= 6);
      return item;
    })

    this.setData({ activity })
    console.log(activity);


    // @ts-ignore
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e: any) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
