<template>
	<div id="category" class="row" v-if="category.length">		
		<div class="catL col-20"   >
			<div class="wrap" ref="catL" >
				<div class="content">
					<div 
						class="item text-center"  
						:class="{'current':index==currentIndex}"
						@click="scrollToE(index)"
						v-for="(item,index) in category">
						{{item.category_name}}
					</div>
				</div>
			</div>
		</div>
		<div class="catR col-80"   >	
			<div class="wrap" ref="catR">
				<div class="content">
				<!--第一层循环 大分类-->
				<div  v-for="cate in category" class="cate">					
					<!-- 第二层循环 category_list -->
					<div v-for="list in cate.category_list">						
						<!--第三层循环 items-->
						<div  v-if="list.view_type=='cells_auto_fill'">
							<a :href="'/produce/'+list.body.items[0].action.path" >
								<img :src="list.body.items[0].img_url" alt=""  width="100%" />
							</a>
						</div>
						<div class="text-center" v-if="list.view_type=='category_title'">
							-{{list.body.category_name}} -
							
						</div>
						<div class="row" v-if="list.view_type=='category_group'">
							<div class="col-33 text-center"  @click="changePage(item.action.path)"  v-for="item in list.body.items">
								<div class="img-border" height="53" width="40" >
									<a  >
										<img :src="item.img_url" width="100%" alt=""  />
										
									</a>
								</div>
								{{item.product_name}}
							</div>
						</div>
						
						<!--第三层循环 items-->
					</div>
					<!-- 第二层循环 category_listed -->
				</div>
				<!--第一层循环 大分类 ed-->
			</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	export default {
		data(){
			return {
				category:[],
				heightList:[],
				scrollY:0,
				cates:[]
				
			}
		},
		created(){
			this.$http.post("https://m.mi.com/v1/home/category_v2",{
				client_id:"180100031051",
				channel_id:"0",
				webp:"1"
			})
			.then(function(res){
				this.category = res.data.data;
				this.$nextTick(()=>{
					this.initScroll();
					this.getHeightList();
				})
//				在这里初始化最合适 但是要 nextTick
			})
		},
		mounted(){
			/*setTimeout(()=>{
				this.initScroll();
				this.getHeightList();
			},20)*/
			
		},
		updated(){
			
		},
		methods:{
			initScroll(){
				// document.querySelector(".catL")
				this.Lscroll = new BScroll(this.$refs.catL,{click:true});
				this.Rscroll = new BScroll(this.$refs.catR,{click: true,probeType: 3});
				this.Rscroll.on("scroll",(pos)=>{
					this.scrollY = Math.abs(Math.round(pos.y));
					// 2 拿到当前滚动的距离
					
				})
				
				
				
			},
			getHeightList(){
				this.heightList = []
				let h = 0;
				this.heightList.push(h);				
				let cates =document.querySelectorAll(".cate");
				this.cates=cates;				
				for(let i=0;i<cates.length;i++){
					h+=cates[i].offsetHeight;// 拿到每一个cate的高度
					this.heightList.push(h);
				}
				
				// 完成第一件事情拿到高度列表
			},
			scrollToE(num){
				this.Rscroll.scrollToElement(this.cates[num],300);
				this.scrollY = this.Rscroll.y;
			},
			changePage(url){
				console.log(url);
				this.$router.push({name:'produce',params:{id:url}})
			}
			
		},
		computed:{			
			// 当前滚动的距离是第几
			currentIndex(){	
			    for(let i=0;i<this.heightList.length;i++){
			    	let _h1 = this.heightList[i];
			    	let _h2 = this.heightList[i+1];
			    	if(!_h2||(this.scrollY>=_h1&&this.scrollY<_h2)){
			    		return i;
			    	}
			    }
			   return 0; // 默认返回0
			
			}
		}
		
	}
	// 1 所有的高度列表  0 600， 900， 500
	// 2 滚动的距离    0    500   700
	//           0     0    1
</script>

<style>
	.current{
		font-weight: 900;;
		color:#f30 ;
		
	}
	#category{
		position: absolute;
		left:0;
		right:0;
		top:0;
		bottom:49px;
		overflow: hidden;
		
	}
	#category .wrap{
		height: 100%;
		border:1px solid #f30;
	}
	.catL,.catR{
		height: 100%;
		border:1px solid green;
	}
	.img-border{ width: 53px; margin: 0 auto; position: relative;}
</style>