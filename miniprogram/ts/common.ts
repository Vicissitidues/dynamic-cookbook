enum eCode {
  SUCCESS = 100,
  ERROR = 400,
  NOAUTHORIZE = 401,
  ACCOUNTERROR = 402,
  NOLOGIN = 403,
}
enum globalAlert {
  REQERR = '请求错误',
  UNAUTH = '未登录',
  FORBIDDEN = '被拒绝',
  NOTFOUND = '404 not found',
}
export { eCode, globalAlert }