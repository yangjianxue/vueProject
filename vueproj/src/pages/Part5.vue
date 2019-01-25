<template>
	<div class="wrapMain">
		<p class="wrapRow mb_20">
			<label class="title">姓名</label>
			<input type="text" v-model="listName" v-focus ref="listName"/>
		</p>
		<p class="wrapRow">
			<label class="title">留言</label>
			<textarea name="" id="" v-model="listSenten" ref="listSenten"></textarea>
		</p>
		<p class="numWrap mb_20"><span>{{listSenten.length}}</span>/{{totleNum}}</p>
		<p class="wrapRow ta_r">
			<button @click="handleSubmit" class="btn">提交</button>
		</p>
		<div class="btnWrap">
			<input type="radio" id="checkAll" name="checkBtn" @click="handleCheckAll"><label for="checkAll">{{checkTip}}</label>
			<input type="radio" id="checkOther" name="checkBtn" @click="handleCheckOther"><label for="checkOther">反选</label>
			<label for="" @click="removeChecked">删除</label>
		</div>
		<ul class="wrapCon">
			<li v-for="(randomData,index) in randomDatas.list" class="clearfix" :key="index">
				<div class="listCon pos-r">
					<input type="checkbox" v-model="randomData.isChecked" />
					<span class="sentenName">{{ randomData.name }}</span>
					<span> : {{ randomData.sentence }}</span>
					<span class="removeItem dp_i" @click="removeItem(index)">×</span>
				</div>
				<p class="mutuWrap" @click="countAdd(randomData)">{{randomData.isZan}}<em :class="{'zanIcon zanGrey' :!randomData.isZan,'zanIcon zanLight': randomData.isZan}"></em>：{{randomData.zanCount}}</p>
			</li>
		</ul>
		<Popup :popupOpt="popOpt" @confirmCallBack="popCallBack">
			<div class="mainWrap" slot="mainCon">{{popTip}}</div>
		</Popup>
	</div>
</template>
<script>
	import Mock from 'mockjs';
	import Popup from '../components/popUp'
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
				curSen:'',
				checkTip:'全选',
				isCheckedAll:"",
				totleNum:1000,
				popOpt:{
					title:'提示信息',
					isShow:false,
					onlyConfirmBtn:true
				},
				popTip:''
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
					'isChecked|0':true
				}]
			})
		},
		components:{
			Popup
		},
		methods:{
			//点赞
			countAdd(item){
				if(!item.isZan){
					item.zanCount++;
					item.isZan = true;
				}else{
					item.zanCount
				}
			},
			//姓名输入框获取焦点
			nameInputHasFocus(){
				this.$nextTick(()=>{
					if(this.listName){
						this.$refs.listSenten.focus()
					}else{
						this.$refs.listName.focus()
					}
				})
			},
			//提交评论
			handleSubmit(){
				if(this.listName == '' || this.listSenten == ''){
					this.popTip = '请输入姓名和留言'
					this.popOpt.isShow = true;
				}else if(this.curName == this.listName && this.curSen == this.listSenten){
					this.popTip = '请勿重复提交'
					this.popOpt.isShow = true;
				}else{
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
					this.nameInputHasFocus()
				}
			},
			//删除评论
			removeItem(i){
				this.randomDatas.list.splice(i,1)
			},
			//全选
			handleCheckAll(){
				if(this.checkTip == '全选'){
					this.randomDatas.list.forEach((value,index)=>{
						value.isChecked = true
					})
					this.checkTip = '全不选'
				}else{
					this.randomDatas.list.forEach((value,index)=>{
						value.isChecked = false
					})
					this.checkTip = '全选'
				}
				
			},
			//反选
			handleCheckOther(){
				this.randomDatas.list.forEach((value,index)=>{
					value.isChecked = !value.isChecked
				})
			},
			//删除选中项
			removeChecked(){
				this.randomDatas.list = this.randomDatas.list.filter((value,index)=>{
					return value.isChecked == false
				})
			},
			//弹窗确定事件的回调
			popCallBack(){
				this.nameInputHasFocus()
			}
		},
		watch:{
			listSenten:function(n,o){
				if(n.length >= this.totleNum){
					this.listSenten = n.substr(0,this.totleNum)
				}
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
	.mb_20{margin-bottom:20px;}
	.wrapMain{
		width:80%;
		margin:20px auto auto;
		font-size:0;
		.wrapRow{
			display:flex;
			flex-direction:row;
			justify-content:center;
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
				font:14px/22px microsoft yahei;
				border:1px solid #999;
				height:28px;
				line-height:28px;
			}
			textarea{
				flex:1;
				margin-left:10px;
				padding:0 4px;
				height:266px;
				font:14px/22px microsoft yahei;
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
		.numWrap{
			font:14px/18px microsoft yahei;
			text-align:right;
			span{
				font:14px/18px microsoft yahei;
				color:#f44b3b
			}
		}
		.btnWrap{
			label{
				margin-right:20px;
				font:14px/18px microsoft yahei;
				vertical-align:super;	
			}
			
		}
		.wrapCon{
			padding-bottom:100px;
			li{
				font:14px/18px microsoft yahei;
				.listCon{
					margin-top:10px;
					padding:10px 20px 10px 10px;
					background:#eaeaec;
					color:#333;
					border-top:1px solid #eaeaec;
					.chebtn{
						border:1px solid #f00;
					}
					.sentenName{
						font:bold 14px/18px microsoft yahei;
						color:#eb7350;
						vertical-align:text-bottom;
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
		.mainWrap{
			padding:30px 0;
			font:14px/20px microsoft yahei;
			color:#333;
			text-align:center;
		}
	}
</style>