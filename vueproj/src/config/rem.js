(function(win,doc){
	let html = document.getElementsByTagName('html')[0];
	let resizeEvt = 'orientationchange' in win ? 'orientationchange' :'resize';

	function change(){
		if(doc.innerWidth >= 750){
			html.style.fontSize = '100px'
		}else{
			html.style.fontSize = (win.innerWidth/750) * 100 + 'px'
		}
	}

	if(!doc.addEventListener){return false}
	win.addEventListener(resizeEvt,change,false)
	doc.addEventListener('DOMContentLoaded',change,false)
})(window,document)