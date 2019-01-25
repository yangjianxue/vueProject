let tools = {
	/*
	* 截取url中指定参数的值
	* name为需要获取的参数名
	* url为路径（省略直接截取当前页面的url）
	* 调用: cutHref('name','http://www.baidu.com?name=test&age=18')   //test
	*/
	cutHref(name,url){
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
	* 仿照 ：parentNode.insertBefore(a,b) 在a的前面插入b
	* 封装函数 insertAfter(a,b) 在a的后面插入b
	*/
	insertAfter(targetNode,afterNode){
		let beforNode = afterNode.nextElementSibling,
			parentEle = targetNode.parentElement;
			console.log(beforNode)
		if(beforNode){
			parentEle.insertBefore(beforNode,targetNode)
		}else{
			parentEle.appendChild(targetNode)
		}
	},
	/*查看滚动条滚动的距离
	* w3c标准方法： window.pageXOffset/pageYOffset
	* ie8及以下：document.body.scrollTop + document.documentElement.scrollTop
	* */
	getScrollOffset(){
		if(window.pageXOffset){
			return {
				x:window.pageXOffset,
				y:window.pageYOffset
			}
		}else{
			return{
				x:document.body.scrollLeft + document.documentElement.scrollLeft,
				y:document.body.scrollTop + document.documentElement.scrollTop
			}
		}
	},
	/*
	* 查看窗口可视区域
	* w3c标准方法 ： window.innerWidth/innerHeight
	* 标准模式下 ： document.documentElement.clientWidth
	* 怪异(兼容)模式下 ： document.body.clientWidth
	* 区分标准模式和怪异模式 ： document.compatMode == 'BackCompat'(怪异模式)
	* */
	getViewportOffset(){
		if(window.innerWidth){
			return{
				w : window.innerWidth,
				h : window.innerHeight
			}
		}else if(documement.compatMode == 'BackCompat'){
			return{
				w : document.body.clientWidth,
				h : document.body.clientHeight
			}
		}else{
			return{
				w : document.documentElement.clientWidth,
				h : document.documentElement.clientHeight
			}
		}
	},
	/*
	* 查看元素的几何尺寸(包括border + padding + conent)
	* w3c标准方法 ： domEle.offsetWidth/offsetHeight
	* 兼容方法 ： domEle.getBoundingClientRect().width/.height/.left/.top/.right/.bottom
	* 注意： ie低版本不支持 domEle.getBoundingClientRect().width ,但是可以用 .right - .left
	* 返回值是number类型，不带px-->{w: 226, h: 326}
	* */
	getElementOffset(domEle){
		if(domEle.offsetWidth){
			return{
				w : domEle.offsetWidth,
				h : domEle.offsetHeight
			}
		}else if(domEle.getBoundingClientRect().width){
			return{
				w : domEle.getBoundingClientRect().width,
				h : domEle.getBoundingClientRect().height
			}
		}else{
			return{
				w : domEle.getBoundingClientRect().right - domEle.getBoundingClientRect().left,
				h : domEle.getBoundingClientRect().bottom - domEle.getBoundingClientRect().top
			}
		}
	},
	/*
	* 查看元素的实际尺寸(width)
	* w3c 标准方法 ： window.getComputedStyle(domEle,null).width
	* ie8及以下：domEle.currentStyle.width
	* 伪元素的宽高 ：window.getComputedStyle(domEle,pseudo).width
	* 注 ： pseudo是伪元素名字(默认为null)，prop和pseudo需要传字符串
	* 返回值是 string类型，带px -->500px
	 */
	getStyle(domEle,prop,pseudo = null){
		if(window.getComputedStyle){
			console.log(typeof window.getComputedStyle(domEle,pseudo)[prop])
			return window.getComputedStyle(domEle,pseudo)[prop]
		}else{
			return domEle.currentStyle[prop]
		}

	},
	/*
	* 求元素相对于文档的坐标
	* domEle.offsetTop/offsetLeft --对于无定位的父级元素，返回相对于文档的坐标
	* 							  --对于有定位的父级元素，返回相对于最近的有定位的父级的坐标
	* domEle.offsetParent -- 返回最近的有定位的父级
	* 					  -- 如有没有，返回body,body.offsetParent会返回null
	 */
	getElementPosition(domEle){
		console.log(domEle.offsetParent.nodeName.toLowerCase())
		let parentNodeName = domEle.offsetParent.nodeName.toLowerCase()
		let parentNode = domEle.parentNode;
		let t = domEle.offsetTop ;
		let l = domEle.offsetLeft;
		if(parentNodeName == "body"){
			return{
				x : t,
				y : l 
			}
		}else{
			while(parentNode.nodeName.toLowerCase() != "body" && parentNode != null){
				t = t + parentNode.offsetTop;
				y = l + parentNode.offsetLeft;
				parentNode = parentNode.offsetParent
			}
			return{
				x : t,
				y : y
			}
		}
	},
	/*
	* 封装事件处理函数
	* w3c标准事件处理 ： domEle.addEventListener('click',function(){},false)
	* ie事件处理函数 ： domEle.attachEvent('onclick',function(){})
	* domEle.onclick = handle
	 */
	addEvent(domEle,type,handle,captureType = false){
		if(domEle.addEventListener){
			domEle.addEventListener(type,handle,captureType)
		}else if(domEle.attachEvent){
			domEle.attachEvent('on'+type,function(){
				handle.call(domEle)
			})
		}else{
			domEle['on'+type] = handle
		}
	},
	/*
	* 取消事件绑定函数
	* w3c标准事件 ： domEle.removeEventListener('click',function(){},false)
	* ie事件处理函数 ： domEle.detachEvent('onclick',function(){})
	* domEle.onClick = null/false
	 */
	removeEvent(domEle,type,handle,caputurType = false){
		if(domEle.removeEventListener){
			domEle.removeEventListener(type,handle,caputurType)
		}else if(domEle.detachEvent){
			domEle.detachEvent('on'+type,function(){
				handle.call(handle)
			})
		}else{
			domEle.onClick = null
		}
	},
	/*
	* 获取事件源对象
	* w3c标准 ： event.target
	* ie方法：event.srcElement
	 */
	getTarget(e){
		return e.target || e.srcElement
	},
	/*
	* 取消冒泡
	* w3c标准方法：event.stopPropagation()
	* ie方法： window.event.cancelBubble = true
	 */
	stopBubble(e){
		if(e.stopPropagation){
			e.stopPropagation()
		}else{
			e.cancelBubble = false
		}
	},
	/*
	* 阻止默认事件
	* w3c标准方法 ： event.preventDefault()
	* ie方法 ： window.event.returnValue = false
	 */
	cancelHandle(e){
		if(e.preventDefault){
			e.preventDefault()
		}else{
			e.returnValue = false
		}
	}
}