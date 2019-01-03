<template>
	<div class="scrollWrap clearfix" @mouseenter="removeTimer" @mouseleave="addTimer">
		<ul class="scrollUl">
			<!-- <li v-for="(item,index) of objImgComp" v-show="currIndex == index">{{item.textMsg}}</li> -->
			<li v-for="(item,index) of objImgComp" v-show="currIndex == index"><img :src="item.img"></li>
		</ul>
		<ul class="dotWrap">
			<li :class="{active:currIndex == index}" v-for="(item,index) of obj"></li>
		</ul>
		<div class="btn">
			<span class="leftBtn" @click='leftHandle'>&lt;</span>
			<span class="rightBtn" @click='rightHandle'>&gt;</span>
		</div>
	</div>
	
</template>
<script>
	export default{
		name:'animatedShow',
		data(){
			return{
				currIndex:0,
				objImg:{},
				timer:''
			}
		},
		props:['obj'],
		computed:{
			objImgComp(){
				return this.objImg = this.obj
			}
		},
		methods:{
			leftHandle(){
				this.currIndex--
				if(this.currIndex < 0){
					this.currIndex = this.objImg.length-1
				}
			},
			rightHandle(){
				this.currIndex++
				if(this.currIndex >= 4){
					this.currIndex = 0
				}
			},
			scrollBanner(){
				this.timer = setInterval(()=>{
					this.currIndex++
					if(this.currIndex >= 4){
						this.currIndex = 0
					}
				},5000)
			},
			removeTimer(){
				clearInterval(this.timer)
			},
			addTimer(){
				if(!this.timer){
					scrollBanner()
				}else{
					clearInterval(this.timer)
					this.scrollBanner()
				}
			}
		},
		created(){
			if(!this.timer){
				this.scrollBanner()
			}else{
				clearInterval(this.timer)
				this.scrollBanner()
			}
		}
	}
</script>
<style scoped>
.scrollWrap{
	position:relative;
	width:100%;
	height:300px;
	overflow:hidden;
}

.dotWrap{
	position: absolute;
	bottom:20px;
	left:50%;
	transform:translateX(-50%);
}
.dotWrap li{
	float:left;
	margin-right:4px;
	width:10px;
	height:10px;
	background: rgba(0,0,0,.3)
}
.dotWrap li.active{
	background: rgba(0,0,0,1)	
}
.scrollUl{
	position:absolute;
	top:0;
	left:0;
	width:400%;
}
.scrollUl li{
	float:left;
	width:25%;
	height:300px;
	background: #abcdef;
	text-align:center;
	font:bold 30px/300px microsoft yahei;
	overflow:hidden;
}
.btn{
	
}
.leftBtn{
	position: absolute;
	top:50%;
	transform:translateY(-50%);
	left:20px;
	font:30px/30px microsoft yahei;
	color:#fff;
	cursor:pointer;
}
.rightBtn{
	position: absolute;
	top:50%;
	transform:translateY(-50%);
	right:20px;
	font:30px/30px microsoft yahei;
	color:#fff;
	cursor:pointer;
}
</style>