/**
 * Created with feifei.
 * User: 835854385@qq.com
 * Date: 2017/6/23
 * Time: 10:35
 *
 */
var global = {
  name:'wo shi global',
  changeBg:function () {
    var h1 = document.getElementsByTagName('h1')[0]
    h1.style.color = '#000'
    h1.style.backgroundColor = '#fff'
  }
}
module.exports = global