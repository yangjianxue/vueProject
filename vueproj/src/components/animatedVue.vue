<template>
	<div class="scrollWrap clearfix">
		<swiper :options="swiperOption">
			<swiper-slide v-for="(item, index) in obj" :key="index">
				<img :src="item.img">
			</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
	</div>
</template>
<script>
	import 'swiper/dist/css/swiper.css'
	import { swiper,swiperSlide } from 'vue-awesome-swiper'
	export default{
		name:'animatedvue',
		num:'fix',
		props:{
			obj:{
				type:Array,
				required:true
			}
		},
		data(){
			return{
				swiperOption:{
					loop: true,
					pagination: {
			        	el: '.swiper-pagination',
			          	bulletClass: 'my-bullet',
			          	bulletActiveClass: 'my-bullet-active'
			        }
				}
			}
		},
		components:{
			swiper,
    		swiperSlide
		}
	}
</script>
<style scoped lang="less">
	.scrollWrap{
		position:relative;
		margin:0 auto;
		width:1200px;
		height:300px;
		overflow:hidden;
		img{
			width:1200px;
			height:300px;
		}
	}
</style>
<style>
	.my-bullet{
		display: inline-block;
		margin-right:4px;
		width:20px;
		height:6px;
		background: rgba(0,0,0,.3);
		border-radius:4px;
		
	}
	.my-bullet-active{
		background: rgba(0,0,0,1)
	}
</style>