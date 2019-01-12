<template>
	<div class="wrap">
		<vue-waterfall-easy :imgsArr="imgsArr" @scrollReachBottom="randomData" ref="ele">
			<div class="img-info" slot-scope="props">
		    <p class="some-info">picture index: {{props.index}}</p>
		    <p class="some-info">{{props.value.info}}</p>
		 </div>
		</vue-waterfall-easy>
		<!-- <returnTop></returnTop> -->
	</div>
</template>
<script>
	import vueWaterfallEasy from 'vue-waterfall-easy'
	import returnTop from '../components/returnTop'
export default{
	name:'part4',
	data(){
		return{
			msg:'我是part4',
			group:1,
			imgsArr:[
				{
				    "src":'../static/img/pic01.jpg',
				    "href": "https://www.baidu.com",
				    "info": "一些图片描述文字"
				  },
				  {
				    "src":'../static/img/pic02.jpg',
				    "href": "https://www.baidu.com",
				    "info": "一些图片描述文字"
				  },
				{
					"src":'../static/img/pic03.jpg',
				    "href": "https://www.baidu.com",
				    "info": "一些图片描述文字"
					
				},
				{
					"src":'../static/img/pic04.jpg',
				    "href": "https://www.baidu.com",
				    "info": "一些图片描述文字"
				},
				{
					"src":'../static/img/pic05.jpg',
				    "href": "https://www.baidu.com",
				    "info": "一些图片描述文字"
				},
				{
					"src":'../static/img/pic06.jpg',
				    "href": "https://www.baidu.com",
				    "info": "一些图片描述文字"
				},
				{
					"src":'../static/img/pic07.jpg',
				    "href": "https://www.baidu.com",
				    "info": "一些图片描述文字"
				},
				{
					"src":'../static/img/pic08.jpg',
				    "href": "https://www.baidu.com",
				    "info": "一些图片描述文字"
				},
				{
					"src":'../static/img/pic09.jpg',
				    "href": "https://www.baidu.com",
				    "info": "一些图片描述文字"
				}
			]
		}
	},
	components:{
		vueWaterfallEasy,
		returnTop
	},
	methods:{
		getData(){
			// console.log('123')
			this.randomData()
		},
		randomData(){

			var newImgsArr =[]
			for(var i = 0 ;i<30;i++){
				var index = parseInt(Math.random()*7+1);
				// console.log(index)
				var obj = {
					"src":`/static/img/pic0${index}.jpg`,
				    "href": "https://www.baidu.com",
				    "info": "一些图片描述文字"
				}
				newImgsArr.push(obj)
				this.group++
			}
			
			this.imgsArr = this.imgsArr.concat(newImgsArr)
			// console.log(this.imgsArr)
		}
	},
	created(){
		// console.log('456')
		this.getData();
	},
	mounted(){
		console.log(this.$refs.ele.$el.children[1])
	}
}
</script>
<style lang="less" scoped>
	#app{overflow-y:hidden;background:red}
	.wrap{
		height:2000px;
	}
</style>