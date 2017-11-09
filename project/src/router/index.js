import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'   // @代表src 文件夹
// 配置路由需要先把路由需要的组件导入
import indexPage from '@/page/index'
import categoryPage from '@/page/category'
import cartPage from '@/page/cart'
import userPage from '@/page/user'
import producePage from '@/page/produce'
import pDetail from "@/page/produce/detail"
import pComent from "@/page/produce/coment"
import pArg from "@/page/produce/arg"
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/hello',							//路由的路径
      name: 'Hello',					// 路由的名字
      component: HelloWorld		// 路由的对应的组件
    },
    {
      path: '/',							//路由的路径
      redirect:"/index"
    },
     {
      path: '/index',							//路由的路径
      name: 'index',					// 路由的名字
      component: indexPage,		// 路由的对应的组件
      alias:"/home"
    },
     {
      path: '/category',							//路由的路径
      name: 'category',					// 路由的名字
      component: categoryPage		// 路由的对应的组件
    },
     {
      path: '/cart',							//路由的路径
      name: 'cart',					// 路由的名字
      component: cartPage		// 路由的对应的组件
    },
     {
      path: '/user',							//路由的路径
      name: 'user',					// 路由的名字
      component: userPage		// 路由的对应的组件
    },
    {path:"/produce/:id",
     name:"produce",
     component:producePage,
     /*children:[
       {path:"",redirect:"detail"},
	     {path:"detail",component:pDetail},
	     {path:"coment",component:pComent},
	     {path:"arg",component:pArg}    	
     ]*/
    }
     
     
  ]
})
