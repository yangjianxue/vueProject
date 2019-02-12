<template>
	<div class="tabWrap ml_20 mt_20 mr_20">
		<div class="tabOptWrap">
			<div class="tabOpt" v-for="(tab,index) in tabs" :class="{active:index == curIndex}" @click="handleTab(index)">{{tab}}</div>
		</div>
		<div class="tabPageWrap">
			<div class="tabPage" v-for="(page,i) in pages" v-show="i == curIndex">
				<ul class="restaurantUl" v-if="page.options">
					<li v-for="list in page.foodData">
						<img v-if="'https://fuss10.elemecdn.com'+list.image_url" :src="'https://fuss10.elemecdn.com'+list.image_url" :onerror="defaultImg">
						<div>
							<p class="title">{{list.title}}</p>
							<p class="desc">{{list.description}}</p>
						</div>
					</li>
				</ul>
				<pagination @getData="getFoodData($event)" :options="page.options" class="mt_20" v-if="page.options"></pagination>
			</div>
		</div>
	</div>
</template>
<script>
	import pagination from '../components/pagination'
	export default{
		name:'part7',
		data(){
			return{
				msg:'测试',
				curIndex:0,
				tabs:['标题一','标题二','标题三'],
				pages:[
					{
						'title':'我是第一页',
						foodData:[],
						options:{
							totalData:[],
							pageSize:5,
							shouPage:3,
							currIndex:1
						}
					},
					{
						'title':'我是第二页'
					},
					{
						'title':'我是第三页'
					}
				],
				defaultImg:'this.src = " ' + require("../assets/img/default.jpg")+' "',
				
			}
		},
		methods:{
			handleTab(i){
				this.curIndex = i
			},
			getFoodData(data){
				// this.foodData = data
				this.pages[0].foodData = data
			}
		},
		components:{
			pagination
		},
		mounted(){
			// https://elm.cangdu.org/v2/index_entry
			this.$axios('/elm/v2/index_entry')
				.then((res) =>{
					this.pages[0].options.totalData = res.data
					//img:https://fuss10.elemecdn.com/0/da/f42235e6929a5cb0e7013115ce78djpeg.jpeg
					//img:https://elm.cangdu.org/img/
				})
		}
	}
</script>
<style scoped lang="less">
	.mt_20{margin-top:20px;}
	.ml_20{margin-left:20px;}
	.mr_20{margin-right:20px;}
	.tabWrap{
		.tabOptWrap{
			display:flex;
			flex-direction:row;
			justify-content:flex-start;
			align-items:center;
			.tabOpt{
				margin-right:8px;
				width:160px;
				height:36px;
				border-radius: 6px 6px 0 0;
				font:bold 14px/36px microsoft yahei;
				text-align:center;
				color:#333;
				cursor:pointer;
				&:hover{
					color:#f30213;
				}
				&.active{
					background:#f30213;
					color:#fff;
				}
			}
		}
		.tabPageWrap{
			.tabPage{
				width:100%;
				min-height:500px;
				.restaurantUl{
					li{
						display:flex;
						flex-direction:row;
						background:#fff;
						border-bottom:1px solid #eee;
						img{
							width:100px;
							height:100px;
							border-radius:50%;
						}
						.title{
							margin-top:20px;
							font:bold 16px/18px microsoft yahei;
							color:#333;
						}
						.desc{
							font:14px/18px microsoft yahei;
							color:#666;	
						}
					}
				}
			}
		}
	}
	
</style>