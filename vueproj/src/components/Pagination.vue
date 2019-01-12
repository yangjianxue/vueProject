<template>
	<div>
		<ul class="paginationCon clearfix mb_20 fr">
			<li @click="goFirstPage">first</li>
			<li @click="goPrevPage">prev</li>
			<li v-for="item in shouPageArr" @click="goCurrPage(item)" :class="{active:optionsVal.currIndex == (item)}">{{item}}</li>
			<li @click="goNextPage">next</li>
			<li @click="goLastPage">last</li>
		</ul>
	</div>
</template>
<script>
	export default{
		name:'pagination',
		data(){
			return{
				optionsVal:{
					//每页展示的条数
					pageSize:10,
					//默认展示的页码数
					shouPage:0,
					//总共的数据
					totalData:[],
					//当前展示第几页
					currIndex:1
				},
				//总共数据条数
				totalDataLen:0,
				//总共的页码数
				totalDataPage:0,
				shouPageArr:[]
			}
		},
		props:{
			options:{
				type:Object,
				default:function(){
					
				}
			}
		},
		methods:{
			//初始化
			initPagination(currIndex){
				this.initShowPageArr(currIndex)
				//计算总的数据条数
				this.totalDataLen = parseInt(this.optionsVal.totalData.length);
				//计算总的页码数
				this.totalDataPage = Math.ceil( this.totalDataLen/ parseInt(this.optionsVal.pageSize))
				this.goCurrPage(currIndex)
				
			},
			//当前显示的page总页数
			initShowPageArr(currShowPage){
				//currShowPage 为页码数组的最后一项数值
				this.shouPageArr = []
				let start = currShowPage - this.optionsVal.shouPage +1
				if(start < 1){
					start = 1; 
					currShowPage = this.optionsVal.shouPage
				}
				for(var i = start; i <= currShowPage;i++){
					this.shouPageArr.push(i)
				}
			},
			//首页
			goFirstPage(){
				this.optionsVal.currIndex = 1
				this.initShowPageArr(this.optionsVal.shouPage)
				this.goCurrPage(this.optionsVal.currIndex)
			},
			// 上一页
			goPrevPage(){
				if(this.optionsVal.currIndex == 1){
					console.log('已经是第一页')
				}else if(this.optionsVal.currIndex <= this.shouPageArr[0]){
					//处理当前当前显示的页码数，如果当前页码 <= 页码数组的第一位
					//那么截取页码数组的最后一位
					this.shouPageArr.pop();
					//然后为页码数组的第一位添加当前页-1的数据
					this.optionsVal.currIndex--
					this.shouPageArr.splice(0,0,this.optionsVal.currIndex)
					//例如当前为第三页   当前页码数组为[3,4,5,6,7]
					//点击上一页 将页码数组的最后一项删除为[3,4,5,6]
					//然后为页码数组的第一位添加当前页-1的数据 页码数组变为 [2,3,4,5,6]
					this.goCurrPage(this.optionsVal.currIndex)
				}else{
					this.optionsVal.currIndex--
					this.goCurrPage(this.optionsVal.currIndex)
				}
			},
			// 点击页码
			goCurrPage(currIndex){
				//开始坐标 =（当前页码 - 1） * 当前的每页的条数
				var start = (currIndex - 1) * this.optionsVal.pageSize
				//结束坐标 = Math.min（开始下标数+每页的条数，总的条数）
				var end = Math.min((start + this.optionsVal.pageSize),this.totalDataLen)
				//从总的数据中截取下标从开始坐标到结束坐标
				var initArr = this.optionsVal.totalData.slice(start,end)
				this.optionsVal.currIndex = currIndex;
				sessionStorage.setItem('currIndex',currIndex)
				//将截取出来的数据返回给父组件，父组件中的子组件通过自定义方法 getData 绑定方法的参数获取到这些数据
				this.$emit('getData',initArr)
			},
			// 下一页
			goNextPage(){
				if(this.optionsVal.currIndex == this.totalDataPage){
					console.log('已到达最后一页')
				}else if(this.optionsVal.currIndex >= this.optionsVal.shouPage){
					this.optionsVal.currIndex++
					this.shouPageArr.shift();
					this.shouPageArr.push(this.optionsVal.currIndex)
					this.goCurrPage(this.optionsVal.currIndex)
				}else{
					this.optionsVal.currIndex++
					this.goCurrPage(this.optionsVal.currIndex)
				}

			},
			// 最后一页
			goLastPage(){
				this.optionsVal.currIndex = this.totalDataPage
				this.initShowPageArr(this.optionsVal.currIndex)
				this.goCurrPage(this.optionsVal.currIndex)
			}
		},
		mounted(){
			this.optionsVal = this.options;
			this.optionsVal.currIndex = sessionStorage.getItem('currIndex') ? sessionStorage.getItem('currIndex') :this.optionsVal.currIndex
			this.initPagination(this.optionsVal.currIndex)
		}
	}
</script>
<style scoped lang="less">
	.paginationCon{
		display:inline-block;
		border:1px solid #eee;
		border-radius:4px;
		li{
			float:left;
			width:60px;
			font:16px/24px microsoft yahei;
			text-align:center;
			border-right:1px solid #eee;
			cursor:pointer;
			&:last-child{
				border-right:none;
			}
			&.btnIsActive,&.active{
				color:#fff;
				background:#fa788a
			}
			&:hover{
				color:#fa788a;
			}
		}
	}
</style>