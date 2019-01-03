<template>
  <div class="loginWrap" :style="winHeight">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <p class=title>登录</p>
      <el-form-item label="账号" prop="username">
        <el-input type="test" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passWord">
            <el-input type="password" v-model="ruleForm.passWord" autocomplete="off"></el-input>
          </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        winHeight:{
          height:""
        },
        ruleForm: {
          username:'',
          passWord:''
        },
        rules: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur' }
          ],
          passWord:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          let _this = this;
            console.log("登陆信息："+ this.ruleForm.username,this.ruleForm.passWord)
            this.$axios.post('/api/checklogin',{
              username:_this.ruleForm.username,
              passWord:_this.ruleForm.passWord
            })
            .then (res =>{
              //console.log(res.data[0])
              let data = res.data[0];
              if(data.username === _this.ruleForm.username && data.passWord === _this.ruleForm.passWord){
                //将用户信息存入本地
                //localStorage.setItem('userInfo',JSON.stringify(data))
                //let userInfoData = JSON.parse(localStorage.getItme('userInfo'))
                _this.$store.commit('saveInfo',data)
                //_this.$message({
                 // message: '恭喜你，登录成功',
                  //type: 'success'
                //});
                _this.$router.push('./index');
              }else{
                _this.$message.error('用户名或密码错了哦，登录失败');
              }
            })
            .catch(err =>{
              console.log(err)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getWinHeight(){
        this.winHeight.height = window.innerHeight +'px'
      },
      //弹窗
      open() {
        this.$alert('这是一段内容', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      }
    },
    created(){
      this.getWinHeight()
    }
  }
</script>
<style scoped>
.loginWrap{
    display: flex;
    justify-content:center;
    align-items:center;
  }
  .demo-ruleForm{
    padding:0.2rem 0.8rem 0.1rem 0;
   
  }
  .title{
    display: inline-block;
    margin-left:50px;
    font:bold 22px/30px microsoft yahei;
    color:#333;
    margin-bottom:10px;
  }
</style>