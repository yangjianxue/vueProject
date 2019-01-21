<template>
	<div class="wrapMain">
		<p class="wrapRow">
			<label class="title">姓名</label>
			<input type="text" v-model="listName" v-focus ref="listName"/>
		</p>
		<p class="wrapRow">
			<label class="title">留言</label>
			<textarea name="" id="" v-model="listSenten"></textarea>
		</p>
		<p class="wrapRow ta_r">
			<button @click="handleSubmit" class="btn">提交</button>
		</p>
		<ul class="wrapCon">
			<li v-for="(randomData,index) in randomDatas.list" class="clearfix" :key="index">
				<div class="listCon pos-r">
					<span class="sentenName">{{ randomData.name }}</span>
					<span> : {{ randomData.sentence }}</span>
					<span class="removeItem dp_i" @click="removeItem(index)">×</span>
				</div>
				<p class="mutuWrap" @click="countAdd(randomData)">{{randomData.isZan}}<em :class="{'zanIcon zanGrey' :!randomData.isZan,'zanIcon zanLight': randomData.isZan}"></em>：{{randomData.zanCount}}</p>
			</li>
		</ul>
	</div>
</template>
<script>
	import Mock from 'mockjs'
	export default{
		name:'part5',
		data(){
			return {
				msg:'评价',
				randomDatas:[],
				zanCount:0,
				listName:'',
				listSenten:'',
				curName:'',
				curSen:''
			}
		},
		created(){
			this.randomDatas = Mock.mock({
				'list|1-10':[{
					'id|+1' :1,
					'name':'@cname',
					'city':'@city(true)',
					'email':'@EMAIL',
					'sentence':'@cparagraph',
					'zanCount|1-100': 100,
					'isZan|1': true,
				}]
			})
		},
		methods:{
			countAdd(item){
				if(!item.isZan){
					item.zanCount++;
					item.isZan = true;
				}else{
					item.zanCount
				}
			},
			handleSubmit(){
				if(this.curName == this.listName && this.curSen == this.listSenten){
					alert('不可重复提交')
				}else{
					if(this.listName && this.listSenten){
						this.randomDatas.list.unshift({
							'id':0,
							'name':this.listName,
							'city':'北京',
							'email':'xxx',
							'sentence':this.listSenten,
							'zanCount':0,
							'isZan':false
						})
						this.curName = this.listName;
						this.curSen = this.listSenten;
						this.listName = "";
						this.listSenten = "";
						this.$nextTick(()=>{
							this.$refs.listName.focus()
						})
					}else{
						alert('请输入姓名和留言')
					}
				}
			},
			removeItem(i){
				this.randomDatas.list.splice(i,1)
			}
		},
		directives:{
			focus:{
				inserted:function(el){
					el.focus()
				}
			}
		}
	}
</script>
<style lang="less" scoped>
	.ml_20{margin-left:20px;}
	.wrapMain{
		width:80%;
		margin:20px auto auto;
		font-size:0;
		.wrapRow{
			display:flex;
			flex-direction:row;
			justify-content:center;
			margin-bottom:20px;
			.title{
				display:inline-block;
				font:20px/28px microsoft yahei;
				color:#666;
				vertical-align:bottom;
			}
			input{
				flex:1;
				margin-left:10px;
				padding:0 4px;
				border:1px solid #999;
				height:28px;
				line-height:28px;
				color:red;
			}
			textarea{
				flex:1;
				margin-left:10px;
				padding:0 4px;
				height:300px;
				border:1px solid #999;
				outline:none;
				resize:none;
			}
			.btn{
				float:right;
				padding:4px 10px;
				background:#abcdef;
				color:#fff;
				border-radius:5px;
			}
		}
		.wrapCon{
			padding-bottom:100px;
			li{
				font:14px/18px microsoft yahei;
			}
			.listCon{
				margin-top:10px;
				padding:10px 20px 10px 10px;
				background:#eaeaec;
				color:#333;
				border-top:1px solid #eaeaec;
				.sentenName{
					font:bold 14px/18px microsoft yahei;
					color:#eb7350
				}
				.removeItem{
					position:absolute;
					right:8px;
					top:8px;
					display:none;
					color:#f90;
					font-weight:bold;
					cursor:pointer;
				}
				&:hover .removeItem{
					display:inline-block;
				}
			}
			.mutuWrap{
				float:right;
				background:#fff;
				.zanIcon{
					display:inline-block;
					width:22px;
					height:22px;
					vertical-align:bottom;
				}
				.zanGrey{
					background:url(../assets/img/zanGrey.png) no-repeat center center;
					background-size:100%;
				}
				.zanLight{
					background:url(../assets/img/zanLight.png) no-repeat center center;
					background-size:100%;
				}
			}
		}
	}
</style>