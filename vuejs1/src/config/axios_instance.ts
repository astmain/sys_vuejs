/// <reference types="vite/client" />
import axios from 'axios'
// import { useBUS } from '../BUS'
// const BUS = useBUS()

// setInterval(() => {

//   console.log('BUS.url_api_curr.url', BUS.url_api_curr.url)
// }, 1000)

// 创建axios实例
const axios_instance = axios.create({
  // baseURL: import.meta.env.VITE_url_app_run || '/',
  // baseURL: BUS.url_api_curr.url,
  // @ts-ignore
  baseURL: import('../BUS.ts').then((res) => res.useBUS().url_api_curr.url),
  // timeout: 10000,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
})

function get_url_api_curr() {
  // let aaa = useBUS()
  return BUS.url_api_curr.url

  return '1111'
}

// 请求拦截器
axios_instance.interceptors.request.use(
  (config) => {
    config.url = get_url_api_curr()

    config.headers['token'] = import.meta.env.VITE_jwt_token_swagger
    config.headers['Authorization'] = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE1MTYwMzE1MTEwIiwicGhvbmUiOiIxNTE2MDMxNTExMCIsImlkIjoxLCJ1c2VyX2lkIjoxLCJyb2xlSWRzIjpbXSwiZGVwYXJ0bWVudCI6W3siaWQiOjJ9XSwiaWF0IjoxNzU3MDQ1NDQzLCJleHAiOjE3NTcxMzE4NDN9.pr1zrkXrNxtumxcZmI_3Acbmy-C9Qb_O9cZRWeQ1QkQ'
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
    // console.log(error.response)
    // return Promise.reject(error)

    console.log('error.response.data:', error.response.data)

    error.response.data.msg = error.response.data.msg || error.response.data.message

    return error.response.data
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
