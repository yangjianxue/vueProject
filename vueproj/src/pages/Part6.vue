<template>
	<div class="wrapCon">
		<!-- {{msg}} -->
		<div class="wrapMain mt_20">
			<pagination @getData="getShowData($event)" :options="options" class="ml_20"></pagination>
			<ul class="dataUl">
				<li v-for="(item,index) in initArr">
					<span>{{item.name}}：</span>
					<ul class="clearfix">
						<li v-for="(v,i) in item.sub_categories">{{v.name}}</li>
					</ul>
				</li>
			</ul>
			
		</div>
	</div>
</template>
<script>
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
					pageSize:1,
					//默认展示多少页
					shouPage:3,
					//当前展示第几页
					currIndex:1
				}
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
			pagination
		},
		mounted(){
			return new Promise((resolve,reject) =>{
				this.getCategoryData().then(() =>{
					this.options.totalData = this.categoryData.data
					resolve(this.options.totalData)
				})
			})
			//在当前组件中直接异步获取数据（更简洁，但是数据不能和其他组件共享）
			// this.$axios.get('/elm/v2/index_entry')
			// .then(data => {
			// 	this.options.totalData = data.data
			// })
		},
		created(){
			//配合vuex中 -mapState -mapActive 从vuexstore中获取数据（其他组件也可以通过这种方式访问到而不需要重复发送请求，只需要在vuex中请求一次即可）
			// return new Promise((resolve,reject) =>{
			// 	this.getCategoryData().then(() =>{
			// 		this.options.totalData = this.categoryData.data
			// 		console.log(this.options.totalData)
			// 		resolve(this.options.totalData)
			// 	})
			// })
			
		}
	}
</script>
<style lang="less" scoped>
	.mt_20{margin-top:20px;}
	.mb_20{margin-bottom:20px;}
	.ml_20{margin-left:20px;}
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