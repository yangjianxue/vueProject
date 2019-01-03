import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex)

//state - 需要共享的所有数据
const state = {
	userInfo:JSON.parse(sessionStorage.getItem('userInfo')),
	selfInfo:[],
	echartsData:[5,20,36,10,60,20]
}

const getters = {
	// randomData:state =>{
		
	// }
	// randomData(){
	// 	for (let i = 0;i <= )
	// },
	// randomEchartsData(){
	// 	setInterval(()=>{
	// 		console.log('111')
	// 	},1000)
	// }
}

//mutation - 同步操作共享数据
const mutations = {
	saveInfo(state,userInfo){
		// console.log(JSON.stringify(userInfo))
		//将数据存储到缓存中，保证刷新页面后数据也不会丢失
		sessionStorage.setItem('userInfo',JSON.stringify(userInfo))
		state.userInfo = userInfo;
	},
	selfInfoState(state,selfInfo){
		state.selfInfo = selfInfo
	},
	getEchartsData(state,echartsData){
		state.echartsData = echartsData
	}
}
//触发mutations
// this.$store.commit('saveInfo',data)


//定义action
const actions= {
	selfInfoState({commit}){
		return new Promise( (resolve,reject) =>{
			axios.get('/ap/users/yangjianxue')
			.then( res =>{
				// console.log(res.data)
				commit('selfInfoState',res.data)
				resolve()
			})
			.catch( err =>{
				console.log(err)
				reject()
			})
		})
	},
	getEchartsData({commit}){
		
		let dataArr = [
				[25,22,16,40,12,32],
				[15,21,30,20,70,40],
				[25,22,26,30,90,20],
				[35,23,16,40,10,24],
				[6,23,16,40,10,31],
				[20,23,16,40,10,26],
				[10,12,16,31,12,25],
				[12,25,14,40,21,14],
				[21,16,16,24,31,12],
				[30,19,18,40,14,23],
				[3,20,16,10,23,32],
				[8,30,20,14,14,43]
			]
		let timer = setInterval( ()=>{
			let index = Math.floor(Math.random() * 12)
			// console.log('索引' + index)
			// console.log(dataArr[index])
			commit('getEchartsData',dataArr[index])
			clearInterval(timer)
		},2000)
	}
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})