<template>
  <div id="app">
   
    <router-view/>
    <div class="footer row bt row-center">
	    <router-link to="/index" class="col">首页</router-link>
	    <router-link to="/category" class="col">分类</router-link>
	   																								<!--vuex 第11 应用 store 里面goodsCount	-->
	    <router-link to="/cart" class="col">购物车  <badge :text="goodsCount"></badge> </router-link>
	    <router-link to="/user" class="col">用户中心</router-link>
    </div>
  </div>
</template>

<script>
// 									vux是一个基于weui的前端vue框架
import {Badge} from 'vux'
import {mapGetters} from 'vuex'
export default {
  name: 'app',
  components:{
  	Badge,
  },
  created(){
  	
  	this.$http.get("/v1/cart/index")
		.then(function(res){
			console.log("购物车",res.data);
//			this.goodsList=res.data.data.items;
			// 数据放入到 vuex goodslist 
//			if(!this.goodslist.length){			
			this.$store.commit("initCart",res.data.data.items)
//			}
			// 触发 vuex 里面 mutations  initCart 函数
		})
  },
  computed:{
  	...mapGetters(["goodsCount"])
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
 
}
</style>
