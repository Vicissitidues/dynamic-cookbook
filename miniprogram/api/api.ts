// api address
// const base_url = "https://dymenu.linlitao.shop";
const base_url = "http://localhost:8006"
// interface urls
const api: { [key: string]: string } = {
  getToken: base_url + '/sts/refresh',  //获取COSbucket的token
  recipeQuery: base_url + '/api/menu/core/recipe/query', //查询菜谱信息
  recipePage: base_url + '/api/menu/core/recipe/page'
}
export {
  api
}


