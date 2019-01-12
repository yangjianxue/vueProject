<template>
	<div class="wrapCon">
		{{msg}}
		<div class="wrapMain">
			<ul class="dataUl">
				<li v-for="(item,index) in initArr">
					<span>{{item.id}}</span>
					<span>{{item.info}}</span>
				</li>
			</ul>
			<pagination @getData="getShowData($event)" :options="options"></pagination>
		</div>
		<div class="test">测试文案 hello wold</div>
		<div class="test">asdfasdfasdfasdfasdfasdfasdfad</div>
	</div>
</template>
<script>
	import test from '../components/testA'
	import pagination from '../components/pagination'
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
					totalData:[
						{id:'01',info:'第1条数据'},
						{id:'02',info:'第2条数据'},
						{id:'03',info:'第3条数据'},
						{id:'04',info:'第4条数据'},
						{id:'05',info:'第5条数据'},
						{id:'06',info:'第6条数据'},
						{id:'07',info:'第7条数据'},
						{id:'08',info:'第8条数据'},
						{id:'09',info:'第9条数据'},
						{id:'10',info:'第10条数据'},
						{id:'11',info:'第11条数据'},
						{id:'12',info:'第12条数据'},
						{id:'13',info:'第13条数据'},
						{id:'14',info:'第14条数据'},
						{id:'15',info:'第15条数据'},
						{id:'16',info:'第16条数据'},
						{id:'17',info:'第17条数据'},
						{id:'18',info:'第18条数据'},
						{id:'19',info:'第19条数据'},
						{id:'20',info:'第20条数据'},
						{id:'21',info:'第21条数据'},
						{id:'22',info:'第22条数据'},
						{id:'23',info:'第23条数据'},
						{id:'24',info:'第24条数据'},
						{id:'25',info:'第25条数据'},
						{id:'26',info:'第26条数据'},
						{id:'27',info:'第27条数据'},
						{id:'28',info:'第28条数据'},
						{id:'29',info:'第29条数据'},
						{id:'30',info:'第30条数据'},
						{id:'31',info:'第31条数据'},
						{id:'32',info:'第32条数据'},
						{id:'33',info:'第33条数据'},
						{id:'34',info:'第34条数据'},
						{id:'35',info:'第35条数据'},
						{id:'29',info:'第36条数据'},
						{id:'30',info:'第37条数据'},
						{id:'31',info:'第38条数据'}
					],
					//每页默认展示的条数
					pageSize:5,
					//默认展示多少页
					shouPage:5,
					//当前展示第几页
					currIndex:3

				}
			}
		},
		methods:{
			getShowData(data){
				this.initArr = data
			}
		},
		components:{
			test,
			pagination
		},
		mounted(){
		}
	}
</script>
<style lang="less" scoped>
	.test{
		width:100px;
		height:100px;
		border:1px solid #f00;
		word-wrap:break-word;
		background:-webkit-linear-gradient(left, red , blue);
		color:#fff;
	}
	.test:hover{
		transform:scale(2);
		background:#f00;
		transition:all 3s linear;
	}
	.mb_20{margin-bottom:20px;}
	.wrapCon{
		.wrapMain{
			.dataUl{
				padding-left:20px;
				padding-right:20px;
				border-top:1px solid #eee;
				border-bottom:1px solid #eee;
				margin-bottom:100px;
				li{
					border-bottom:1px solid #eee;
					&:last-child{
						border-bottom:none;
					}
					span{
						font:22px/60px microsoft yahei;
						color:#333;
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