type gKeys = 'backgroundImage' 
type pKeys = 'borderTopRightRadius';
type arr = Array<{ [k in gKeys]: string }>;
type arr1 = Array<{ [k in pKeys]: string }>;

enum eDifficulty {
  新手 = 1,
  普通 = 2,
  专家 = 3,
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
  eIcon,
  iPrepare
}