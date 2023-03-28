// api address
const base_url = "https://dymenu.linlitao.shop";
// interface urls
const api: { [key: string]: string } = {
  getToken: base_url + '/sts/refresh',  //获取COSbucket的token
  recipeQuery: base_url + '/api/menu/core/recipe/query', //查询菜谱信息
}
export {
  api
}


