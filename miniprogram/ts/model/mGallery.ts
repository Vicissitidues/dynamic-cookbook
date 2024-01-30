// 定义一个表示菜谱细节的接口
export interface RecipeDetail {
  blur: number;           // 图片模糊度
  cover: string;          // 图片链接
  ingredientId: number;   // 食材ID
  ingredientName: string; // 食材名称
  quantity: number;       // 用量
  recipeId: number;       // 菜谱ID
  unitId: number;         // 单位ID
  unitName: string;       // 单位名称
}

// 定义一个表示菜谱步骤的接口
export interface RecipeProcedure {
  cover: string;          // 图片链接
  description: string;    // 步骤描述
  id: number;             // 步骤ID
  recipeId: number;       // 菜谱ID
  sort: number;           // 步骤顺序
  title: string;          // 步骤标题
}

// 定义一个表示记录的接口
export interface Record {
  amount: number;         // 菜谱总量
  cover: string;          // 图片链接
  description: string;    // 菜谱描述
  difficulty: number;     // 难度等级
  id: number;             // 菜谱ID
  ingredients: any[];     // 食材列表
  longTitle: string;      // 菜谱长标题
  precautions: any[];     // 注意事项列表
  recipeDetails: RecipeDetail[];        // 菜谱细节列表
  recipeProcedures: RecipeProcedure[];  // 菜谱步骤列表
  status: number;         // 菜谱状态
  timeTaken: string;      // 做菜时间
}

// 定义一个表示数据的接口
export interface Data {
  current: number;        // 当前页数
  records: Record[];      // 记录列表
  size: number;           // 每页记录数
  total: number;          // 总记录数
}

// 定义一个表示根对象的接口
interface RootObject<T> {
  code: string;           // 响应状态码
  data: T;                // 数据类型
  message: string;        // 响应消息
  requestId: string;      // 请求ID
  success: boolean;       // 请求是否成功
}

export type mGalleryData = RootObject<Data>
export type mDetailObject = RootObject<Record>