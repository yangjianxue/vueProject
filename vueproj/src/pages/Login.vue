<template>
	<div class="loginWrap" :style="innerHeight">
		<div class="loginMain">
			<p class="font20">{{ msg }}</p>
			<p class="mt_20">
				<label>账号：</label><input type="text" class="iptSty" ref="userName" v-focus v-model="userNameIpt" @blur="nameblurReg">
			</p>
			<p class="errTip">{{userNameErr}}</p>
			<p>
				<label>密码：</label><input type="password" class="iptSty" v-model="passWordIpt" @blur="passblurReg">
			</p>
			<p class="errTip">{{passWordErr}}</p>
			<p class="ta_c">
				<a href="#" class="btnSty loginBtn" @click="handleLogin">登录</a>
				<a href="#" class="btnSty loginGreyBtn ml_20" @click = "handleClear">清空</a>
			</p>
		</div>
	</div>
</template>
<script>
export default{
	name:'login',
	data(){
		return{
			msg:"登录",
			innerHeight:{
				height:''
			},
			userNameIpt:'',
			passWordIpt:'',
			userNameErr:'',
			passWordErr:'',
			nameRegFlag:false,
			passRegFlag:false
		}
	},
	methods:{
		compHeight(){
			let innerH = window.innerHeight;
			this.innerHeight.height = innerH + 'px'
			//console.log(this.innerHeight.height)
		},
		nameReg(){
			let nameIpt = this.userNameIpt;
			if(!nameIpt){ 
				this.userNameErr = "请输入用户名"
			}
			if(nameIpt.length <=4 || nameIpt.length >=17){
				this.userNameErr = "请输入5-16位用户名"
			}else{
				this.userNameErr = "";
				this.nameRegFlag = true;
			}
		},
		passReg(){
			let mimaIpt = this.passWordIpt;
			if(!mimaIpt){ 
				this.passWordErr = "请输入用户名"
			}
			if(mimaIpt.length <=5 || mimaIpt.length >=17){
				this.passWordErr = "请输入6-16位密码"
			}else{
				this.passWordErr = "";
				this.passRegFlag = true;
			}
		},
		handleLogin(){
			if(this.nameRegFlag && this.passRegFlag){
				let _this = this;
				//console.log(_this.userNameIpt)
				this.$axios.post('/api/checklogin',{
					userName:_this.userNameIpt,
					passWord:_this.passWordIpt
				})
				.then( res =>{
					//console.log(res.data)
					let data = res.data[0];
					console.log(data)
					if(_this.userNameIpt == data.username && _this.passWordIpt == data.passWord){
						_this.$store.commit('saveInfo',data)
						this.$router.push('/index')
					}else{
						alert('请输入正确的用户名和密码')
					}
				})
				.catch( err =>{
					console.log(err)
				})
			}
		},
		handleClear(){
			this.userNameIpt = ''
			this.passWordIpt = ''
			// Vue 实现响应式并不是数据发生变化之后 DOM 立即变化，而是按一定的策略进行 DOM 的更新
			// $nextTick 是在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM，
			this.$nextTick( () =>{
			    this.$refs.userName.focus()
			})
		},
		nameblurReg(){
			this.nameReg()
		},
		passblurReg(){
			this.passReg()
		}
	},
	created(){
		this.compHeight();
	},
	directives:{
		focus:{
			inserted:function(el){
			   el.focus()
			 }
		}
	}
}
</script>
<style scoped lang="less">
	.mt_20{margin-top:20px;}
	.ml_20{margin-left:20px;}
	.font20{font-size:20px;}
	@colorAbcdef:#abcdef;
	.loginWrap{
		width:100%;
		display:flex;
		justify-content:center;
		align-items:flex-end;
		font-size:0;
		.loginMain{
			align-self:center;
			border:1px solid @colorAbcdef;
			padding:20px;
		}
		label{font-size:14px;}
		.iptSty{
			padding:2px 4px;
			width:200px;
			font:12px/16px microsoft yahei;
			color:#333;
			border:1px solid @colorAbcdef;
		}
		.btnSty{
			display:inline-block;
			padding:2px 4px;
			font:14px/20px microsoft yahei;
			border:1px solid @colorAbcdef;
			color:#333;
		}
		.loginBtn{
			background:@colorAbcdef;
		}
		.errTip{
			margin-left:42px;
			height:20px;
			font:12px/20px microsoft yahei;
			color:#f00;
		}
	}
</style>
/*
Vue.directive('color-swatch', function (el, binding) {
  el.style.backgroundColor = binding.value
})

Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
 */