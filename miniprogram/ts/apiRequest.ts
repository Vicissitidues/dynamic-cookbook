// all request type/interface/enum here.
enum eReqType {
  "OPTIONS", "GET", "HEAD", "POST", "PUT", "DELETE", "TRACE", "CONNECT"
}
type TMethod = keyof typeof eReqType
interface iReqData {
  access_token?: string;
}
interface iReqParameter {
  url: string,
  data: iRequest,
  method: TMethod,
  headers: {
    'content-type': string
  }
}
interface iRequest {
  (url: string, data: string | object | ArrayBuffer, method: TMethod): Promise<any>
}