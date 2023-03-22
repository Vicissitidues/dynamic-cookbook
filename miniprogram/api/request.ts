import { eCode, globalAlert } from '../ts/common';
import { api } from './api'

// http request 
const request: iRequest = (url, data = {}, method) => {
  wx.showLoading({
    title: '加载中',
  });
  return new Promise((resolve, reject) => {
    const token: string = wx.getStorageSync("TOKEN");
    //data['access_token'] = token || '';
    wx.request({
      url: url, method: method, data,
      header: {
        //'content-type': 'application/x-www-form-urlencoded'
        'content-type': 'application/JSON'
      },
      success: (res) => {
        wx.showToast({title:res.toString(),duration:10000})
        const data = res.data as { code: string };
        handleRequest(res.statusCode);
        switch (data.code) {
          case 'B000001':
            wx.showToast({ title: '系统执行出错', icon: 'success', duration: 2000 })
            break;

          default:
            break;
        }
        resolve(res.data);
      },
      fail: err => { 
        wx.showToast({title:err.toString(),duration:10000})
        reject(err) },
      complete: () => { wx.hideLoading() }
    })
  })
}
const handleRequest = (code: number): void => {
  switch (code) {
    case eCode.ERROR:
      wx.showToast({ title: globalAlert.REQERR, icon: 'success', duration: 2000 })
      break;
    case eCode.NOAUTHORIZE:
      // TODO 转到授权页面
      break;
    case eCode.ACCOUNTERROR:
      // 
      break;
    case eCode.NOLOGIN:
      break;
    default:
      break;
  }
}
export { request, api };


