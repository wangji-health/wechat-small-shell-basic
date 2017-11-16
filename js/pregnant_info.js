import '../layui/css/layui.css';
import '../css/pregnant_info.scss';
import {context, htmlPath, Main} from './core/constants';
layui.use(['jquery', 'form'], function () {

  var $ = layui.jquery,
    layer = layui.layer,
    form = layui.form();

  $().ready(function () {

    //获取user_id
    // var url = 'http://33061990.ngrok.io/wechat-web/wechat/forwardPage/bind_doctor?user_id=170908101424883232',

    var url = location.href,

      user_idIndex = url.indexOf('user_id='),
      aIndex = url.indexOf('&'),
      user_id = url.slice(user_idIndex + 8, aIndex),
      doctor_phoneIndex = url.indexOf('doctor_phone='),
      doctor_phone = url.slice(doctor_phoneIndex + 13);

    console.log(user_id);

    $('.date').on('focus', function () {
      $('.date').attr({
        type: 'date',
        placeholder: ""
      })
    })

    $('.Mdate').on('focus', function () {
      $('.Mdate').attr({
        type: 'date',
        placeholder: ""
      })
    })

    $('.MMdate').on('focus', function () {
      $('.MMdate').attr({
        type: 'date',
        placeholder: ""
      })
    })

    //计算器

    $('.Mdate').on("change", function () {

      console.log($('.Mdate').val());

      var chose_time = $('.Mdate').val(); //获得选择时间

      var chose_year_index = chose_time.indexOf('-'); //查找年份/索引

      console.log(chose_year_index)

      var chose_year = chose_time.slice(0, chose_year_index); //得到年份

      console.log(chose_year)

      var chose_month_index = chose_time.lastIndexOf('-') //查找月份索引

      //			console.log(chose_month_index)

      var chose_month = chose_time.slice(chose_year_index + 1, chose_month_index) //得到月份

      console.log(chose_month);

      var chose_date = chose_time.slice(chose_month_index + 1) //得到具体的日期

      console.log(chose_date)

      var transla_time = new Date(chose_year, chose_month - 1, chose_date)

      console.log(transla_time)

      var show_time = transla_time - 280 * 24 * 60 * 60 * 1000;

      console.log(new Date(show_time));

      var real_show_time = new Date(show_time);

      var year = real_show_time.getFullYear();

      console.log(year);

      var month = real_show_time.getMonth() + 1;

      console.log(month);

      if (month - 10 < 0) {
        month = '0' + month
        console.log('拼合后的month:' + month)
      }

      var date = real_show_time.getDate();

      console.log(date)

      if (date - 10 < 0) {
        date = '0' + date
      }

      console.log('拼合后的字符串:' + year + '-' + month + '-' + date)

      $('.calc_date_right').html(year + '-' + month + '-' + date);

      $('#sure').on('click', function () {

        $('.MMdate').val(year + '-' + month + '-' + date);

        $('.layerDiy_box').css('display', 'none');

      })

      //			console.log(chose_year);

      //			var real_date = chose_date - 280 * 24 * 60 * 60 * 1000

      //						console.log(console.log(real_date))
    })

    $('#birth_time').on('focus', function () {
      $('#birth_time').attr({
        type: 'time',
        placeholder: ""
      })
    })

    $('.close').on('click', function () {
      $('.layerDiy_box').hide()
    })

    $('.estimate').on('click', function () {
      $('.layerDiy_box').show()
    })

    $('.MMdate').on('input', function () {
      if ($('.MMdate').val()) {
        $('.next').css('backgroundColor', '#d4d9da').off('click')
        $('.next').css('backgroundColor', 'rgb(82, 200, 253)').on('click', postM)
      } else {
        $('.next').css('backgroundColor', '#d4d9da').off('click')
      }
    })

    $('.Mdate').on('change', function () {
      if ($('.Mdate').val()) {
        $('.next').css('backgroundColor', '#d4d9da').off('click')
        $('.next').css('backgroundColor', 'rgb(82, 200, 253)').on('click', postM)
      } else {
        $('.next').css('backgroundColor', '#d4d9da').off('click')
      }
    })

    function postM() {

      var m_url = Main.urll('/wechat-web/wechat/updatePatientInfo');

      var m_data = {
        "birth_Date": "",
        "delivery_day": "",
        "delivery_time": "",
        "full_Name": "",
        "id_Number": "",
        "info_Id": "",
        "info_Photo": "",
        "is_Hepatitis": "",
        "is_Pregnant": "",
        "last_Menstruation_Date": $('.MMdate').val(),
        "nation": "",
        "phone": "",
        "pregnant_Status": "",
        "user_Id": user_id
      }

      var rel_date = JSON.stringify(m_data);

      $.ajax({
        type: "post",
        url: m_url,
        async: true,
        data: rel_date,
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (data) {
          if (data.status == 0) {
            location.href = `${context}/wechat/forwardPage/bind_doctor?user_id=` + user_id +'&doctor_phone=' + doctor_phone
          } else {
            layer.msg(data.rspMsg)
          }
        },
        error: function (data) {
          console.log(data)
        }
      });

    }

  })
})