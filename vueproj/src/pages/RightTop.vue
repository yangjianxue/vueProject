<template>
	<div class="rightTop">
		<div class="colorfff"><span class="el-icon-setting colorfff mr_10"></span>我是数据库中取出的姓名-{{userInfo.trueName}}</div>
		<div class="colorfff"><span class="el-icon-setting colorfff mr_10"></span>我是github接口中取出的姓名{{data.login}}</div>
	</div>
</template>
<script>
import {mapState,mapActions,mapMutations} from 'vuex'
export default{
	name:'rightTop',
	data(){
		return{
			msg:'我是右侧头部',
			data:{}
		}
	},
	computed:{
		//通过mapState辅助函数获取公共仓库中的数据
		...mapState({
			userInfo : state => state.userInfo,
			selfInfo : state => state.selfInfo
		}),
		
		//通过计算属性返回公共仓库中的数据
		// userInfo(){
		// 	return this.$store.state.userInfo
		// }

	},
	created(){
		//通过mapActions获取this.$store公共仓库中的数据
		//前提，需要先 import {mapActions} from 'vuex'
		this.selfInfoState().then(() =>{
			// console.log(this.selfInfo)
			this.data = this.selfInfo
		})


		//通过$store.dispatch触发仓库中的actions，然后actions会触发mutations,mutations会将数据存储到$store.state中，然后就获取this.$store公共仓库中的数据
		// this.$store.dispatch('selfInfoState').then(() =>{
		// 	// this.data = this.$store.state.selfInfo
		// 	this.data = this.selfInfo
		// })

		// 当前组件直接获取用户信息
		// var _this = this;
		// _this.$axios.get('/ap/users/yangjianxue')
		// .then( res => {
		// 	_this.data = res.data;
		// 	_this.$store.commit('selfInfo',_this.data)
		// })
	},
	methods:{
		// ...mapActions
		...mapActions(['selfInfoState'])
	}

}
</script>
<style scoped>
.mr_10{margin-right:10px;}
.colorfff{color:#fff;}
.rightTop{
	padding:0 20px;
	height:60px;
	font:20px/20px microsoft yahei;
	color:#fff;
	background:#fa788a;
	display: flex;
	align-items:center;
	justify-content:flex-end;
}
</style>