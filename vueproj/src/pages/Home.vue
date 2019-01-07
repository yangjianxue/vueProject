<template>
	<div>
		<img src="../assets/logo.png"/>
		<div class="scrollWrap">
			<ul @click = "handleScroll">
				<li v-for="(categoryLi,index) in categoryArr">{{categoryLi.name}}</li>
			</ul>
		</div>	
		
	</div>	
</template>
<script>
	export default{
		name:'home',
		data(){
			return{
				categoryArr:''
			}
		},
		methods:{
			getcategoryData(){
				this.$axios('http://elm.cangdu.org/shopping/v2/restaurant/category')
				.then(res => {
					console.log(res.data)
					this.categoryArr = res.data
				})
				.then(err =>{
					console.log(err)
				})
			},
			handleScroll(){
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				if(scrollTop<200){
				 /*this.getcategoryData();*/
				}
  				
			}
		}
	}
</script>
<style scoped lang='less'>
/*http://elm.cangdu.org/shopping/v2/restaurant/category*/
*{margin:0;padding:0}
.scrollWrap{
	width:100%;
	background:#abcdef;
	ul{
		list-style:none;
		li{
			width:100%;
			font:0.36rem/0.48rem microsoft yahei;
			margin-top:0.2rem;
			background:#eee;
			color:#333;
		}
	}
}
img{
	width:100%;
	margin:0 auto;
}
</style>

