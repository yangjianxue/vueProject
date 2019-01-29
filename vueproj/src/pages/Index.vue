<template>
	<div class="testWrapp" :style="winHSty">
		<div class="sideBar">
		    <p class="titleP">后台管理系统</p>
		    <!-- <ul class="submenu">
                <li class="subMenuLi" v-for="nav in navData" :key="nav.id" @click.stop.prevent="handleMenu(nav.id)">{{nav.navOne}}
                    <ul class="nav-child" v-show="currentTab==nav.id">
                        <li v-for="item in nav.navTwo" :key="item.id">{{item.title}}</li>
                    </ul>
                </li>
            </ul>-->
            <ul class="submenu">
                <li class="subMenuLi" v-for="(nav,index) in navData" :index="nav.id">
                	<p class="menuFir" @click.stop.prevent="handleTestMenu(nav)">
                		<span>{{nav.navOne}}</span>
                		<em @click.stop='addItem(index)' class="addIcon"></em>
                	</p>
                    <ul class="menuItem" ref="menuItems" v-show="nav.isShow">
                        <li v-for="(item,key) in nav.navTwo" :key="item.id" :class="{editing:isEditItem == item}">
                        	<div class="showLi">
                        		<!-- <router-link :to="{ name: item.name ,params:{ id: item.id} }"> -->
                        		<!-- <router-link :to="{ path: item.path }">
                        			<span class="secTitle" :title="item.title">{{item.title}}</span>
                        		</router-link> -->
                        		<p :class="navIndex === item.id ? 'router-link-exact-active active' : 'router-link-exact-active'"  @click="routerLink(item.id, item.path)">{{ item.title }}</p>
                        		<span class="removeIcon dp_i" @click="removeItem(index,key)" v-if="(key>=3)">×</span>
                        		<span class="editIcon dp_i" @click.stop.prevent="editHandle(item)"></span>
                        	</div>
                        	<input type="text" v-model='item.title' v-focus="isEditItem == item" @blur="confirmEdit(item)">
                        </li>
                    </ul>
                </li>
            </ul>
		</div>
		<div class="rightMainWrap">
			<RightTop />
			<div class="rightMain">
				<router-view/>
			</div>
		</div>
	</div>
</template>
<script>
import RightTop from './RightTop'
export default{
	name:'index',
	data(){
		return {
			msg:'后台首页',
			currentTab:'',
			isEditItem:'',
			winHSty:{
				minHight:0
			},
			navData:[
				{
					navOne:'导航一',
					id:0,
					isShow:true,
					navTwo:[
						{
							title:'轮播图练习',
							id:"01",
							"path":'/Part1/01'
						},
						{
							title:'echart-图表练习',
							id:"02",
							"path":'/Part2/02'
						},
						{
							title:'瀑布流懒加载练习',
							id:"03",
							"path":'/Part3/03'
						}
					]
				},
				{
					navOne:'导航二',
					id:1,
					isShow:true,
					navTwo:[
						{
							title:'瀑布流懒加载插件练习',
							id:"11",
							"path":'/Part4/11'
						},
						{
							title:'MockJs模拟数据',
							id:"12",
							"path":'/Part5/12'
						},
						{
							title:'分页练习',
							id:"13",
							"path":'/Part6/13'
						}
					]
				},
				{
					navOne:'导航三',
					id:2,
					isShow:true,
					navTwo:[
						{
							title:'选项卡',
							id:"21",
							"path":'/Part7/21'
						},
						{
							title:'导航3.2',
							id:"22",
							"path":'/Part8'
						},
						{
							title:'导航3.3',
							id:"23",
							"path":'/Part9'
						}
					]
				}
			],
			navIndex:''
		}
	},
	components:{
		RightTop
	},
	methods:{
		routerLink(index, path) {
			console.log(index, path)
			sessionStorage.setItem('navIndex',index)
		  // 点击哪个路由就赋值给自定义的下标
		  this.navIndex = index;
		  // 路由跳转
		  this.$router.push(path)
		},
		winHeight(){
			let winH = window.innerHeight;
			this.winHSty.minHeight = winH +'px'
		},
		handleMenu(i){
			this.currentTab = i;
			sessionStorage.setItem('tab',i)
		},
		handleTestMenu(item){
			item.isShow = !item.isShow;
			sessionStorage.setItem('navData',JSON.stringify(this.navData))
			// sessionStorage.setItem('tab',item.isShow)
			// console.log(i)
			// this.currentTab = i;
			// sessionStorage.setItem('tab',i)
			// console.log(this.$refs.menuItems[i].style.display)
			// let currentTab = this.$refs.menuItems[i];
			// if(currentTab.style.display == 'none' || currentTab.style.display == ''){
			// 	currentTab.style.display = 'block'
			// }else{
			// 	currentTab.style.display = 'none'
			// }
		},
		addItem(index){
			let secIndex = this.navData[index].navTwo.length+1
			this.navData[index].navTwo.push({
				title:'导航'+(index+1)+'.'+secIndex,
				id:(index+1)+secIndex,
				"path":'/Part'+secIndex
			})
			sessionStorage.setItem('navData',JSON.stringify(this.navData))
		},
		removeItem(fir,sec){
			if(fir > 1 || sec > 2){
				this.navData[fir].navTwo.splice(sec,1)
			}else{
				alert('此项不可删除')
			}
			sessionStorage.setItem('navData',JSON.stringify(this.navData))
		},
		editHandle(item){
			this.isEditItem = item;
		},
		confirmEdit(item){
			this.isEditItem = '';
			sessionStorage.setItem('navData',JSON.stringify(this.navData))
		}
	},
	// watch:{
	// 	navData:function(n,o){
	// 		console.log(this.navData)
	// 		sessionStorage.setItem('navData',JSON.stringify(this.navData))
	// 	}
	// },
	directives:{
		'focus':{
			update(el,binding){
				if(binding.value){
					el.focus()
				}
			}
		}
	},
	created(){
		this.winHeight();
		// console.log(this.$route.params.id)
	},
	mounted(){
		// this.currentTab = sessionStorage.getItem('tab') ? sessionStorage.getItem('tab') : 0
		// console.log(window.location.href)
		// this.navIndex = sessionStorage.getItem('navIndex') ? sessionStorage.getItem('navIndex') :'01';
		this.navIndex = `${window.location.href.substr(-2)}`
		this.navData = JSON.parse(sessionStorage.getItem('navData')) ? JSON.parse(sessionStorage.getItem('navData')) : this.navData
		// console.log(this.curr)
	}
}
</script>
<style scoped lang="less">
.testWrapp{
	display:flex;
	width:100%;
	.sideBar{
		width:300px;
		background:#eee;
		align-self:stretch;
		display:flex;
		flex-direction:column;
		.titleP{
			padding-left:10px;
			font:16px/60px microsoft yahei;
			color:#fff;
			background:#f44b3b;
			border-bottom:2px solid #eee;
		}
		ul{
			flex:1;
			margin:18px 0 20px 0;
			padding:0 20px;
			.subMenuLi{
				font:18px/40px microsoft yahei;
				color:#333;
				cursor:pointer;
				background:#9999cc;
				.menuFir{
					padding:0 10px;
					background:#f44b3b;
					display:flex;
					flex-direction:row;
					align-items:center;
					span{
						flex:1;
						display: inline-block;
						font:16px/40px microsoft yahei;
						color:#fff;
						background:#f44b3b;
					}
					.addIcon{
						display:inline-block;
						width:20px;
						height:20px;
						background:url('../assets/img/add.png') no-repeat center center;
						background-size:100%;
						vertical-align:middle;
					}
				}
				.menuItem{
					margin:0;
					background:#fff;
					li{
						height:40px;
						border-bottom:1px solid #eee;
						&:last-child{
							border-bottom:none;
						}
						div{
							display:flex;
							flex-direction:row;
							align-items:center;
							p{
								font:14px/40px microsoft yahei;
								display:inline-block;
								width:88%;
								&:hover{
									color:#f03a26;
								}
								.secTitle{
									font:14px/40px microsoft yahei;
									display:inline-block;
									width:98%;
									overflow:hidden;
									text-overflow:ellipsis;
									white-space:nowrap;
									vertical-align:middle;
								}
								&.active{
									color:#f03a26;
								}

							}
							.removeIcon{
								font:25px/26px microsoft yahei;
								display:none;
							}
							.editIcon{
								display:none;
								width:20px;
								height:20px;
								background:url(../assets/img/editIcon.jpg) no-repeat center center;
								background-size:75%;
							}
						}
						&:hover .removeIcon,&:hover .editIcon{
							display: inline-block;
						}
						input{
							display: none;
							font:14px/32px microsoft yahei;
						}
						&.editing input{
							padding:0 4px;
							display: inline-block;
							height:32px;
							font:14px/32px microsoft yahei;
							display:inline-block;
							width:100%;
							border:1px solid #eee;
						}
						&.editing .showLi{
							display: none;
						}
					}
				}
			}
		}
	}
	
	.rightMainWrap{
		flex:1;
	}
}
</style>
/*
* 1、点击第一个li，第一个li展开，点击第二个li，第一个li闭合，第二个li展开
	(当前只有一个li 展开)
	
	思路：
		利用v-show ,设置一个currentId , 点击时将当前id 赋给 currentId，
		此时，v-show = "currentId == id" ---currentId == id 为真，则显示，其他的则会收起

* 2、点击第一个li展开，点击第二个li，第二个li展开，第一个li不闭合
	(点一个展开一个)

	思路：
		利用 ref,设置当前元素的display:none|block
		ref = 'item'
		获取当前元素属性：this.$ref.item.style.display
		设置当前元素属性：this.$ref.item.style.display = 'block'
*/