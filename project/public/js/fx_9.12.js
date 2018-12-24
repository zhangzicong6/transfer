$(function() {
	let tab1 = $("#tab1"), tab2 = $("#tab2"), aLis = $('.menu li'), $case = $("#case"), $comment = $("#comment"), mask = $(".pbOpacity");
	tab1.click(function () {
		aLis.removeClass('on')
		tab1.addClass("on")
		$comment.css("display", "none")
		$case.css("display", "block")
	})
	tab2.click(function () {
		aLis.removeClass('on')
		tab2.addClass("on")
		$case.css("display", "none")
		$comment.css("display", "block")
	})
	$(".btnWx").click(function () {
		aLis.removeClass('on')
		tab2.addClass("on")
		$case.css("display", "none")
		$comment.css("display", "block")
	})
	$(".mask-btn").click(function() {
		mask.css("display", "block")
	})
	$(".pbCcloseIcon").click(function() {
		mask.css("display", "none")
	})
})
