window.onload = function() {
  function sfz (a){
    var str = a
    var n = str.substring(6,10)
    var y = str.substring(10,12)
    var r = str.substring(12,14)
    var sex = str.charAt(16)
    console.log('出生日期:' + n + '年' + y + '日' + r + '日')
    if (sex % 2 === 0){
      console.log('性别:女')
    } else {
      console.log('性别:男')
    }
  }
  sfz('320585200207050016');
}
