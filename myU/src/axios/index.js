import http from './axios'

export function sendRegister(data) {
  return http.post('/api/register',data)
}

export function sendLogIn(data) {
  return http.post('/api/login',data)
}

//轮播图接口
export function getbanner() {
  return http.get('/api/getbanner')
}
//获取分类信息接口
export function getcate() {
  return http.get('/api/getcate')
}
//获取商品信息(首页)
export function getindexgoods() {
  return http.get('api/getindexgoods')
}

//获取一个商品信息
export function getgoodsinfo(params) {
  return http.get('/api/getgoodsinfo',{
    params
  })
}
//购物车添加接口
export function getcartadd(data) {
  return http.post('/api/cartadd',data)
}
//购物车删除
export function getcartdelete(data) {
  return http.post('/api/cartdelete',data)
}
//购物车列表
export function getcartlist(params) {
  return http.get('/api/cartlist',{
    params
  })
}
//获取分类树形结构
export function getcatetree() {
  return http.get('/api/getcatetree')
}
//获取分类商品
export function getgoods(params) {
  return http.get('/api/getgoods',{
    params
  })
}
