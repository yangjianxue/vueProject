<template>
	<div class="scrollWrap clearfix" ref="wrap" @mouseenter="removeTimer" @mouseleave="addTimer">
		<ul class="scrollUl" :style="moveUl">
			<li v-for="(item,index) of objImgComp" :key="index"><img :src="item.img"></li>
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
		name:'animatedAnimate',
		data(){
			return{
				currIndex:0,
				objImg:{},
				timer:'',
				moveUl:{
					left:0
				},
				imgWidth:0,
				timer1:''
			}
		},
		props:['obj'],
		computed:{
			objImgComp(){
				return this.objImg = this.obj
			}
			
		},
		methods:{
			dotPlay(){
				if(this.currIndex >= 4){
					this.currIndex = 0
				}
				if(this.currIndex < 0){
					this.currIndex = this.objImg.length-1
				}
			},
			autoPlay(){
				var imgWidth = -(parseInt(this.imgWidth))
				this.timer1 = setInterval(()=>{
					this.moveUl.left = parseInt(this.moveUl.left) - 10 + 'px'
					if(parseInt(this.moveUl.left) <= imgWidth*2){
						clearInterval(this.timer1)
						this.moveUl.left= (imgWidth) + 'px'
						this.objImg = this.objImg.push(this.objImg.shift())
					}
				},1)
			},
			leftPlay(){
				var imgWidth = -(parseInt(this.imgWidth))
				this.timer1 = setInterval(()=>{
					this.moveUl.left = parseInt(this.moveUl.left) + 10 + 'px'
					if(parseInt(this.moveUl.left) >= 0){
						clearInterval(this.timer1)
						this.moveUl.left= imgWidth + 'px'
						this.objImg = this.objImg.unshift(this.objImg.pop())
					}
				},1)
			},
			leftHandle(){

				
				this.currIndex--;

				this.dotPlay();
				if(this.timer1){
					clearInterval(this.timer1)
					this.leftPlay();
				}else{
					this.leftPlay();
				}
				
			},
			rightHandle(){
				this.currIndex++;
				this.dotPlay();
				if(this.timer1){
					clearInterval(this.timer1)
					this.autoPlay();
				}else{
					this.autoPlay();
				}
			},
			scrollBanner(){
				this.timer = setInterval(()=>{
					this.rightHandle()
				},5000)
			},
			removeTimer(){
				clearInterval(this.timer)
			},
			addTimer(){
				if(!this.timer){
					this.scrollBanner()
				}else{
					clearInterval(this.timer)
					this.scrollBanner()
				}
			}
		},
		mounted(){
			this.imgWidth = this.$refs.wrap.clientWidth;
			var imgWidth = -(parseInt(this.imgWidth))
			this.moveUl.left= imgWidth + 'px'
			this.objImg = this.objImg.unshift(this.objImg.pop())
			this.addTimer()
		},
		destroyed(){
			clearInterval(this.timer)
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
	width:20px;
	height:6px;
	background: rgba(0,0,0,.3);
	border-radius:4px;
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