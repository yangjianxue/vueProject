<template>
	<div class="retTop" @click="returnBack">返回<br/>顶部</div>
</template>
<script>
	export default{
		name:'returnTop',
		data(){
			return{
				msg:'返回顶部',
				timer:'',
				key:true
			}
		},
		methods:{
			scrollTopHandle(){
				window.scrollTo(0,0)
				clearInterval(this.timer)
				this.key = true;
			},
			returnBack(){
				if(this.key){
					this.timer = setInterval(this.scrollTopHandle,10)
				}
				
			}
		}
	}
</script>
<style scoped lang="less"> 
	.retTop{
		position:fixed;
		bottom:60px;
		right:30px;
		padding-top:6px;
		width:40px;
		height:40px;
		font:12px/14px microsoft yahei;
		color:#fff;
		background:#fa788a;
		text-align:center;
		border-radius:4px;
		cursor:pointer;
	}
</style>