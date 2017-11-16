/**
 * Created by Administrator on 2017-11-14.
 */
import '../css/thanks.scss';
layui.use(['jquery'], function () {
  var $ = layui.jquery;
  $().ready(function () {
    var screenWidth = $(window).width();
    console.log(screenWidth);
    $('.banner').height(screenWidth*0.63);
    $('.tks').width(screenWidth*0.707).height(screenWidth*0.63);
  })
})