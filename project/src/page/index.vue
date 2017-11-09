<template>
	<div id="home">
	<div class="header  bg-space row p10">
		<a href="/index" class="logo"><img width="100%" src="https://m.mi.com/component/header/img/logo_121d4a6.png" alt="" /></a>
		<div class="col pl10 pr10 search-box"><input type="text" class="pl5 pr5 search" /></div>
		<button class="button button-clear p10">登陆</button>
	</div>
	<div class="sub-header  bg-space row row-center">
		<div class="col">推荐</div>
		<div class="col">手机</div>
		<div class="col">智能</div>
		<div class="col">电视</div>
		<div class="col">电脑</div>
		<div class="col">周边生活</div>
	</div>
	<div class="content has-header has-footer has-sub-header">
	  
		<swiper :gallery="gallery"></swiper>
	</div>
	
	</div>
</template>

<script>
	import slider from "@/components/slider.vue"
	import swiper from "@/components/swiper.vue";
	export default {
		data(){
			return {
				data:{},
				gallery:[]
				
			}
		},
		created(){
			this.$http.post("https://m.mi.com/v1/home/page",
			{client_id:180100031051,
			channel_id:0,
			webp:1,
			recommend_tag:"Lte1Ec8Z8YYzubzf78Mp"
			})
			.then(res=>{
				console.log(res);
			this.data=res.data.data.data;
			this.gallery=this.data.sections[0].body.items;
			
				
			})
		},
		components:{
			slider,
			swiper,
		}
		
	}
</script>

<style>
.logo{ height:36px; width: 36px; display: inline-block; line-height: 36px;}
.header input.search{ height: 36px; line-height: 36px;  width: 100%; border:none;}
.search-box{ height: 43px;}
</style>