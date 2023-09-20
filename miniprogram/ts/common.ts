
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
// 难度
export enum eDifficulty {
  EASY = 1,
  NORMAL,
  HARD
}
export const difficultyTranstion: Record<eDifficulty, string> = {
  [eDifficulty.EASY]: '简单',
  [eDifficulty.NORMAL]: '普通',
  [eDifficulty.HARD]: '困难'
}

export { eCode, globalAlert }