vue实现原理：
	vue数据双向绑定原理：
		vue数据双向绑定是通过数据劫持(Object.defineProperty())结合发布者-订阅者模式的方式来实现的。

		ECMAScript中有两种属性：数据属性 ， 访问器属性

		数据属性：修改属性默认的特性
		语法：Object.defineProperty(属性所在的对象,属性的名字,描述符json对象)
		例如：
		Object.defineProperty(Person,"name",{
			configurable:true,   //能否通过delete删除属性，默认为true
			enumerable：true,    //能否通过for-in循环返回属性，默认为true
			writable:true,       //能否修改属性的值，默认为true
			value:'Jone'         //为该属性设置新值，默认为undefined
		})
		访问器属性：不包含数据值，而是一对 getter函数和setter函数（非必须），在读取属性时会调用getter函数，在设置属性值时会调用setter函数
		语法：Object.defineProperty(代理的对象,代理对象属性的名字,描述符json对象)
		例如：
		var Book = {
			_year:2004,
			edition:1
		}
		Object.deineProperty(Book,"year",{
			configurable:true,  //能否通过delete删除属性，默认为true
			enumerable：true,   //能否通过for-in循环返回属性，默认为true
			get:function(){ 
				return `您访问了year属性，属性值为${this._year}`
			},
			set:function(newVal){
				// newVal是设置的新的属性值
				if(newVal > 2004){
					this._year = newVal;
					this.edition += newVal - 2004
				}
			}
		})
	思路分析：
		实现MVVM主要包括两个方面，数据变化更新视图，视图变化更新数据
			视图变化更新数据 : 可以通过事件监听，比如input标签监听 'input' 事件
			数据改变更新视图 : 重点就是通过Object.defineProperty()对属性设置一个set函数，当数据改变时就会触发这个函数，将更新的方法放到这个函数中就可以实现data更新view了
	整体实现思路：
		要实现数据的双向绑定，首先要对数据进行劫持监听，所以需要一个监听器(Observer),用来监听所有属性。
		如果属性发生变化，就需要告诉订阅者(Watcher)看是否需要更新。
		因为订阅者有多个，所以需要一个消息订阅器(Dep)来专门收集这些订阅者，然后在监听器(Observer)和订阅者(Watcher)之间进行统一管理。
		然后需要一个指令解析器(Compile):对每个节点元素进行扫描和解析，将相关指令对应初始化成一个订阅者(Watcher)，并替换模板属性或者绑定相应的函数，
		此时当订阅者(Wacther)接收到相应属性的变化，就会执行对应的更新函数，从而更新视图。
		总结：
			实现数据绑定的3个步骤：
				1.实现一个监听器(Observer),用来劫持并监听所有属性，如果有变动的，就通知订阅者
				2.实现一个订阅者(Watcher),用来可以收到属性的变化通知并执行相应的函数，从而更新视图
				3.实现一个解析器(Compile),可以扫描和解析每个节点的相关指令，并根据初始化模板数据以及初始化相应的订阅器
	实现过程：
		1.实现一个监听器(Observer)
			核心方法就是通过递归方法遍历所有属性值
			


// 1、实现Observer


