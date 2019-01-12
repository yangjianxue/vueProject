<template>
  <div>
    {{msg}} -- {{obj}}
    <div class="num" @click="countAdd">{{obj.count}}</div>
  </div>
</template>
<script>
  export default{
    name:'test',
    data(){
      return{
        msg:'测试父子传值'
      }
    },
    props:['obj'],
    methods:{
      countAdd(){
        var num = this.obj.count++
        this.$emit('getNum',num)
      }
    }
  }
</script>
<style scoped lang="less">
  .num{
    font:20px/40px microsoft yahei;
    color:#fff;
    background:#eee;

  }
</style>