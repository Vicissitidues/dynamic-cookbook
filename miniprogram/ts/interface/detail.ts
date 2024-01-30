type gKeys = 'backgroundImage'
type pKeys = 'borderTopRightRadius';
type arr = Array<{ [k in gKeys]: string }>;
type arr1 = Array<{ [k in pKeys]: string }>;

enum eDifficulty {
  菜鸟 = 0,
  新手, 普通, 专家,
}
enum eRankColor {
  r1 = '#FF842B',
  r2 = '#FDB008',
  r3 = '#C0E148',
  r4 = '#B0B0B0'
}
enum eIcon {
  time = "../../assets/svg/time.svg",
  salver = "../../assets/svg/dish.svg",
  fork = "https://dynamic-cookbook-1316931011.cos.ap-chengdu.myqcloud.com/dycb/Fork%2C%20knife.svg",
  like = 'https://dynamic-cookbook-1316931011.cos.ap-chengdu.myqcloud.com/heart-fill.svg',
  unlike = 'https://dynamic-cookbook-1316931011.cos.ap-chengdu.myqcloud.com/heart.svg',
}
interface iPrepare {
  cover: string;
  longTitle: string;
  like: boolean;
  description: string;
  amount: number;
  attention: Array<string>;
  hints: Array<{
    icon: string;
    name: string;
  }>
}

export {
  arr,
  arr1,
  eDifficulty,
  eRankColor,
  eIcon,
  iPrepare
}