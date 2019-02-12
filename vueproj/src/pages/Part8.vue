<template>
	<div class="mainWrap">
		<h3>css3-旋转立方体</h3>
		<div class="conWrap">
			<div class="partWrap">
				<div class="part">我是第一面</div>
				<div class="part">我是第二面</div>
				<div class="part part3">我是第三面</div>
				<div class="part">我是第四面</div>
				<div class="part">我是第五面</div>
				<div class="part">我是第六面</div>
			</div>
		</div>
		<hr>
		<h3>css3-loading</h3>
		<div class="loadWrap">
			<ul class="loading">
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
			<ul class="loading">
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</div>
		
	</div>
</template>
<script>
	export default{
		name:'part8',
		data(){
			return{

			}
		}
	}
</script>
<style scoped lang="less">
	@keyframes move{
		0%{
			transform:rotateY(0) rotateX(0)
		}
		100%{
			transform:rotateY(360deg) rotateX(360deg)
		}
	}
	@keyframes load{
		0%,80%,100%{
			transform:scale(0);
		}
		80%{
			transform:scale(1);
		}
	}
	.mainWrap{
		width:100%;
		height:100%;
		.conWrap{
			perspective:600px;
			.partWrap{
				margin:auto;
				width:600px;
				height:600px;
				position:relative;
				transform-style:preserve-3d; 
				animation:move 12s linear infinite;
				.part{
					width:200px;
					height:200px;
					position:absolute;
					top:200px;
					left:200px;
					font:20px/32px microsoft yahei;
					color:#fff;
					text-align:center;
					line-height:180px;
				}
				.part:first-child{
					background:linear-gradient(to right,blue,green);
					transform: translateZ(200px);
				}
				.part:nth-child(2){
					background:#000;
					opacity:0.8;
					transform:rotateY(90deg);
					transform-origin:right;
				}
				.part3{
					background:rgba(255,0,0,0.8);
					transform:rotateY(-90deg);
					transform-origin:left;
				}
				.part:nth-child(4){
					background:radial-gradient(circle,red,blue,green);
					transform:rotateX(-90deg);
					transform-origin:bottom;
				}
				.part:nth-child(5){
					background:#f90;
					transform:rotateX(90deg);
					transform-origin:top;
					opacity:0.6;
				}
				.part:last-child{
					background:yellow;
					transform: translateZ(0);
					color:#000;
				}
				
			}
		}
		.loadWrap{
			position:relative;
			width:50px;
			height:50px;
			margin:20px auto 50px;
			.loading{
				position:absolute;
				top:0;
				left:0;
				width:30px;
				height:30px;
				li{
					position:absolute;
					width:8px;
					height:8px;
					background:#f90;
					border-radius:50%;
					animation:load 1s ease-in-out infinite;
					font-size:8px;
					&:nth-child(1){
						top:0;
						left:0;
					}
					&:nth-child(2){
						top:0;
						right:0;
					}
					&:nth-child(3){
						bottom:0;
						right:0;
					}
					&:nth-child(4){
						bottom:0;
						left:0;
					}
				}
				&:nth-child(1){
					li{
						&:nth-child(1){
							animation-delay:0.1s;
						}
						&:nth-child(2){
							animation-delay:0.3s;
						}
						&:nth-child(3){
							animation-delay:0.4s;
						}
						&:nth-child(4){
							animation-delay:0.7s;
						}
					}
					
				}
				&:nth-child(2){
					transform:rotateZ(45deg);
					li{
						&:nth-child(1){
							animation-delay:0.2s;
						}
						&:nth-child(2){
							animation-delay:0.4s;
						}
						&:nth-child(3){
							animation-delay:0.6s;
						}
						&:nth-child(4){
							animation-delay:0.8s;
						}
					}
					
				}
			}

		}
	}
</style>