<template>
  <h3 style="padding: 0; margin: 0">路由:{{ route.name }}</h3>

  <main style="display: flex; gap: 10px">
    <!-- 列表 -->
    <nav style="border: 1px solid #000">
      <el-button size="small" @click="find_list_model_product()" type="primary"> find_list_model_product </el-button>
      <el-button size="small" @click="show_add_product_modal = true" type="primary"> show_add_product_modal </el-button>

      <ul style="max-height: 500px; overflow-y: auto; padding-right: 10px">
        <li v-for="(item, index) in list_model_product" :key="item.id">
          <el-card shadow="hover" style="width: 400px" @click="selected_model_product = item">
            <nav style="display: flex; gap: 10px">
              <img :src="item.list_img.length > 0 ? item.list_img[0].url : ''" style="width: 100px; height: 100px" />
              <div>
                <div class="css_form" style="width: 200px">
                  <span>title</span>
                  <div>{{ item.title }}</div>
                </div>
              </div>
            </nav>
            <el-button size="small" @click=";(show_info_modal = true), (selected_model_product = item)" type="primary"> show_info_modal </el-button>
            <el-button size="small" @click="save_model_card()" type="primary"> save_model_card </el-button>
            <el-button size="small" @click="delete_model_product(selected_model_product.id)" type="primary"> delete_model_product </el-button>
          </el-card>
        </li>
      </ul>

      <el-dialog title="show_info_modal" width="500px" v-model="show_info_modal" :close-on-click-modal="false">
        <nav style="max-height: 500px; overflow-y: auto; padding-right: 10px">
          <li class="css_form">
            <h4>模型标题</h4>
            <el-input v-model="selected_model_product.title"></el-input>
          </li>
          <li class="css_form">
            <h4>模型格式</h4>
            <el-input v-model="selected_model_product.model_format"></el-input>
          </li>
          <li class="css_form">
            <h4>模型描述</h4>
            <el-input v-model="selected_model_product.remark"></el-input>
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
            <el-input v-model="selected_model_product.price_personal"></el-input>
          </li>
          <li class="css_form">
            <h4>企业价格</h4>
            <el-input v-model="selected_model_product.price_company"></el-input>
          </li>
          <li class="css_form">
            <h4>企业扩展价格</h4>
            <el-input v-model="selected_model_product.price_extend"></el-input>
          </li>
          <li class="css_form">
            <h4>模型格式</h4>
            <el-input v-model="selected_model_product.model_format"></el-input>
          </li>
          <li class="css_form">
            <h4>收藏数量</h4>
            <el-input v-model="selected_model_product.count_collect"></el-input>
          </li>
          <li class="css_form">
            <h4>布线</h4>
            <el-input v-model="selected_model_product.wiring"></el-input>
          </li>
          <li class="css_form">
            <h4>面积单位</h4>
            <el-input v-model="selected_model_product.area_unit"></el-input>
          </li>
          <li class="css_form">
            <h4>种类</h4>
            <el-input v-model="selected_model_product.kind_ids"></el-input>
          </li>
          <li class="css_form">
            <h4>是否公开</h4>
            <el-switch v-model="selected_model_product.is_public"></el-switch>
          </li>
          <li class="css_form">
            <h4>是否删除</h4>
            <el-switch v-model="selected_model_product.is_deleted"></el-switch>
          </li>
          <li class="css_form">
            <h4>是否审核</h4>
            <el-switch v-model="selected_model_product.is_check"></el-switch>
          </li>
          <li class="css_form">
            <h4>是否商用</h4>
            <el-switch v-model="selected_model_product.is_business"></el-switch>
          </li>
          <li class="css_form">
            <h4>是否骨骼</h4>
            <el-switch v-model="selected_model_product.is_skeleton"></el-switch>
          </li>
          <li class="css_form">
            <h4>是否动画</h4>
            <el-switch v-model="selected_model_product.is_animation"></el-switch>
          </li>
          <li class="css_form">
            <h4>是否打印</h4>
            <el-switch v-model="selected_model_product.is_print"></el-switch>
          </li>
          <li class="css_form">
            <h4>是否未塌陷</h4>
            <el-switch v-model="selected_model_product.is_no_collapse"></el-switch>
          </li>
          <li class="css_form">
            <h4>是否没有塌陷</h4>
            <el-switch v-model="selected_model_product.is_no_collapse"></el-switch>
          </li>
        </nav>

        <el-button size="small" @click="save_model_product()" type="primary"> save_model_product </el-button>
      </el-dialog>
    </nav>

    <!-- 购物车 -->
    <nav style="border: 1px solid #000">
      <el-button size="small" @click="find_list_model_card()" type="primary"> find_list_model_card </el-button>
      <el-button size="small" @click="create_order_from_cart()" type="primary"> create_order_from_cart </el-button>

      <ul>
        <li v-for="(item, index) in list_model_card" :key="item.id">
          <el-card shadow="hover" style="width: 400px">
            <div>{{ item.id }}</div>
            <el-button size="small" @click="delete_model_card(item.id)" type="primary"> delete_model_card </el-button>
            <el-button size="small" @click=";(show_cart_json_modal = true), (selected_cart_json = item)" type="primary"> selected_cart_json </el-button>
          </el-card>
        </li>
      </ul>

      <el-dialog title="添加3D模型" width="500px" v-model="show_cart_json_modal" :close-on-click-modal="false">
        <el-input :value="JSON.stringify(selected_cart_json, null, 2)" type="textarea" :rows="20" readonly></el-input>
      </el-dialog>
    </nav>

    <!-- 订单 -->
    <nav style="border: 1px solid #000">
      <el-button size="small" @click="find_list_model_order()" type="primary"> find_list_model_order </el-button>
      <ul>
        <li v-for="(item, index) in list_model_order" :key="item.id">
          <el-card shadow="hover" style="width: 400px">
            <div>{{ item.id }}</div>
            <el-button size="small" @click=";(show_order_detail_modal = true), (selected_order = item)" type="primary"> show_order_detail_modal </el-button>
          </el-card>
        </li>
      </ul>

      <el-dialog title="show_order_detail_modal" v-model="show_order_detail_modal" width="500px" :close-on-click-modal="false">
        <el-input :value="JSON.stringify(selected_order, null, 2)" type="textarea" :rows="20" readonly></el-input>
      </el-dialog>
    </nav>

    <!-- 编辑 -->
    <el-dialog title="show_info_modal" width="500px" v-model="show_info_modal" :close-on-click-modal="false">
      <nav style="max-height: 500px; overflow-y: auto; padding-right: 10px">
        <li class="css_form">
          <h4>模型标题</h4>
          <el-input v-model="selected_model_product.title"></el-input>
        </li>
        <li class="css_form">
          <h4>模型格式</h4>
          <el-input v-model="selected_model_product.model_format"></el-input>
        </li>
        <li class="css_form">
          <h4>模型描述</h4>
          <el-input v-model="selected_model_product.remark"></el-input>
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
          <el-input v-model="selected_model_product.price_personal"></el-input>
        </li>
        <li class="css_form">
          <h4>企业价格</h4>
          <el-input v-model="selected_model_product.price_company"></el-input>
        </li>
        <li class="css_form">
          <h4>企业扩展价格</h4>
          <el-input v-model="selected_model_product.price_extend"></el-input>
        </li>
        <li class="css_form">
          <h4>模型格式</h4>
          <el-input v-model="selected_model_product.model_format"></el-input>
        </li>
        <li class="css_form">
          <h4>收藏数量</h4>
          <el-input v-model="selected_model_product.count_collect"></el-input>
        </li>
        <li class="css_form">
          <h4>布线</h4>
          <el-input v-model="selected_model_product.wiring"></el-input>
        </li>
        <li class="css_form">
          <h4>面积单位</h4>
          <el-input v-model="selected_model_product.area_unit"></el-input>
        </li>
        <li class="css_form">
          <h4>种类</h4>
          <el-input v-model="selected_model_product.kind_ids"></el-input>
        </li>
        <li class="css_form">
          <h4>是否公开</h4>
          <el-switch v-model="selected_model_product.is_public"></el-switch>
        </li>
        <li class="css_form">
          <h4>是否删除</h4>
          <el-switch v-model="selected_model_product.is_deleted"></el-switch>
        </li>
        <li class="css_form">
          <h4>是否审核</h4>
          <el-switch v-model="selected_model_product.is_check"></el-switch>
        </li>
        <li class="css_form">
          <h4>是否商用</h4>
          <el-switch v-model="selected_model_product.is_business"></el-switch>
        </li>
        <li class="css_form">
          <h4>是否骨骼</h4>
          <el-switch v-model="selected_model_product.is_skeleton"></el-switch>
        </li>
        <li class="css_form">
          <h4>是否动画</h4>
          <el-switch v-model="selected_model_product.is_animation"></el-switch>
        </li>
        <li class="css_form">
          <h4>是否打印</h4>
          <el-switch v-model="selected_model_product.is_print"></el-switch>
        </li>
        <li class="css_form">
          <h4>是否未塌陷</h4>
          <el-switch v-model="selected_model_product.is_no_collapse"></el-switch>
        </li>
        <li class="css_form">
          <h4>是否没有塌陷</h4>
          <el-switch v-model="selected_model_product.is_no_collapse"></el-switch>
        </li>
      </nav>

      <el-button size="small" @click="save_model_product()" type="primary"> save_model_product </el-button>
    </el-dialog>

    <!-- 添加3D模型弹窗 -->
    <el-dialog title="添加3D模型" width="500px" v-model="show_add_product_modal" :close-on-click-modal="false">
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

        <li class="css_form">
          <h4>图片</h4>
          <el-input v-model="form_save.list_img[0].url"></el-input>
        </li>

        <li class="css_form">
          <h4>文件</h4>
          <el-input v-model="form_save.list_file[0].url"></el-input>
        </li>

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
          <h4>收藏数量</h4>
          <el-input v-model="form_save.count_collect"></el-input>
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
          <h4>是否审核</h4>
          <el-switch v-model="form_save.is_check"></el-switch>
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
  </main>
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
      user_id: 1,
      list_model_product: [] as any[],
      selected_model_product: {} as any,
      show_info_modal: false as boolean,

      // 购物车
      list_model_card: [] as any[],
      show_cart_json_modal: false as boolean,
      selected_cart_json: {} as any,

      // 订单
      list_model_order: [] as any[],
      show_order_detail_modal: false as boolean,
      selected_order: {} as any,

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
        kind_ids: [],
        title: '标题',
        remark: '描述',
        is_public: true,
        is_deleted: false,
        is_check: true,
        is_business: true,
        is_skeleton: true,
        is_animation: true,
        is_print: true,
        is_no_collapse: true,
        model_format: '.stl',
        count_collect: 0,
        wiring: '',
        area_unit: '',
        price_personal: 111,
        price_company: 1111,
        price_extend: 11111,

        list_img: [{ url: 'https://www.baidu.com/img/flexible/logo/pc/result.png', name: '' }],
        list_file: [{ url: 'https://www.baidu.com/img/flexible/logo/pc/result.png', name: '' }],
        list_video: [],
        list_extend: [],
        list_texture: [],
      },

      // show_add_product_modal
      show_add_product_modal: false as boolean,
    }
  }, ////
  methods: {
    async find_list_model_product() {
      const res: any = await axios_api.post('/find_list_model_product', this.form_find)
      console.log('find_list_model_product---res:', res)
      if (res.code === 200) {
        this.list_model_product = res.result.list

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
      } else {
        ElMessage.error(res.msg)
      }
    },

    async save_model_card() {
      const form = {
        user_id: this.user_id,
        product_id: this.selected_model_product.id,
        price: this.selected_model_product.price_personal,
        price_type: 'price_personal',
      }

      const res: any = await axios_api.post('/save_model_card', form)
      console.log('save_model_card---res:', res)
      if (res.code === 200) {
        ElMessage.success(res.msg)
        // this.find_list_model_card()
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

    async find_list_model_card() {
      const form = {
        user_id: this.user_id,
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
        // window.list_model_card = this.list_model_card
      } else {
        ElMessage.error(res.msg)
      }
    },

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

    async create_order_from_cart() {
      let form = { user_id: this.user_id, price_sub: 0 }
      const res: any = await axios_api.post('/create_order_from_cart', form)
      console.log('create_order_from_cart---res:', res)
      if (res.code === 200) {
        ElMessage.success(res.msg)
      } else {
        ElMessage.error(res.msg)
      }
    },

    async find_list_model_order() {
      let form = {
        user_id: this.user_id, //
        order_number: '',
        status: '',
        page_index: 1,
        page_size: 10,
        order_by: 'created_at',
        order_type: 'desc',
      }

      const res: any = await axios_api.post('/find_list_model_order', form)
      console.log('find_list_model_order---res:', res)
      if (res.code === 200) {
        ElMessage.success(res.msg)
        this.list_model_order = res.result.list
        // window.list_model_order = this.list_model_order
      } else {
        ElMessage.error(res.msg)
      }
    },
  }, ////
  async mounted() {},
}
</script>
<style scoped></style>
