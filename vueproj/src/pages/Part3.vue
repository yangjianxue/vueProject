<template>
	<div ref="pageWid" class="pageWrap font0 pos-r">
		<div class="btn mb_20" @click="returnHome">返回首页</div>
		<div class="pos-r clearfix" ref="picWrap">
			<a v-for="pic in picsUrl" :href="pic.linkUrl" class="imgSty" ref="picData">
				<img :src="pic.url">
				<p>{{pic.desc}}</p>
			</a>
		</div>
		<!-- <p class="footerTip">到底了</p> -->
		<returnTop></returnTop>
	</div>
</template>
<script>
	import returnTop from '../components/returnTop'
export default{
	name:'part3',
	data(){
		return{
			msg:'我是part3',
			picsUrl:[
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic01.jpg',
					desc:'我是第一张图片'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic02.jpg',
					desc:'我是第二张图片'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic03.jpg',
					desc:'我是第三张图片'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic04.jpg',
					desc:'我是第四张图片'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic05.jpg',
					desc:'我是第五张图片'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic06.jpg',
					desc:'我是第六张图片'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic07.jpg',
					desc:'我是第七张图片'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic01.jpg',
					desc:'我是第一张图片'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic02.jpg',
					desc:'我是第二张图片'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic03.jpg',
					desc:'我是第三张图片'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic04.jpg',
					desc:'我是第四张图片'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic05.jpg',
					desc:'我是第五张图片'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic06.jpg',
					desc:'我是第六张图片'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic07.jpg',
					desc:'我是第七张图片'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic01.jpg',
					desc:'我是第一张图片'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic02.jpg',
					desc:'我是第二张图片'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic03.jpg',
					desc:'我是第三张图片'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic04.jpg',
					desc:'我是第四张图片'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic05.jpg',
					desc:'我是第五张图片'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic06.jpg',
					desc:'我是第六张图片'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic07.jpg',
					desc:'我是第七张图片'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic01.jpg',
					desc:'我是第一张图片'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic02.jpg',
					desc:'我是第二张图片'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic03.jpg',
					desc:'我是第三张图片'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic04.jpg',
					desc:'我是第四张图片'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic05.jpg',
					desc:'我是第五张图片'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic06.jpg',
					desc:'我是第六张图片'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic07.jpg',
					desc:'我是第七张图片'
				}
			],
			picsLen:0,
			cols:5,
			hArr:[],
			minHeight:0,
			currIndex:0,
			pageWidth:(document.documentElement.clientWidth || document.body.clientWidth),
			isScroll:true,
			resizeTimer:'',
			imgCound:0
		}
	},
	methods:{
		randomPic(){
			for(let i=0;i<3;i++){
				let index = parseInt(Math.random()*9)
				this.picsUrl.push(this.picsUrl[index])
				this.compMinTop()
			}
		},
		compMinTop(){
			this.imgCound = this.picsUrl.length;
			let timer = setTimeout(()=>{
				this.pageWidth = (document.documentElement.clientWidth || document.body.clientWidth);
				this.hArr=[]
				// 获取 当前page页（pageWid）一排可以防止几张图片，图片宽度默认为200px
				this.cols = parseInt(this.pageWidth/200)
				// 为高度数组添加默认值
				// for(let i = 0;i < this.cols; i++){
				// 	this.hArr.push(0)
				// }
				//es6新增的数组填充 （arr.fill(要填充的东西,开始填充的下标,结束填充的下标)）
				this.hArr.fill(0,0,this.cols)  
				let picArr = this.$refs.picData
				for(let i = 0;i < this.cols;i++){
					this.hArr[i] = picArr[i].offsetHeight;
					// picArr[i].style.cssText = "transition:opacity 1s;opacity:1;top:" + 0 + "px;left:" + i * 200 + 'px'
					picArr[i].style.cssText = `transition:opacity 1s;opacity:1;top:0px;left:${i * 200}px`
				}
			
				for(let i = this.cols;i < picArr.length;i++){
					//获取第一排图片的高度值添加到this.hArr数组中并将第一排图片进行定位
					if(i<this.cols){
						this.hArr[i] = picArr[i].offsetHeight;
						picArr[i].style.left = i * 200 + 'px'
					}else{
						//console.log(picArr[i] + '距离顶部的高度为：'+ picArr[i].getBoundingClientRect().top)
						//超出第一排的每张图片单独定位
						this.minHeight = this.hArr[0]
						this.currIndex = 0
						if(this.currIndex > this.cols){
							this.currIndex = 0	
						}

						for(let j = 0;j < this.hArr.length; j++){
							if(parseInt(this.minHeight) > parseInt(this.hArr[j])){
								this.minHeight = this.hArr[j] 
								this.currIndex = j
							}else{
								this.minHeight = this.minHeight
							}

						}
						picArr[i].style.cssText = `transition:opacity 1s;opacity:1;top:${this.minHeight}px;left:${this.currIndex * 200}px`
						// picArr[i].style.cssText = "transition:opacity 1s;opacity:1;"
						// picArr[i].style.top = this.minHeight + 'px'
						// picArr[i].style.left = this.currIndex * 200 + 'px'	
						this.hArr[this.currIndex] += picArr[i].offsetHeight
					}
				}
				clearInterval(timer)
			},90)
		},
		scrollHandle(){
			let winClientHeight = document.documentElement.clientHeight || document.body.clientHeight;
			let winScrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
			if(this.picsUrl.length && this.isScroll){
				let lastindex = this.picsUrl.length - 1;
				if(parseInt(this.$refs.picData[lastindex].style.top) < (winClientHeight + winScrollHeight)){
					this.randomPic()
				}
			}
			
		},
		returnHome(){
			sessionStorage.setItem('tab',0)
			// this.$router.push({path:`./01`})
			history.back()
		},
		changeResize(){
			let _this = this;
			this.timer = setTimeout(function(){
				_this.compMinTop();
			},400)
		}
	},

	mounted(){
		this.compMinTop()
		//当页面滚动到底部时，加载随机图片
		window.addEventListener('scroll',this.scrollHandle,false)
		//窗口发生改变时重新计算每行的图片位置
		window.addEventListener('resize',this.changeResize,false)
		// console.log(this.$route.params.id)
	},
	components:{
		returnTop
	},
	destroyed(){
		this.isScroll = false;
		clearTimeout(this.timer)
		window.removeEventListener('scroll',this.scrollHandle,false)
		//窗口发生改变时重新计算每行的图片位置
		window.removeEventListener('resize',this.changeResize,false)
	}

}
</script>
<style lang="less">
	@keyframes fadeAnim{
		0%{opacity:0}
		50%{opacity:0.5}
		100%{opacity:1}
	}
	.pageWrap{
		padding:10px;
		.mb_20{margin-bottom:20px;}
		.btn{
			display:inline-block;
			padding:4px 6px;
			font:16px/18px microsoft yahei;
			color:#fff;
			background:rgba(250,120,138,.8);
			border-radius:4px;
			cursor:pointer;
		}
		.imgSty{
			position:absolute;
			top:0;
			left:0;
			display:inline-block;
			width:200px;
			opacity:0;
			box-sizing:border-box;
			padding:10px;
			p{
				width:182px;
				height:20px;
				font:14px/20px microsoft yahei;
				color:rgba(250,120,138,1);
				text-align:center;
				border:1px solid #666;
				border-top:none;
				border-radius:0 0 20px 20px;
			}
			img{
				width:100%;
				border:1px solid #666;
				border-bottom:none;
				border-radius:20px 20px 0 0;
			}
		}
		.footerTip{
			position:absolute;
			left:50%;
			bottom:0;
			font:20px/30px microsoft yahei;
			color:#333;
		}
	}
	
</style>