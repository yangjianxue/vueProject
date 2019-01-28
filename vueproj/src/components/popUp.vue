<template>
	<div class="popupWrap" v-if="popOpt.isShow">
		<div class="popupLayer">
			<div class="headerWrap">
				<span>{{popOpt.title}}</span>
				<span class="closeEl" @click="handleClose">×</span>
			</div>
			<div class="bodyWrap">
				<slot name="mainCon"></slot>
				<p class="btnWrap">
					<span class="cancelBtn mr_20" @click="handleClose" v-if="!popOpt.onlyConfirmBtn">取消</span>
					<span class="confirmBtn" @click="handleConfirm">确定</span>
				</p>
			</div>
		</div>
		<div class="shelterLayer"></div>
	</div>
</template>
<script>
	export default{
		name:'popup',
		data(){
			return{
				popOpt:this.popupOpt
			}
		},
		props:{
			popupOpt:Object,
			default(){
				return{
					title:'提示信息', //标题信息
					isShow:false,    //是否展示弹窗
					onlyConfirmBtn:false,  //是否只展示确定按钮（默认展示两个按钮）
				}
			},
			require:true
		},
		methods:{
			handleClose(){
				this.popOpt.isShow = false;
			},
			handleConfirm(){
				this.$emit('confirmCallBack',undefined)
				this.handleClose()
			}
		}
	}
</script>
<style scoped lang="less">
	.mr_20{margin-right:20px;}
	.popupWrap{
		position:fixed;
		top:0;
		left:0;
		width:100%;
		height:100%;
	    color: #2e2c2d;
	    font-size: 16px;
		.popupLayer{
			position:absolute;
			top:50%;
			left:50%;
			width:600px;
			transform:translate(-50%,-50%);
			font:20px/20px microsoft yahei;
			color:#333;
			z-index:202;
			border-radius:10px;
			.headerWrap{
				padding:0 10px;
				font:bold 16px/28px microsoft yahei;
				color:#fff;
				background:#fa788a;
				border-radius:10px 10px 0 0;
				display:flex;
				justify-content:space-between;
				.closeEl{
					display:inline-block;
					font:20px/28px microsoft yahei;
					cursor:pointer;
				}
			}
			.bodyWrap{
				min-height:80px;
				background:#fff;
				.btnWrap{
					padding-bottom:20px;
					display:flex;
					justify-content:center;
					span{
						display:inline-block;
						width:60px;
						height:28px;
						font:14px/28px microsoft yahei;
						text-align:center;
						cursor:pointer;
						box-sizing:border-box;
						border-radius:4px;
					}
					.cancelBtn{
						border:1px solid #fa788a;
					}
					.confirmBtn{
						background:#fa788a;
					}
				}
			}
		}
		.shelterLayer{
			position:absolute;
			top:0;
			left:0;
			z-index:200;
			width:100%;
			height:100%;
			background:rgba(0,0,0,.6)
		}
	}
	
</style>