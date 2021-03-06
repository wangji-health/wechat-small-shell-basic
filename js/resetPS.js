import '../layui/css/layui.css';
import '../css/resetPS.scss';
import md5 from '../js/md5.js';
import {context, htmlPath, Main} from './core/constants';

layui.use(['jquery', 'form'], function () {
  var $ = layui.jquery,
    layer = layui.layer,
    form = layui.form();
  $().ready(function () {

    var lightHeight = $('.cRes-light').height();
    var lightWidth = lightHeight/1.185;
    $('.cRes-light').width(lightWidth);
    //是否显示密码
    // var url = 'http://c7f31360.ngrok.io/wechat-web/wechat/judge/loginOrRegister?doctor_phone=6c0b513bb1c751a19ac6465b9db837e9&openid=c547e5d570040d00b1d4a89eb3c981d855e0d0eb952d2a4c3aa2a88a006f4b10'
     var url = location.href
      ,idIndex = url.indexOf('openid')

      ,openid = url.slice(idIndex+7)

      ,phoneStartIndex = url.indexOf('phone')+6

      ,phoneEndIndex = url.indexOf('&')

      ,phoneNum = url.slice(phoneStartIndex,phoneEndIndex);

    console.log(openid);
    console.log(phoneNum);
    $('.cRes-light').on('click', function () {
      var input = document.getElementById("cRes-ps");
      var input2 = document.getElementById("res-ps");
      console.log(input2)
      if (input.type == 'password') {
        input.type = 'Text';
        input2.type = 'Text';
        $('#dark').attr("src", require('../img/light.png'))
      } else if (input.type = 'Text') {
        input.type = 'password';
        input2.type = 'password';
        $('#dark').attr("src", require('../img/dark.png'))
      }
    })

    //判断背景色和事件的取消解绑
    function checkBgColor() {
      $("#reset-phoneNum").on("keyup", function () {

        if ($("#reset-phoneNum").val().length === 11) {
          //			document.getElementById("res-phoneNum").style.disabled ="disabled"
          $(".res-gvf").css("backgroundColor", "rgb(47,175,255)")
          isEvtBind()
        } else {
          $(".res-gvf").css("backgroundColor", "#cccccc").off("click");
        }
      })
    }

    //验证码的判断事件的解绑
    function isEvtBind() {
      $(".res-gvf").on("click", function () {
        $(".res-gvf").css("backgroundColor", "#cccccc").off("click");
        sendSecurityCode()
      })
    }

    //获取验证码倒计时
    function sendSecurityCode() {
      var phoneNum = $("#reset-phoneNum").val();
      console.log(phoneNum);
      var Url = Main.urll(`${context}/wechat/senMessageYunPian/`) + phoneNum;
      console.log(Url);
      $.ajax({
        type: "get",
        url: Url,
        async: true,
        success: function (data) {
          console.log(data)
          //					console.log("请求成功");
          layer.msg(data.rspMsg);
          if (data.status === 0) {
            $(".res-gvf").off("click").css("backgroundColor", "#cccccc");
            var clickTime = new Date().getTime();
            var tmp = 120
            $(".res-gvf").html(tmp + "s")
            var setTime = setInterval(function () {
              var nowTime = new Date();
              var realtime = parseInt((nowTime - clickTime) / 1000)
              console.log(realtime);
              var tmp = 120 - realtime;
              $(".res-gvf").html(tmp + "s");
              if (tmp <= 0) {
                if (phoneNum.length === 11) {
                  $(".res-gvf").css("backgroundColor", "rgb(47,175,255)")
                }
                clearInterval(setTime)
                $(".res-gvf").html("获得验证码")
                isEvtBind()
              }
            }, 1000)
          } else {
            layer.msg(data.rspMsg);
          }
        },
        error: function (data) {
          console.log(data);
          console.log("发送失败");
        }
      });
    }

    checkBgColor();

    // 判断密码规范

    // [/^[\S]{6,20}$/]

    //判断手机号码
    function phoneN() {
      var phone = $('#reset-phoneNum').val()
      if (/^1[34578]\d{9}$/.test(phone) === false) {
        layer.msg("手机号码有误，请重填");
        return false
      } else {
        return true
      }
    }

    //验证码
    function vfcode() {
      if ($('.res-vc').val().length != 6) {
        layer.msg('请输入正确的验证码')
        return false;
      } else {
        return true;
      }
    }

    //判断密码格式
    function checkPs() {
      if (/^[\S]{6,20}$/.test($('.res-ps').val()) === false) {
        layer.msg('请输入正确的密码');
        return false
      } else {
        return true
      }
    }

    //确认密码
    function confirm() {
      if ($('.cRes-ps').val() != $('.res-ps').val()) {
        layer.msg('两次密码不一致');
        return false;
      } else {
        return true;
      }
    }

    $("#res-submit").on("click", function () {
      var psMd5_1 = md5($('.res-ps').val()).toLocaleUpperCase()
      var psMd5_2 = md5($('.cRes-ps').val()).toLocaleUpperCase()
      //			console.log(psMd5_1)
      //			console.log(psMd5_2)
      var res_url = Main.urll(`${context}/wechat/forgetPassword`)
      console.log(res_url)
      if (phoneN() && vfcode() && checkPs() && confirm()) {
        layer.msg('成功')
        var data = {
          "user_Id": "",
          "user_Name": $('#reset-phoneNum').val(),
          "user_PassWord": psMd5_1,
          "user_Regrist_Time": "",
          "user_App_Type": -1,
          "user_App_version": "",
          "user_Device_Model": "",
          "user_Device_Version": "",
          "user_Last_LoginTime": "",
          "user_Num": "",
          "code": $('.res-vc').val(),
          "user_Type": 1,
          "upenid": ""
        }
        var nData = JSON.stringify(data);
        $.ajax({
          type: "patch",
          url: res_url,
          data: nData,
          dataType: 'json',
          contentType: 'application/json;charset=utf-8',
          success: function (data) {
            console.log(data)
            if (data.status === 0) {
              // location.href = `${context}/wechat/forwardPage/index`
              location.href = `${context}/wechat/judge/loginOrRegister?doctor_phone=` + phoneNum + "&openid=" + openid
              // wechat/judge/loginOrRegister?doctor_phone=" + doctor_phone + "&openid=" + encrypt_openid
            } else {
              layer.msg(data.rspMsg)
              return false;
            }
          },
          error: function (data) {
            console.log(data)
          }
        })
      }
    })
  })
})