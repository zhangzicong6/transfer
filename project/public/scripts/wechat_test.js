function hrefs() {
	window.history.pushState('forward', null, location.pathname + location.search);
}

if(window.history && window.history.pushState) {
	window.onpopstate = async function() {
		location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU2NjY0NDYxOQ==&scene=126#wechat_redirect'
	}
}

hrefs()
