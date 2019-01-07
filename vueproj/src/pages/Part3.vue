<template>
	<div ref="pageWid" class="font0 dp_b">
		<div class="pos-r">
			<a v-for="pic in picsUrl" :href="pic.linkUrl" class="imgSty" ref="picData">
				<img :src="pic.url">
			</a>
		</div>
	</div>
</template>
<script>
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
			pageWidth:(document.documentElement.clientWidth || document.body.clientWidth) - 300
		}
	},
	methods:{
		randomPic(){
			var newArrData =[];
			for(let i = 0;i < 5;i++ ){
				let index = parseInt(Math.random()*9)
				newArrData.push(this.picsUrl[i])
			}
			this.picsUrl.push(newArrData)
			// this.compMinTop()
		},
		compMinTop(){

			var timer = setTimeout(()=>{
				this.hArr=[]
				console.log(this.pageWidth)
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
						// console.log(this.currIndex)
						picArr[i].style.left = this.currIndex * 200 + 'px'	
						this.hArr[this.currIndex] += picArr[i].offsetHeight
					}
				}
				clearInterval(timer)
			},100)
		}

	},

	mounted(){
		var _this = this
		_this.compMinTop()
		//_this.randomPic()
		// window.addEventListener('scroll',function(){
		// 	var winClientHeight = document.documentElement.clientHeight - 60;
		// 	console.log(winClientHeight)
		// 	// if()
		// },false)
	}

}
</script>
<style lang="less">
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
</style>