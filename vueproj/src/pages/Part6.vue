<template>
	<div class="wrapCon">
		{{msg}}
		<div class="wrapMain">
			<ul class="dataUl">
				<li v-for="(item,index) in initArr">
					<span>{{item.name}}：</span>
					<ul class="clearfix">
						<li v-for="(v,i) in item.sub_categories">{{v.name}}</li>
					</ul>
				</li>
			</ul>
			<pagination @getData="getShowData($event)" :options="options"></pagination>
		</div>
	</div>
</template>
<script>
	import test from '../components/testA'
	import pagination from '../components/pagination'
	import {mapState,mapActions} from 'vuex'
	export default{
		name:'part6',
		data(){
			return {
				msg:'测试数据展示',
				objData:{
					count:1
				},
				initArr:[],
				
				options:{
					//所有数据
					totalData:[],
					//每页默认展示的条数
					pageSize:5,
					//默认展示多少页
					shouPage:5,
					//当前展示第几页
					currIndex:3
				},
				datas:[]
			}
		},
		methods:{
			getShowData(data){
				this.initArr = data
			},
			...mapActions(['getCategoryData'])
		},
		computed:{
			...mapState({
				categoryData: state => state.categoryData
			})
		},
		components:{
			test,
			pagination
		},
		mounted(){
			
			//在当前组件中直接异步获取数据（更简洁，但是数据不能和其他组件共享）
			// this.$axios.get('/elm/v2/index_entry')
			// .then(data => {
			// 	this.options.totalData = data.data
			// })
		},
		created(){
			//配合vuex中 -mapState -mapActive 从vuexstore中获取数据（其他组件也可以通过这种方式访问到而不需要重复发送请求，只需要在vuex中请求一次即可）
			return new Promise((resolve,reject) =>{
				this.getCategoryData().then(() =>{
					this.options.totalData = this.categoryData.data
					// console.log(this.options.totalData)
					resolve()
				})
			})
			
		}
	}
</script>
<style lang="less" scoped>
	.mb_20{margin-bottom:20px;}
	.wrapCon{
		.wrapMain{
			.dataUl{
				
				padding-left:20px;
				padding-right:20px;
				border-top:1px solid #eee;
				border-bottom:1px solid #eee;
				margin-bottom:60px;
				li{
					border-bottom:1px dashed #eee;
					&:last-child{
						border-bottom:none;
					}
					span{
						font:22px/60px microsoft yahei;
						color:#333;
					}
					ul{
						li{
							width:21%;
							float:left;
							margin-bottom:4px;
							margin-right:1%;
							height:60px;
							border:none;
							text-align:center;
							font:18px/60px microsoft yahei;
							color:#fff;
							background:#abcdef;
							border-radius:8px;
						}
					}
				}
			}
			.paginationCon{
				display:inline-block;
				border:1px solid #eee;
				border-radius:4px;
				li{
					float:left;
					width:60px;
					font:16px/24px microsoft yahei;
					text-align:center;
					border-right:1px solid #eee;
					cursor:pointer;
					&:last-child{
						border-right:none;
					}
					&.btnIsActive,&.active{
						color:#fff;
						background:#fa788a
					}
					&:hover{
						color:#fa788a;
					}
				}
			}
		}
	}
</style>