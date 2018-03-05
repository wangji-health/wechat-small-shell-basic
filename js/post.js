import '../layui/css/layui.css';
import '../css/post.scss';
import {context, htmlPath, Main} from './core/constants';
layui.use('jquery', function () {
  var $ = layui.jquery,
    layer = layui.layer;

  $().ready(function () {
    var url = location.href,
      // var url = 'http://33061990.ngrok.io/wechat-web/wechat/forwardPage/bind_doctor?user_id=170908101424883232',
      user_idIndex = url.indexOf('user_id='),
      aIndex = url.indexOf('&'),
      user_Id = url.slice(user_idIndex + 8, aIndex),
      doctor_phoneIndex = url.indexOf('doctor_phone='),
      doctor_phone = url.slice(doctor_phoneIndex + 13);
    console.log(user_Id);
    console.log(doctor_phone);
    //获得baby数量

    $.ajax({
      type: "get",
      url: Main.urll('/wechat-web/wechat/getMyBabyCount/') + user_Id,
      async: true,
      dataType: 'json',
      contentType: 'application/json;charset=utf-8',
      success: function (data) {
        console.log(data);
        if(data.status != 0){
          layer.msg(data.rspMsg);
          return false
        }
        var babyNumber = data.data;

        if (babyNumber != 0) {
          $('.babyNum').show()
        }

        // console.log('获取宝宝数量'+babyNumber);

      },
      error: function () {

      }
    });

    $('.top1').on('click', function () {
      location.href = `${context}/wechat/forwardPage/laboratorySheet?user_id=` + user_Id;
    })

    $('.top2').on('click', function () {
      location.href = `${context}/wechat/forwardPage/antivirus?user_id=` + user_Id;
    })

    $('.top3').on('click', function () {
      location.href = `${context}/wechat/forwardPage/inoculate?user_id=` + user_Id;
    })

    console.log(user_Id);

    var basic_url = Main.urll('/wechat-web/wechat/getButton?user_id=') + user_Id;
    //主页的按钮显示
    $.ajax({
      type: "get",
      url: basic_url,
      async: true,
      dataType: 'json',
      contentType: 'application/json;charset=utf-8',
      success: function (data) {

        console.log(data);
        if(data.status != 0){
          layer.msg(data.rspMsg);
          return false
        }

        var user = data.data;

        console.log(user);

        if (user == 1) {
          $('.out').show();
          $('.wd11').text('怀孕了？');
          $('.wd22').text('点击填写怀孕信息');

          $('.out').on('click', function () {
            location.href = `${context}/wechat/forwardPage/pregnant_info?user_id=` + user_Id + '&doctor_phone=' + doctor_phone;
          })
        } else if (user == 2) {
          $('.out').show();
          $('.wd11').text('宝宝出生了?');
          $('.wd22').text('点击填写分娩信息');

          $('.out').on('click', function () {
            location.href = `${context}/wechat/forwardPage/giveBirth_info?user_id=` + user_Id;
          })
        } else if (user == 0) {
          $('.out').hide();
        } else if (user == 3) {
          $('.out').show();
          $('.wd11').text('补充宝宝信息');
          $('.wd22').text('点击补充宝宝7月信息');

          $('.out').on('click', function () {
            location.href = `${context}/wechat/forwardPage/supplementary_info?user_id=` + user_Id;
          })
        }

      },
      error: function (data) {
        console.log(data)
      }
    });

  })

})