<!-- 购物车 -->
<template>
  <nav style="border: 1px solid #000">
    <!-- 工具栏 -->
    <el-button size="small" @click="find_list_model_card()" type="primary"> find_list_model_card111 </el-button>
    <el-button size="small" @click="create_model_order()" type="primary"> create_model_order </el-button>

    <!-- 选中列表 -->
    <ul style="max-height: 500px; overflow-y: auto; padding-right: 10px">
      <li v-for="(item, index) in list_model_card" :key="item.id">
        <el-card shadow="hover" style="width: 400px">
          <div style="display: flex; align-items: center; margin-bottom: 10px">
            <el-checkbox v-model="item.selected" @change="handleSelectionChange(item)" style="margin-right: 10px" />
            <span>选中此商品</span>
          </div>
          <div>index:{{ index }}</div>
          <div>购车车id:{{ item.id }}</div>
          <div>购车车创建时间:{{ item.created_at }}</div>
          <div>商品标题:{{ item.product.title }}</div>
          <div>商品id:{{ item.product.id }}</div>
          <div>商品价格类型:{{ item.price_type }}</div>
          <div>商品价格:{{ item.product[item.price_type] }}</div>
          <el-button size="small" @click="delete_model_card(item.id)" type="info"> delete_model_card </el-button>
        </el-card>
      </li>
    </ul>

    <!-- 显示选中的ID列表 -->
    <div v-if="list_select.length > 0" style="margin-top: 10px; padding: 10px; background-color: #f5f5f5">
      <strong>已选中的商品ID：</strong>
      <span v-for="(item, index) in list_select" :key="item.cart_id"> {{ item.cart_id }}{{ index < list_select.length - 1 ? ', ' : '' }} </span>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, provide } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { BUS } from '@/BUS'
import { axios_api } from '@/config/axios_instance'

// 类型定义
interface SelectedProduct {
  price_type: string
  cart_id: number
}

// 数据=======================================
let list_model_card = $ref([] as any[])
let list_select = $ref([] as SelectedProduct[]) //选中列表 只能放置 {product_id}

// 方法=======================================
// 处理选中状态变化
function handleSelectionChange(item: any) {
  if (item.selected) {
    // 添加到选中列表
    const exists = list_select.some((selected) => selected.cart_id === item.id)
    if (!exists) {
      list_select.push({ price_type: item.price_type, cart_id: item.id })
    }
  } else {
    // 从选中列表移除
    const index = list_select.findIndex((selected) => selected.cart_id === item.id)
    if (index > -1) {
      list_select.splice(index, 1)
    }
  }
  console.log('当前选中的商品ID:', list_select)
}

async function find_list_model_card() {
  const form = { user_id: BUS.model.user_id, page_index: 1, page_size: 10, order_by: 'created_at', order_type: 'desc' }

  const res: any = await axios_api.post('/find_list_model_card', form)
  console.log('find_list_model_card---res:', res)
  if (res.code === 200) {
    ElMessage.success(res.msg)
    // 为每个商品添加选中状态
    list_model_card = res.result.list.map((item: any) => ({
      ...item,
      selected: false,
    }))
  } else {
    ElMessage.error(res.msg)
  }
}

BUS.model.find_list_model_card = find_list_model_card //全局方法暴露
async function delete_model_card(id: number) {
  const res: any = await axios_api.get(`/delete_model_card?id=${id}`)
  console.log('delete_model_card---res:', res)
  if (res.code === 200) {
    ElMessage.success(res.msg)
    find_list_model_card()
  } else {
    ElMessage.error(res.msg)
  }
}

async function create_model_order() {
  const res: any = await axios_api.post('/create_model_order')
  console.log('create_model_order---res:', res)
}

onMounted(() => {
  find_list_model_card()
})
</script>

<style scoped></style>
