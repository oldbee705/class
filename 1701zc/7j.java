window.onload = init
function init(){
  var divTag = document.getElementById('aaa')
  divTag.innerHTML = '11111'
  divTag.setAttribute('style','width:50px ; height:50px ; background-color:#00c ; margin: 100px auto auto auto')
  console.log(divTag.getAttribute('style'))
}


