<template>
	<div ref="pageWid" class="pageWrap font0">
		<div class="btn mb_20" @click="returnHome">返回首页</div>
		<div class="pos-r clearfix" ref="picWrap">
			<a v-for="pic in picsUrl" :href="pic.linkUrl" class="imgSty" ref="picData">
				<img :src="pic.url">
			</a>
		</div>
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
					url:'../static/img/pic01.jpg'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic02.jpg'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic03.jpg'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic04.jpg'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic05.jpg'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic06.jpg'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic07.jpg'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic01.jpg'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic02.jpg'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic03.jpg'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic04.jpg'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic05.jpg'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic06.jpg'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic07.jpg'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic08.jpg'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic09.jpg'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic01.jpg'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic02.jpg'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic01.jpg'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic09.jpg'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic01.jpg'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic02.jpg'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic01.jpg'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic01.jpg'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic02.jpg'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic01.jpg'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic09.jpg'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic01.jpg'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic02.jpg'
				},
				{
					linkUrl:'www.baidu.com',
					url:'../static/img/pic01.jpg'
				}
			],
			cols:5,
			hArr:[],
			minHeight:0,
			currIndex:0,
			pageWidth:(document.documentElement.clientWidth || document.body.clientWidth)
		}
	},
	methods:{
		randomPic(){
			for(var i=0;i<3;i++){
				let index = parseInt(Math.random()*9)
				this.picsUrl.push(this.picsUrl[index])
				this.compMinTop()
			}
		},
		compMinTop(){

			var timer = setTimeout(()=>{
				this.hArr=[]
				// 获取 当前page页（pageWid）一排可以防止几张图片，图片宽度默认为200px
				this.cols = parseInt(this.pageWidth/200)
				// 为高度数组添加默认值
				for(let i = 0;i < this.cols; i++){
					this.hArr.push(0)
				}
				var picArr = this.$refs.picData
				for(let i = 0;i < this.cols;i++){
					this.hArr[i] = picArr[i].offsetHeight;
					picArr[i].style.left = i * 200 + 'px'
				}
			
				var picArr = this.$refs.picData
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

						for(var j = 0;j < this.hArr.length; j++){
							if(parseInt(this.minHeight) > parseInt(this.hArr[j])){
								this.minHeight = this.hArr[j] 
								this.currIndex = j
							}else{
								this.minHeight = this.minHeight
							}

						}
						picArr[i].style.top = this.minHeight + 'px'
						picArr[i].style.left = this.currIndex * 200 + 'px'	
						this.hArr[this.currIndex] += picArr[i].offsetHeight
					}
				}
				clearInterval(timer)
			},100)
		},
		scrollHandle(){
			let winClientHeight = document.documentElement.clientHeight || document.body.clientWidth;
			let winScrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
			let lastindex = this.picsUrl.length-1
			console.log(parseInt(this.$refs.picData[lastindex].style.top),winClientHeight)
			if(parseInt(this.$refs.picData[lastindex].style.top) > winClientHeight){
				this.randomPic()
			}
		},
		returnHome(){
			this.$router.push('./index')
		}
	},

	mounted(){
		this.compMinTop()
		window.addEventListener('scroll',this.scrollHandle,false)
		// 	let lastindex = this.picsUrl.length-1
		// 	console.log(this.$refs.picWrap)
		// 	console.log(parseInt(this.$refs.picData[lastindex]),winClientHeight)
		// let winClientHeight = document.documentElement.clientHeight || document.body.clientWidth;
		// setInterval(function(){

		// 	if(parseInt(this.$refs.picData[lastindex].style.top) < winClientHeight){
		// 		this.randomPic()
		// 	}
		// },800)
	},
	components:{
		returnTop
	}

}
</script>
<style lang="less">
	.pageWrap{
		padding:10px;
		.mb_20{margin-bottom:20px;}
		.btn{
			display:inline-block;
			padding:4px 6px;
			font:16px/18px microsoft yahei;
			color:#fff;
			background:#fa788a;
			border-radius:4px;
			cursor:pointer;
		}
		.imgSty{
			position:absolute;
			top:0;
			left:0;
			display:inline-block;
			width:200px;
			img{
				width:100%;
				border:1px solid #666;
				box-sizing:border-box;

			}
		}
	}
	
</style>