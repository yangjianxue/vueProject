<template>
	<div class="wrap">
		
		<div class="mt_20">
			<animatedShow :obj="obj"></animatedShow>
		</div>
		<p class="ta_c fontW-b font20">点击切换</p>
		
		<div class="mt_20">
			<animatedFade :obj="obj"></animatedFade>
		</div>
		<p class="ta_c fontW-b font20">fade切换</p>
		
		<div class="mt_20">
			<animatedAnimate :obj="obj"></animatedAnimate>
		</div>
		<p class="ta_c fontW-b font20">无缝轮播</p>
	</div>
</template>
<script>
	import animatedShow from '../components/animatedShow.vue'
	import animatedFade from '../components/animatedFade.vue'
	import animatedAnimate from '../components/animatedAnimate.vue'
export default{
	name:'part1',
	data(){
		return{
			msg:'我是part1',
			obj:[
				{
					id:'0',
					textMsg:'0',
					img:'../static/img/banner1.jpg'
				},
				{
					id:'1',
					textMsg:'1',
					img:'../static/img/banner2.jpg'
				},
				{
					id:'2',
					textMsg:'2',
					img:'../static/img/banner3.jpg'
				},
				{
					id:'3',
					textMsg:'3',
					img:'../static/img/banner4.jpg'
				}
			]
		}
	},
	created(){
	},
	components:{
		animatedShow,
		animatedFade,
		animatedAnimate
	}
}
</script>
<style>
	.mt_20{margin-top:20px;}
</style>