<template>
  <!-- 购物车 -->
  <nav style="border: 1px solid #000">
    <el-button size="small" @click="find_list_model_card()" type="primary"> find_list_model_card111 </el-button>
    <el-button size="small" @click="create_model_order()" type="primary"> create_model_order </el-button>

    <ul>
      <li v-for="(item, index) in list_model_card" :key="item.id">
        <el-card shadow="hover" style="width: 400px">
          <div>{{ item.id }}</div>
          <el-button size="small" @click="delete_model_card(item.id)" type="primary"> delete_model_card </el-button>
          <!-- <el-button size="small" @click=";(BUS.STORE.show_cart_json_modal = true), (BUS.STORE.selected_cart_json = item)" type="primary"> selected_cart_json </el-button> -->
        </el-card>
      </li>
    </ul>

    <!-- <el-dialog title="添加3D模型" width="500px" v-model="BUS.STORE.show_cart_json_modal" :close-on-click-modal="false">
      <el-input :value="JSON.stringify(BUS.STORE.selected_cart_json, null, 2)" type="textarea" :rows="20" readonly></el-input>
    </el-dialog> -->
  </nav>
</template>
<script lang="ts">
import { useRoute } from 'vue-router'
import { ref, getCurrentInstance } from 'vue'
import { BUS } from '@/BUS'
import { ElMessage } from 'element-plus'
import { axios_api } from '@/config/axios_instance'

export default {
  setup() {
    const route = useRoute()
    return {
      route,
    }
  },
  data() {
    return {
      BUS,
      list_model_card: [] as any[],
    }
  }, ////

  computed: {
    show_price: () => {
      // return BUS.STORE.selected_cart_json.price_type === 'price_personal' ? BUS.STORE.selected_cart_json.price_personal : BUS.STORE.selected_cart_json.price_company
    },
  },
  methods: {
    async find_list_model_card() {
      const form = {
        user_id: BUS.model.user_id,
        page_index: 1,
        page_size: 10,
        order_by: 'created_at',
        order_type: 'desc',
      }

      const res: any = await axios_api.post('/find_list_model_card', form)
      console.log('find_list_model_card---res:', res)
      if (res.code === 200) {
        ElMessage.success(res.msg)

        this.list_model_card = res.result.list
      } else {
        ElMessage.error(res.msg)
      }
    },

    async create_model_order() {},

    async delete_model_card(id: number) {
      const res: any = await axios_api.get(`/delete_model_card?id=${id}`)
      console.log('delete_model_card---res:', res)
      if (res.code === 200) {
        ElMessage.success(res.msg)
        this.find_list_model_card()
      } else {
        ElMessage.error(res.msg)
      }
    },
  }, ////
  async mounted() {
    this.find_list_model_card()
  },
}
</script>
<style scoped></style>
