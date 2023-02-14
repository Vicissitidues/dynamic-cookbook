import api from './api';
type iniType = keyof typeof eReqType;
// http request 
const request: iRequest = (url, data = {}, method) => {
  wx.showLoading({
    title: '加载中',
  });
  return new Promise((resolve, reject) => {
    const token: string = wx.getStorageSync("TOKEN");
    data['access_token'] = token || '';
    wx.request({
      url: url, method: method, data,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        resolve(res.data);
      },
      fail: err => {
        reject(err)
      },
      complete: res => {
        wx.hideLoading()
      }
    })
  })
}
export default request;


