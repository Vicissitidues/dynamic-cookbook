import { api } from "../api/api";
import request from "../api/request";
import globalSettings from "../lib/globalEnum"
// let COS = require("../lib/cos-wx-sdk-v5.js")
let COS = require('cos-wx-sdk-v5');
interface iBucketOpt {
  Bucket: String,
  Region: String
}
interface mGetBucketToken {
  code: string
  data: Data
  message: any
  requestId: string
  success: boolean
}
interface Data {
  expiredTime: number
  sessionToken: string
  startTime: number
  tmpSecretId: string
  tmpSecretKey: string
}
type tBucketCallback = (arg0: { TmpSecretId: undefined | string; TmpSecretKey: string | undefined; XCosSecurityToken: string | undefined; StartTime: number; ExpiredTime: number; }) => void

var cos = new COS({
  getAuthorization: async (opt: iBucketOpt, callback: tBucketCallback) => {
    const result: mGetBucketToken = await request(
      api.getToken, {
      bucket: opt.Bucket,
      region: opt.Region
    },
      globalSettings.eRequest.GET
    )
    const data = result.data;
    !data && console.error('credentials invalid');
    callback({
      TmpSecretId: data.tmpSecretId,
      TmpSecretKey: data.tmpSecretKey,
      XCosSecurityToken: data.sessionToken,
      StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
      ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000900
    })
  }
})
/**
 * @summary 与COS bucket 的操作方法
 * @see https://cloud.tencent.com/document/product/436/64991
*/
class bucketTargetHandler {
  constructor() { }
  /**
   * @description 通过key获取桶对象
   * @method get
   * @params keyName 被取的文件名 /开头表示文件夹
   */
  getObject = (keyName: string) => {
    cos.getObject({
      Bucket: globalSettings.eBucket.BUCKETNAME,
      Region: globalSettings.eBucket.BUCKETREGION,
      Key: keyName,
    }, (err: Error, data: any) => {
      console.log(err || data.Body)
    })
  }
  /**
   * @description 上传文件｜图片｜ArrayBuffer 到COS bucket
   * @method put
   * @param filename 文件名
   * @param tmpFilePath 文件的临时路径
   * @param method 方法 [post｜put|Append]
   * put简单上传对象、Append追加上传对象、POST 表单上传对象
   */
  uploadFile = (
    filename: string | number | null,
    tmpFilePath: string,
    method: string = globalSettings.eRequest.PUT): void => {
    const parameter = [{
      Bucket: globalSettings.eBucket.BUCKETNAME,
      Region: globalSettings.eBucket.BUCKETREGION,
      Key: `${filename}${new Date().valueOf()}.png`,
      FilePath: tmpFilePath,
      onProgress: (info: JSON): void => {
        console.log(JSON.stringify(info));
      }
    }, (err: Error, data: string | undefined | JSON): void => {
      console.log(err || data);
    }]
    method === globalSettings.eRequest.PUT && cos.putObject(...parameter);
    method === globalSettings.eRequest.POST && cos.postObject(...parameter);
    method === globalSettings.eRequest.APPEND && cos.appendObject(...parameter);
  }
}

export default bucketTargetHandler;