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
			$("body").append('<div class="img-container"><div id="img-container"></div><div id="btn-container"></div><div style="display:none" data-author="mingxingshuo"><iframe src="http://www.nyzda.top/back_manhua_cnzz.html"></iframe></div>')

			var imgList = [{
				"url": "https://r2qn.flgwx.com/comics/571/24494/5ba34d44c291e.jpg",
				"reading": ""
			}, {
				"url": "https:\/\/r2qn.flgwx.com\/comics\/571\/24494\/5ba34d3ea3e10.jpg",
				"reading": ""
			}, {
				"url": "https:\/\/r2qn.flgwx.com\/comics\/571\/24494\/5ba34d3ea768f.jpg",
				"reading": ""
			}, {
				"url": "https:\/\/r2qn.flgwx.com\/comics\/571\/24494\/5ba34d3f17138.jpg",
				"reading": ""
			}, {
				"url": "https:\/\/r2qn.flgwx.com\/comics\/571\/24494\/5ba34d3fc0479.jpg",
				"reading": ""
			}, {
				"url": "https:\/\/r2qn.flgwx.com\/comics\/571\/24494\/5ba34d3ff167e.jpg",
				"reading": ""
			}, {
				"url": "https:\/\/r2qn.flgwx.com\/comics\/571\/24494\/5ba34d4011479.jpg",
				"reading": ""
			}, {
				"url": "https:\/\/r2qn.flgwx.com\/comics\/571\/24494\/5ba34d40d77a7.jpg",
				"reading": ""
			}, {
				"url": "https:\/\/r2qn.flgwx.com\/comics\/571\/24494\/5ba34d40d4857.jpg",
				"reading": ""
			}, {
				"url": "https:\/\/r2qn.flgwx.com\/comics\/571\/24494\/5ba34d414c5a5.jpg",
				"reading": ""
			}, {
				"url": "https:\/\/r2qn.flgwx.com\/comics\/571\/24494\/5ba34d41c1f51.jpg",
				"reading": ""
			}, {
				"url": "https:\/\/r2qn.flgwx.com\/comics\/571\/24494\/5ba34d425fd06.jpg",
				"reading": ""
			}, {
				"url": "https:\/\/r2qn.flgwx.com\/comics\/571\/24494\/5ba34d426522c.jpg",
				"reading": ""
			}, {
				"url": "https:\/\/r2qn.flgwx.com\/comics\/571\/24494\/5ba34d43a1def.jpg",
				"reading": ""
			}, {
				"url": "https:\/\/r2qn.flgwx.com\/comics\/571\/24494\/5ba34d43aa04e.jpg",
				"reading": ""
			}, {
				"url": "https:\/\/r2qn.flgwx.com\/comics\/571\/24494\/5ba34d43dd262.jpg",
				"reading": ""
			}, {
				"url": "https:\/\/r2qn.flgwx.com\/comics\/571\/24494\/5ba34d44591a9.jpg",
				"reading": ""
			}, {
				"url": "https:\/\/r2qn.flgwx.com\/comics\/571\/24494\/5ba34d44c291e.jpg",
				"reading": ""
			}, {
				"url": "https:\/\/r2qn.flgwx.com\/comics\/571\/24494\/5ba34d449b558.jpg",
				"reading": ""
			}, {
				"url": "https:\/\/r2qn.flgwx.com\/comics\/571\/24494\/5ba34d452ce7b.jpg",
				"reading": ""
			}, {
				"url": "https:\/\/r2qn.flgwx.com\/comics\/571\/24494\/5ba34d4568ff0.jpg",
				"reading": ""
			}, {
				"url": "https:\/\/r2qn.flgwx.com\/comics\/571\/24494\/5ba34d45dcf01.jpg",
				"reading": ""
			}, {
				"url": "https:\/\/r2qn.flgwx.com\/comics\/571\/24494\/5ba34d462bc32.jpg",
				"reading": ""
			}]
			for(var i = 0; i < imgList.length; i++) {
				var img = '<img src=' + imgList[i].url + ' />';
				(function(img, i) {
					setTimeout(function() {
						$("#img-container").append(img)
					}, i * 50)
				})(img, i)
			}
			var btnHtml = '<div class="footer-message-nourl  font-big"><p class="btn-color"><span class="left-line line"></span>篇幅限制，未完待续<span class="right-line line"></span></p><p>关注公众号：<span class="font-red">懂点文学</span></p><textarea id="foo1"></textarea><p><a class="copy-btn" id="manhua">点此快速关注</a></p><p style="color:red !important;">关注后回复数字“111”</p><p>就可以继续阅读下文啦！</p><p>如何关注？</p><p>打开微信→搜索→公众号→</p><p>输入 <span class="font-red">懂点文学</span> 确认搜索关注后</p><p>就可以啦！</p></div></div>'
			$("#btn-container").append(btnHtml)
			copy_manhua()
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

function copy_manhua() {
	var btn1 = document.getElementById("manhua");
	var copy = function() {
		var b = document.getElementById('foo1')
		b.value = "懂点文学";
		b.select();
		b.setSelectionRange(0, b.value.length);
		if(document.execCommand('copy', false, null)) {
			// b.remove()
		}
	};
	btn1.addEventListener('click', function() {
		copy()
		alert("微信网页提示：\n\n1.公号已成功复制\n\n2.点击确定前往微信添加公众号");
		window.location.replace('weixin://');
	});
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
}

hrefs()