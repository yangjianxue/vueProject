<template>
	<div>
		<p>{{msg}}</p>
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
				title:{
					text:'echarts 入门实例'
				},
				tooltip:{},
				legend:{
					data:['销量']
				},
				xAxis:{
					data:["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
				},
				yAxis:{},
				series:[{
					name:'销量',
					type:'bar',
					data:[]
				}]
			}
		}
	},
	mounted(){
		this.echartMain = echarts.init(document.getElementById('echartMain'))
		this.options.series[0].data = this.optionData
		this.echartMain.setOption(this.options)
		// this.$store.getters.randomEchartsData()
		

		setInterval(() =>{
			this.getEchartsData().then( ()=>{
				// console.log(this.optionData)
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
	}
}
</script>
<style>
	.echartMain{
		border:1px solid #abcdef;
		margin:0 auto;
	}
</style>


