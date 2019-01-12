<template>
	<div class="scrollWrap clearfix" @mouseenter="removeTimer" @mouseleave="addTimer">
		<ul class="scrollUl">
			<transition-group name="fade">
				<li v-for="(item,index) of objImgComp" v-show="currIndex == index" :key="index"><img :src="item.img"></li>
			</transition-group>
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
		name:'animatedFade',
		data(){
			return{
				currIndex:0,
				objImg:{},
				timer:'',
				show:false
			}
		},
		props:['obj'],
		computed:{
			objImgComp(){
				return this.objImg = this.obj
			}
		},
		methods:{
			textToggle(){
				this.show = !this.show
			},
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
				},3000)
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
.slide-fade-enter-active {
  transition: all 3s ease;
}
.slide-fade-leave-active {
  transition: all 8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateX(100px);
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
  opacity: 0.2;
}
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
.mt_100{margin-top:100px;}
</style>