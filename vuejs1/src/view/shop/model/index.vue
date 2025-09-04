<template>
  <h3 style="padding: 0; margin: 0">路由:{{ route.name }}</h3>
  <h3 style="padding: 0; margin: 0">用户ID:{{ BUS.model.user_id }}</h3>

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

import { BUS } from '@/BUS'

import Zoom_product from './Zoom_product.vue'
import Zoom_cart from './Zoom_cart.vue'
import Zoom_order from './Zoom_order.vue'

export default {
  setup() {
    const route = useRoute()

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
    return { BUS }
  }, ////
  methods: {}, ////
  async mounted() {},
}
</script>
<style scoped></style>
