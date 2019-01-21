<template>
<div id="home">
        <!--<home-view></home-view>
        <news-view></news-view>-->
        <!--<router-link to="./HomeCon"></router-link>
        <router-link to="./NewsCon"></router-link>-->
        <ul>
        <li  class="nav-item" v-for="(item,index) in nav" @click="routerLink(index, item.path)" :key="index">
        <p :class="navIndex === index ? 'item-cn item-cn-active' : 'item-cn'">
    {{ item.title }}
    </p>
        </li>
        </ul>
        <router-view></router-view>
        
</div>
</template>


<script>
export default{
  name:"Home",
  data(){
  return{
  nav: [
      {title: '首页', path: '/'},
      {title: '列表', path: '/list'}
    ],
    navIndex: 0
  }
  },
  methods:{
	  routerLink(index, path) {
		  // 点击哪个路由就赋值给自定义的下标
		  this.navIndex = index;
		  // 路由跳转
		  this.$router.push(path)
		}
  }
}
</script>


<style scoped> 
#home ul{
display: flex;
        justify-content: space-around;
}
.nav-item {
  text-align: center;
  position: relative;
  display: inline-block;
  font-size: 14px;
  line-height: 25px;
}
    .item-cn {
  color: #1c2438;
  font-weight: 800;
}
.item-cn-active {
  color: #2d8cf0;
}


</style>