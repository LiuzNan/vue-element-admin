let routes = [
  {
    redirect: {name: 'index'},
    component: 'layout',
    children: [
      {
        meta: {title: '首页'},
        component: 'index/index'
      },
      {
        meta: {title: '商品列表'},
        component: 'shop/goods/list'
      },
      {
        meta: {title: '商品分类'},
        component: 'shop/goods/type'
      }
    ]
  },
  {
    component: 'login/index'
  },
  {
    path: '*',
    redirect: {name: 'index'},
  }
]

// 获取路由信息方法
let getRoutes = function () {
  // 自动生成路由
  createRoute(routes)
  return routes
}

// 自动生成路由
function createRoute(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i].component) return
    // 去除index
    let val = getValue(arr[i].component)
    // 自动生成name
    arr[i].name = arr[i].name || val.replace(/\//g, '_')
    // 自动生成path
    arr[i].path = arr[i].path || `/${val}`
    // 自动生成component
    let componentFun = import(`../../views/${arr[i].component}.vue`)
    arr[i].component = () => componentFun
    if (arr[i].children && arr[i].children.length > 0) {
      createRoute(arr[i].children)
    }

  }
}

// 去除index
function getValue(str) {
  // 获取最后一个 / 的index
  let index = str.lastIndexOf('/')
  // 获取最后一个 / 后面的值
  let val = str.substring(index + 1, str.length)
  // 判断是不是index结尾
  if (val === 'index') {
    return str.substring(index, -1)
  }
  return str
}

export default getRoutes()
