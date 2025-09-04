export const STORE = {
  // 用户
  user_id: 1,

  // 商品
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
}
