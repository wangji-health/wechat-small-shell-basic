import {Main} from './core/constants'
import '../css/invitationCode.scss';

layui.use(['jquery', 'form'],function () {
  var $ = layui.jquery,
    layer = layui.layer
  $().ready(function () {
    const screenWidth = $(document).width()
    const containerWidth = screenWidth * 0.76
    $('.container').width(containerWidth)
    $('.container').height(containerWidth * 1.17)
    $('.containerS').width(containerWidth)
    $('.containerS').height(containerWidth * 1.42)

    $('.rPost').on('click', function() {

      var RegExp = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/

      if(!RegExp.test($('.inputNum').val())) {
        layer.msg('请输入正确的手机号')
        return
      }

      if($('.inputCode').val() == 0) {
        layer.msg('请输入授权码');
        return
      }

      var getUrl = Main.urll(`/wechat-web/wechat/invitationCode/bind/${$('.inputCode').val()}/${$('.inputNum').val()}`)
      $.ajax({
        type: "get",
        url: getUrl,
        async: true,
        success: function(data) {
          console.log(data)
          if(data.status == 0) {

            $('.showOrHideSuccess').show();
            $('.close').on('click', function() {
              $('.showOrHideSuccess').hide();
            })

            $('.word').on('click',function(){
              location.href = `${Main.url}/wechat-web/wechat/forwardPageIndex`
            })

            $('.download').on('click', function() {
              $(function() {
                var u = navigator.userAgent,
                  app = navigator.appVersion;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
                var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                if(isAndroid) {
                  //这个是安卓操作系统
                  location.href = "http://sj.qq.com/myapp/detail.htm?apkName=com.hq.shell"
                }
                if(isIOS) {
                  //					    	这个是ios操作系统
                  location.href = "https://itunes.apple.com/cn/app/%E5%B0%8F%E8%B4%9D%E5%A3%B3shield/id962607998?mt=8"
                }
              });
            })

          } else {
            $('.showOrHide').show();
            $('.used').text(data.rspMsg)
            $('.back').on('click', function() {
              $('.showOrHide').hide();
            })
            return
          }
        },
        error: function() {
          layer.msg('请求失败')
          return
        }
      });
    })
  })
})
