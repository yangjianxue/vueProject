<template>
	<div class="testWrapp" :style="winHSty">
		<div class="sideBar">
			<!-- <ul class="submenu">
                <li class="subMenuLi" v-for="nav in navData" :key="nav.id" @click.stop.prevent="handleMenu(nav.id)">{{nav.navOne}}
                    <ul class="nav-child" v-show="currentTab==nav.id">
                        <li v-for="item in nav.navTwo" :key="item.id">{{item.title}}</li>
                    </ul>
                </li>
            </ul>-->
            <hr	/>
           <ul class="submenu">
                <li class="subMenuLi" v-for="(nav,index) in navData" :index="nav.id">
                	<p class="menuFir" @click="handleTestMenu(nav.id)">
                		<span>{{nav.navOne}}</span>
                		<em @click.stop='addItem(index)' class="addIcon">add</em>
                	</p>
                    <ul class="menuItem" style="display:none" ref="menuItem">
                        <li v-for="(item,key) in nav.navTwo" :key="item.id" :class="{editing:isEditItem == item}">
                        	<div class="showLi">
                        		<!-- <span @click="editHandle"></span> -->
                        		<router-link :to="{ path: item.path }">
                        			<span class="secTitle" @dblclick="editHandle(item)">{{item.title}}</span>
                        		</router-link>
                        		<span class="dp_i" @click="removeItem(index,key)">×</span>
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
			winHSty:{
				height:''
			},
			isEditItem:'',
			navData:[
				{
					navOne:'导航一',
					id:0,
					navTwo:[
						{
							title:'轮播图',
							id:"01",
							"path":'/Part1'
						},
						{
							title:'echart-图表',
							id:"02",
							"path":'/Part2'
						},
						{
							title:'导航1.3',
							id:"03",
							"path":'/Part3'
						}
					]
				},
				{
					navOne:'导航二',
					id:1,
					navTwo:[
						{
							title:'导航2.1',
							id:"11",
							"path":'/Part4'
						},
						{
							title:'导航2.2',
							id:"12",
							"path":'/Part5'
						},
						{
							title:'导航2.3',
							id:"13",
							"path":'/Part6'
						}
					]
				}
			]
		}
	},
	components:{
		RightTop
	},
	methods:{
		winHeight(){
			let winH = window.innerHeight;
			this.winHSty.height = winH +'px'
		},
		handleMenu(i){
			this.currentTab = i;
		},
		handleTestMenu(i){
			let currentTab = this.$refs.menuItem[i];
			if(currentTab.style.display == 'none'){
				currentTab.style.display = 'block'
			}else{
				currentTab.style.display = 'none'
			}
		},
		addItem(index){
			console.log(index)
			var secIndex = this.navData[index].navTwo.length+1
			this.navData[index].navTwo.push({
				title:'导航'+(index+1)+'.'+secIndex,
				id:(index+1)+secIndex,
				"path":'/Part'+secIndex
			})
		},
		removeItem(fir,sec){
			console.log(fir,sec)
			this.navData[fir].navTwo.splice(sec,1)
		},
		editHandle(item){
			console.log(item)
			this.isEditItem = item;
		},
		confirmEdit(item){

			this.isEditItem = ''
			console.log(this.isEditItem)
		}
	},
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
	},
	mounted(){

		this.$refs.menuItem[0].style.display= 'block'
	}
}
</script>
<style scoped>
.testWrapp{
	display:flex;
	width:100%;
}
.sideBar{
	padding:20px;
	width:300px;
	background:#eee;
	align-self:stretch;
}
.subMenuLi{
	font:18px/40px microsoft yahei;
	color:#333;
	cursor:pointer;
	background:#9999cc;
}
.menuFir{
	padding:0 10px;
	background:#f44b3b;
}
.menuFir span{
	display: inline-block;
	font:16px/40px microsoft yahei;
	color:#fff;
	background:#f44b3b;
}
.addIcon{
	float:right;
	font:16px/40px microsoft yahei;
	color:#fff;
}
.nav-child,.menuItem{
	background:#fff;
}
.menuItem li{
	padding: 0 15px;
	border-bottom:1px solid #eee;
}
.menuItem li a,.secTitle{
	font:14px/32px microsoft yahei;
	display:inline-block;
	width:80%;
}
.nav-child li a:hover,.menuItem li a:hover{
	color:#f03a26;
}
.menuItem li.editing .showLi{
	display: none;
}
.menuItem li input{
	display: none
}
.menuItem li.editing input{
	display: block;
	padding:0 2px;
	font:14px/32px microsoft yahei;
	display:inline-block;
	width:80%;
	border:1px solid #eee;
}
.removeIcon{
	display: none;
}
.menuItem li:hover .removeIcon{
	display: block;
}

.rightMainWrap{
	flex:1;
}
.active{
	color:#f03a26;
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