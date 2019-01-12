<template>
	<div>
		<div id="echartMain" class="echartMain" style="width:600px;height:400px;"></div>
	</div>
</template>
<script>
	import echarts from 'echarts';
	import {mapState,mapActions} from 'vuex'
export default{
	name:'part2',
	data(){
		return{
			msg:'我是part2',
			echartMain:'',
			options:{
				//标题
				title:{
					text:'实时在线人数',
					subtext:'数据纯属虚构'
				},
				// 工具提示
				tooltip:{
					show:true,
				},
				//图例
				legend:{
					data:['浏览器当前在线人数']
				},
				// x轴
				xAxis:{
					type: 'category',//横轴默认是category 是分离
					data:["Chrome","IE","Firfox","safari","Opera"]
				},
				// y轴
				yAxis:[
					{
						type:'value',//纵轴默认是数据 value
						axisLabel: {
				            formatter: '{value} W'
				        },
					}
				],
				// 核心配置
				series:[{
					name:'浏览器当前在线人数',  //和legend必须是对应的
					type:'bar',   //报表的类型 bar是柱状图 line是折线图 scatter是散点图
					data:[]       //核心数据
				}]
			},
			timer:''
		}
	},
	mounted(){
		this.echartMain = echarts.init(document.getElementById('echartMain'))
		this.options.series[0].data = this.optionData
		this.echartMain.setOption(this.options)
		// this.$store.getters.randomEchartsData()
		

		this.timer = setInterval(() =>{
			this.getEchartsData().then( ()=>{
				console.log(this.optionData)
				this.options.series[0].data = this.optionData
				this.echartMain.setOption(this.options)
			})
		},2000)

	},
	computed:{
		//从仓库store中获取option
		...mapState({
			optionData :state =>state.echartsData
		})
	},
	methods:{
		...mapActions(['getEchartsData'])
	},
	destroyed(){
		clearInterval(this.timer)
	}
}
</script>
<style lang="less">
	.echartMain{
		border:1px solid #abcdef;
		margin:50px auto 0;
	}
</style>


