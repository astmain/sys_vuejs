<template>
  <h3 style="padding: 0; margin: 0">路由:{{ route.name }}</h3>

  <main style="display: flex; gap: 10px">
    <!-- 商品 -->
    <Zoom_product ref="Zoom_product"></Zoom_product>

    <!-- 购物车 -->
    <Zoom_cart ref="Zoom_cart"></Zoom_cart>

    <!-- 订单 -->
    <Zoom_order ref="Zoom_order"></Zoom_order>
  </main>
</template>
<script lang="ts">
import { useRoute } from 'vue-router'
import { ref, getCurrentInstance, provide } from 'vue'
import { BUS } from '@/BUS'
import { ElMessage } from 'element-plus'
import { axios_api } from '@/config/axios_instance'

import Zoom_product from './Zoom_product.vue'
import Zoom_cart from './Zoom_cart.vue'
import Zoom_order from './Zoom_order.vue'

export default {
  setup() {
    const route = useRoute()
    const instance = getCurrentInstance()

    return {
      route,
    }
  },
  components: {
    Zoom_product,
    Zoom_cart,
    Zoom_order,
  },
  data() {
    return {}
  }, ////
  methods: {}, ////
  async mounted() {},
}
</script>
<style scoped></style>
