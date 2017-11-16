import '../layui/css/layui.css';
import '../css/index.scss';
import md5 from '../js/md5.js';
import '../js/getOpenid.js';
import {context, htmlPath,Main} from './core/constants';

layui.use(['jquery', 'form'], function () {
  var $ = layui.jquery,
    layer = layui.layer,
    form = layui.form();
  $().ready(function () {
    // alert(location.href);
    var lightHeight = $('.ol-light').height();

    var lightWidth = lightHeight/1.185;
    $('.ol-light').width(lightWidth);

    $('.right').on('click',function () {
      location.href = `${context}/wechat/forwardForgetPsPage/register?doctor_phone=`+localStorage.phoneNum+'&openid='+layui.data('openid').openid;
      // location.href = `${context}/wechat/html_inline/register. html`;
    });

    $(".left").on("click", function() {
      location.href = `${context}/wechat/forwardForgetPsPage/forgetPS?doctor_phone=`+localStorage.phoneNum+'&openid='+layui.data('openid').openid;
      // location.href = `${context}/wechat/html_inline/forgetPS.html`;
    });

    //判断手机号码格式
    function phoneN() {
      var phone = $('.ol-phone').val();
      if (/^1[34578]\d{9}$/.test(phone) === false) {
        layer.msg('手机号码有误，请重填');
        return false
      } else {
        return true
      }
    }
    //是否显示密码
    $('.ol-light').on('click', function () {
      var input = document.getElementById('ol_ps');
      if (input.type == 'password') {
        input.type = 'Text';
        $('#dark').attr('src', require('../img/light.png'))

      } else if (input.type = 'Text') {
        input.type = 'password';
        $('#dark').attr('src', require('../img/dark.png'))
      }
    })

    //提交判定
    $('#ol-submit').on('click', function () {
      var password = md5($('.ol-ps').val()).toLocaleUpperCase();
      console.log(password);
      var url = Main.urll(`${context}/wechat/login/`) + $('.ol-phone').val() + '/' + password + '/' + 1 + '?openid=' + layui.data('openid').openid
      console.log(url);
      if (phoneN() === true) {
        $.ajax({
          type: 'get',
          url: url,
          async: true,
          success: function (data) {

            var user_ol = data;

            console.log(user_ol);

            if (data.status === 0) {
              layer.msg(data.rspMsg);
              layui.data('userData', {
                key: 'user2',
                value: data.data.id
              })

              var basic_url = Main.urll(`${context}/wechat/getPatientInfo/`) + layui.data('userData').user2;

              console.log(basic_url);

              $.ajax({
                type: 'get',
                url: basic_url,
                async: true,
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                success: function (data) {
                  console.log(data);

                  layui.data('userData', {
                    key: 'user2',
                    value: data.id
                  })

                  layui.data('userData', {
                    key: 'user',
                    value: data
                  })
                  var user_info = layui.data('userData').user.data;

                  if (user_info == null) {

                    location.href = `${context}/wechat/forwardPage/basic_info?user_id=`+ layui.data('userData').user2 +'&doctor_phone=' +localStorage.phoneNum

                  }

                  console.log(user_info);

                  console.log(user_info.full_Name && user_info.birth_Date && user_info.nation && user_info.is_Hepatitis && user_info.pregnant_Status)

                  if (!user_info.full_Name || !user_info.birth_Date || !user_info.nation || !user_info.is_Hepatitis || !user_info.pregnant_Status) {

                    location.href = `${context}/wechat/forwardPage/basic_info`+'?user_id='+ layui.data('userData').user2 + '&doctor_phone=' + localStorage.phoneNum

                  }

                  // var isTurnBingUrl = 'http://localhost:8080/wechat-web/wechat/trunBindDoctorLink?patient_user_id=' + user_Id + '&doctor_phone=' + doctor_phone
                  var isTurnBingUrl = Main.urll(`${context}/wechat/trunBindDoctorLink?patient_user_id=`)+layui.data('userData').user2+'&doctor_phone='+localStorage.phoneNum
                  console.log(isTurnBingUrl);
                  $.ajax({
                    type: 'get',
                    url: isTurnBingUrl,
                    async: true,
                    dataType: 'json',
                    contentType: 'application/json;charset=utf-8',
                    success: function (data) {
                      console.log(data)
                      if (data.data == true) {
                        // location.href = `${context}/wechat/${htmlPath}/bind_doctor.html`
                        location.href = `${context}/wechat/forwardPage/bind_doctor?user_id=`+layui.data('userData').user2+'&doctor_phone='+localStorage.phoneNum
                      } else if (data.data == false) {
                        // location.href = `${context}/wechat/${htmlPath}/post.html`
                        location.href = `${context}/wechat/forwardPage/post?user_id=`+layui.data('userData').user2+'&doctor_phone='+localStorage.phoneNum
                      }
                    },
                    error: function () {

                    }

                  })
                },
                error: function () {

                }
              })

              return true
            } else {
              layer.msg(data.rspMsg)
              return false
            }
          },
          error: function (data) {
            console.log(data)
          }
        })
      }
    })
    //保存用户

  })
})