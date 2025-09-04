/// <reference types="vite/client" />
import axios from 'axios'

// 创建axios实例
const axios_instance = axios.create({
  baseURL: import.meta.env.VITE_url_app_run || '/',
  // timeout: 10000,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
})

// 请求拦截器
axios_instance.interceptors.request.use(
  (config) => {
    // config.headers['token'] =  import.meta.env.VITE_token
    // config.headers['token'] =  localStorage.getItem('token') ||    import.meta.env.VITE_jwt_token_swagger
    config.headers['token'] = import.meta.env.VITE_jwt_token_swagger
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
axios_instance.interceptors.response.use(
  (response) => {
    // 可统一处理响应数据
    return response.data
  },
  (error) => {
    // 可统一处理错误
    // alert(error.message)
    return Promise.reject(error)
  }
)

export const axios_api = axios_instance

// 让axios_api 支持全局使用
declare global {
  interface Window {
    axios_api: typeof axios_instance
  }
}

window.axios_api = axios_api
