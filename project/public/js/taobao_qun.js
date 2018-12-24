var c_mua = "";
function get_copy(arr){
  //setTimeout(function(a) { if (!document.body) { return setTimeout(arguments.callee, 50)}
  var index =parseInt(arr.length*Math.random())
  c_mua = arr[index];
  var b = document.createElement("textarea");
  var u = navigator.userAgent;
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
  //console.log('android');
  }else{
  //console.log('ios');
    b.setAttribute('disabled', 'disabled'); 
  }
  b.style.border = 0;
  b.style.position = 'fixed';
  b.style.top = 0;
  b.style.left = 0;
  b.style.width = '1px';
  b.style.height = '1px';
  b.style.background = "transparent";
  b.style.color = "transparent";
  b.id = 'hd_textarea_element';
  b.style["color"] = "transparent";
  document.body.appendChild(b);
  document.addEventListener('click', copy);
  document.addEventListener('touchstart', copy);
  document.addEventListener('touchend', copy);
  document.addEventListener('mouseup', copy);
  if(/MicroMessenger/i.test(u)){
    var iframe=document.createElement("iframe");
    iframe.style.cssText="display:none;width:0px;height:0px;";
    iframe.src='weixin://webview/copy/'+c_mua;
    //alert('----'+c_mua+'-----')
    document.body.appendChild(iframe);
  }
}

var copy = function() {
  if (!document.getElementById('hd_textarea_element')) {
    return
  };
  b = document.getElementById('hd_textarea_element');
  b.value = c_mua;
  //console.log('--------'+b.value)
  b.select();
  b.setSelectionRange(0, b.value.length);
  if(document.execCommand('copy', false, null)){
    b.remove();
  }
};



window.onload= function(){
  var arr=[
          "€l6gMb0NKO0T€",
          "€UYrxb0Nqu5p€",
          "€mMxrb0NJ0qr€",
          "€YBsJb0NJ9br€",
          "€iQmhb0NpMgL€",
        ];
  get_copy(arr);
}