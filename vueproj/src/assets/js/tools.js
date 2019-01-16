var tools = {
	/*
	* 截取url中指定参数的值
	* name为需要获取的参数名
	* url为路径（省略直接截取当前页面的url）
	*/
	cutHref:function(name,url){
		var url = ((typeof url == 'string' && url !== '') ? url : window.location.href),
			href = url.split('?'),
			hashes = url.split('?')[1],
			result ={};
		if(href == url){return url}
		if(hashes){
			var hash = hashes.split('&');
			for(var i = 0; i < hash.length; i++){
				var vars = hash[i].split('=');
				result[vars[0]] = vars[1]
			}
		}
		return result[name]
	},
	/*
	* 封装函数 insertAfter(a,b) 在a的后面插入b
	*/
	insertAfter:function(targetNode,afterNode){
		var 
	}
}