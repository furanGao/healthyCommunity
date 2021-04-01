import axios from 'axios'
import store from '@/store'
import router from '@/router'
let http = axios.create({
  baseURL: '/api'
})

http.interceptors.request.use((req)=>{
  let token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : ''
  req.headers.authorization = token
  return req
})

http.interceptors.response.use((res)=>{
  if (res.data.code === 403){
    router.push('/login')
  }
  return res
})

export default http
