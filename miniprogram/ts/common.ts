enum eCode {
  SUCCESS = 100,
  ERROR = 400,
  NOAUTHORIZE = 401,
  ACCOUNTERROR = 402,
  NOLOGIN = 403,
}

interface iResponse {
  code: Number;
  msg: String;
  data: Array<any> | {};
}

export { eCode, iResponse, }