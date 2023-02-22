
// bucket 配置
enum eBucket {
  BUCKETURL = '',
  BUCKETNAME = 'dynamic-cookbook-1316931011',
  BUCKETREGION = 'ap-chengdu',
}
// 请求方式
enum eRequest {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
  APPEND = 'APPEND'
}

const globalSettings = {
  eBucket, eRequest
}
export default globalSettings;