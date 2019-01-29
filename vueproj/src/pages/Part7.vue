<template>
	<div class="tabWrap ml_20 mt_20 mr_20">
		<div class="tabOptWrap">
			<div class="tabOpt" v-for="(tab,index) in tabs" :class="{active:index == curIndex}" @click="handleTab(index)">{{tab}}</div>
		</div>
		<div class="tabPageWrap">
			<div class="tabPage" v-for="(page,i) in pages" v-show="i == curIndex">{{page.title}}</div>
		</div>
	</div>
</template>
<script>
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
					},
					{
						'title':'我是第二页'
					},
					{
						'title':'我是第三页'
					}
				]
			}
		},
		methods:{
			handleTab(i){
				this.curIndex = i
			}
		},
		mounted(){
			this.$axios('/elm/shopping/v2/foods?offset=0&limit=20&restaurant_id=2')
				.then((res) =>{
					this.pages[0].foodData = res.data
					// console.log(res.data)
					//img:https://fuss10.elemecdn.com/0/da/f42235e6929a5cb0e7013115ce78djpeg.jpeg
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
				background:#eee;
			}
		}
	}
	
</style>