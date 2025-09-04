<template>
  <main style="display: flex; gap: 10px">
    <!-- 商品 -->
    <nav style="border: 1px solid #000">
      <!-- 工具栏 -->
      <el-button size="small" @click="find_list_model_product()" type="primary"> find_list_model_product </el-button>
      <el-button size="small" @click="show_save_model_product = true" type="success"> save_model_product </el-button>

      <!-- 商品列表 -->
      <ul style="max-height: 500px; overflow-y: auto; padding-right: 10px">
        <li v-for="(item, index) in BUS.STORE.list_model_product" :key="item.id">
          <el-card shadow="hover" style="width: 400px" @click="BUS.STORE.selected_model_product = item">
            <nav style="display: flex; gap: 10px">
              <img :src="item.list_img.length > 0 ? item.list_img[0].url : ''" style="width: 100px; height: 100px" />
              <div style="display: flex; flex-direction: column; gap: 5px">
                <span>index:{{ index }}</span>
                <span>title:{{ item.title }}</span>
                <span>id:{{ item.id }}</span>
                <span>created_at:{{ item.created_at }}</span>
              </div>
            </nav>
            <el-button size="small" @click=";(show_save_model_product = true), (BUS.STORE.selected_model_product = item)" type="success"> show_save_model_product </el-button>
            <el-button size="small" @click="save_model_card()" type="primary" plain> save_model_card </el-button>
            <el-button size="small" @click="delete_model_product(BUS.STORE.selected_model_product.id)" type="info"> delete_model_product </el-button>
          </el-card>
        </li>
      </ul>

      <!-- 保存商品 -->
      <el-dialog title="show_save_model_product" width="500px" v-model="show_save_model_product" :close-on-click-modal="false">
        <nav style="max-height: 500px; overflow-y: auto; padding-right: 10px">
          <li class="css_form">
            <h4>模型标题</h4>
            <el-input v-model="form_save.title"></el-input>
          </li>
          <li class="css_form">
            <h4>模型格式</h4>
            <el-input v-model="form_save.model_format"></el-input>
          </li>
          <li class="css_form">
            <h4>模型描述</h4>
            <el-input v-model="form_save.remark"></el-input>
          </li>

          <!-- <li class="css_form">
          <h4>图片</h4>
          <el-input v-model="selected_model_product.list_img [0].url"></el-input>
        </li>

        <li class="css_form">
          <h4>文件</h4>
          <el-input v-model="selected_model_product.list_file[0].url"></el-input>
        </li> -->

          <li class="css_form">
            <h4>个人价格</h4>
            <el-input v-model="form_save.price_personal"></el-input>
          </li>
          <li class="css_form">
            <h4>企业价格</h4>
            <el-input v-model="form_save.price_company"></el-input>
          </li>
          <li class="css_form">
            <h4>企业扩展价格</h4>
            <el-input v-model="form_save.price_extend"></el-input>
          </li>
          <li class="css_form">
            <h4>模型格式</h4>
            <el-input v-model="form_save.model_format"></el-input>
          </li>

          <li class="css_form">
            <h4>布线</h4>
            <el-input v-model="form_save.wiring"></el-input>
          </li>
          <li class="css_form">
            <h4>面积单位</h4>
            <el-input v-model="form_save.area_unit"></el-input>
          </li>
          <li class="css_form">
            <h4>种类</h4>
            <el-input v-model="form_save.kind_ids"></el-input>
          </li>
          <li class="css_form">
            <h4>是否公开</h4>
            <el-switch v-model="form_save.is_public"></el-switch>
          </li>
          <li class="css_form">
            <h4>是否删除</h4>
            <el-switch v-model="form_save.is_deleted"></el-switch>
          </li>
          <li class="css_form">
            <h4>是否商用</h4>
            <el-switch v-model="form_save.is_business"></el-switch>
          </li>
          <li class="css_form">
            <h4>是否骨骼</h4>
            <el-switch v-model="form_save.is_skeleton"></el-switch>
          </li>
          <li class="css_form">
            <h4>是否动画</h4>
            <el-switch v-model="form_save.is_animation"></el-switch>
          </li>
          <li class="css_form">
            <h4>是否打印</h4>
            <el-switch v-model="form_save.is_print"></el-switch>
          </li>
          <li class="css_form">
            <h4>是否未塌陷</h4>
            <el-switch v-model="form_save.is_no_collapse"></el-switch>
          </li>
          <li class="css_form">
            <h4>是否没有塌陷</h4>
            <el-switch v-model="form_save.is_no_collapse"></el-switch>
          </li>
        </nav>

        <el-button size="small" @click="save_model_product()" type="primary"> save_model_product </el-button>
      </el-dialog>
    </nav>
  </main>
</template>
<script lang="ts">
import { useRoute } from 'vue-router'
import { ref, getCurrentInstance } from 'vue'
import { BUS } from '@/BUS'
import { ElMessage } from 'element-plus'
import { axios_api } from '@/config/axios_instance'

export default {
  data() {
    return {
      BUS: BUS,
      show_save_model_product: false as boolean,

      // 表单
      form_find: {
        // 分页字段
        page_index: 1,
        page_size: 10,

        // 模糊搜索字段
        is_check: null,
        order_by: 'count_collect',
        order_type: 'desc',
        title: '',
        remark: '',
        is_public: null,
        is_deleted: false,
        is_business: null,
        is_skeleton: null,
        is_animation: null,
        is_print: null,
        is_no_collapse: null,
        wiring: '',
        area_unit: '',
        kind_ids: [],
      },

      form_save: {
        kind_ids: [], //种类
        title: '标题', //标题
        remark: '描述', //描述
        is_public: true, //是否公开
        is_deleted: false, //是否删除
        is_business: true, //是否商用
        is_skeleton: true, //是否骨骼
        is_animation: true, //是否动画
        is_print: true, //是否打印
        is_no_collapse: true, //是否未塌陷
        model_format: '.stl', //模型格式

        wiring: '', //布线
        area_unit: '', //面积单位
        price_personal: 111, //个人价格
        price_company: 1111, //企业价格
        price_extend: 11111, //企业扩展价格

        list_img: [{ url: 'https://www.baidu.com/img/flexible/logo/pc/result.png', name: '' }], //图片
        list_file: [{ url: 'https://www.baidu.com/img/flexible/logo/pc/result.png', name: '' }], //文件
        list_video: [], //视频
        list_extend: [], //扩展
        list_texture: [], //纹理
      },
    }
  }, ////
  methods: {
    async find_list_model_product() {
      const res: any = await axios_api.post('/find_list_model_product', this.form_find)
      console.log('find_list_model_product---res:', res)
      if (res.code === 200) {
        BUS.STORE.list_model_product = res.result.list
        ElMessage.success(res.msg)
      } else {
        ElMessage.error(res.msg)
      }
    },

    async save_model_product() {
      const res: any = await axios_api.post('/save_model_product', this.form_save)
      console.log('save_model_product---res:', res)
      if (res.code === 200) {
        ElMessage.success(res.msg)
        this.find_list_model_product()
      } else {
        ElMessage.error(res.msg)
      }
    },

    async save_model_card() {
      const form = {
        user_id: BUS.STORE.user_id,
        product_id: BUS.STORE.selected_model_product.id,
        price_type: 'price_personal',
      }

      const res: any = await axios_api.post('/save_model_card', form)
      console.log('save_model_card---res:', res)
      if (res.code === 200) {
        ElMessage.success(res.msg)
        console.log('this.$parent?.$refs.Zoom_cart:', this.$parent?.$refs.Zoom_cart)
        ;(this.$parent?.$refs.Zoom_cart as any)?.find_list_model_card()
      } else {
        ElMessage.error(res.msg)
      }
    },

    async delete_model_product(id: number) {
      const res: any = await axios_api.get(`/delete_model_product?id=${id}`)
      console.log('delete_model_product---res:', res)
      if (res.code === 200) {
        ElMessage.success(res.msg)
        this.find_list_model_product()
      } else {
        ElMessage.error(res.msg)
      }
    },

    async create_order_from_cart() {
      let form = { user_id: BUS.STORE.user_id, price_sub: 0 }
      const res: any = await axios_api.post('/create_order_from_cart', form)
      console.log('create_order_from_cart---res:', res)
      if (res.code === 200) {
        ElMessage.success(res.msg)
      } else {
        ElMessage.error(res.msg)
      }
    },
  }, ////
  async mounted() {
    this.find_list_model_product()
  },
}
</script>
<style scoped></style>
