export default {
  logo: 'ADMIN',
  navBar: {
    active: '0',
    list: [
      {
        name: '首页',
        subActive: '0',
        subMenu: [
          {
            icon: 'el-icon-s-home',
            name: '首页',
            pathname: 'index'
          },
          {
            icon: 'el-icon-s-goods',
            name: '商品列表',
            pathname: 'shop_goods_list'
          }
        ]
      },
      {
        name: '商品',
        subActive: '0',
        subMenu: [
          {
            icon: 'el-icon-s-goods',
            name: '商品分类',
            pathname: 'shop_goods_type'
          }
        ]
      },
      {name: '订单'},
      {name: '会员'},
      {name: '设置'}
    ]
  }
}
