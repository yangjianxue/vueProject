<template>
	<div class="errorWrap">
		<p class="wrap">
<pre>

啊哦，你所访问的页面不存在了，可能是炸了

可能的原因：

1.手抖打错了。

2.改页面暂时还木有。

</pre>
			
		</p>
		<div class="ta_c" @click="returnHome">返回上一级页面></div>
	</div>
</template>
<script>
	export default{
		name:'errorPage',
		methods:{
			returnHome(){
				history.back()
			},
		}
	}
</script>
<style scoped lang='less'>
	.errorWrap{
		margin-top:80px;
		display:flex;
		flex-direction:column;
		align-content:space-between;
		width:100%;
		height:100%;
		.wrap{
			flex:1;
			font:bold 28px/40px microsoft yahei;
			color:#333;
			text-align:center;
		}
		div{
			margin-bottom:100px;
			font:bold 28px/40px microsoft yahei;
			color:#333;
			cursor:pointer;
		}
	}
</style>