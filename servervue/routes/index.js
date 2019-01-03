var express = require('express');
var router = express.Router();

/* GET home page. */
// router.post('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/checklogin', (req,res) =>{
	//接受用户名和密码
	let {username,passWord} = req.body;
	console.log(username,passWord) 
	res.send([
		{"username" :"admin","passWord" :"111111","trueName":"测试","id":'0'}
		// ,{"username" :"admin1","passWord" :"111111","trueName":"测试1","id":'1'}
		])

	// 去数据查询是否有该账户名和密码
});


module.exports = router;
