import { defineStore } from 'pinia'
import { STORE } from './view/shop/model/STORE'

// 创建全局pinia实例

// 定义BUS store，确保在项目启动时就初始化
export const useBUS = defineStore('BUS_defineStore', {
  state: () => ({
    count: 0,
    web_type: 'admin',
    VITE_url_app_run: '',
    VITE_url_app_list: [],
    token: '',
    STORE: STORE,
  }),
  persist: [
    { pick: ['count', 'web_type', 'VITE_url_app_run', 'VITE_url_app_list', 'token'], storage: localStorage },

    {
      key: 'token',
      pick: ['token'],
      storage: localStorage,
      serializer: { serialize: (value: any) => value['token'], deserialize: (value: any) => value['token'] },
    },
    {
      key: 'VITE_url_app_run',
      pick: ['VITE_url_app_run'],
      storage: localStorage,
      serializer: { serialize: (value: any) => value['VITE_url_app_run'], deserialize: (value: any) => value['VITE_url_app_run'] },
    },
  ],
})

export const BUS = useBUS()

// // 声明全局变量类型
// declare global {
//   // @ts-ignore  // 忽略类型检查，因为useBUS是动态创建的
//   export type { ReturnType<typeof useBUS> }
// }

// 设置为全局变量
if (typeof window !== 'undefined') {
  ;(globalThis as any).BUS = BUS
}

// 导出类型定义
export interface BUSState {
  count: number
}
