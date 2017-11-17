import '../layui/css/layui.css';
import '../css/inoculate.scss';
import {context, htmlPath, Main} from './core/constants';

layui.use(['jquery', 'laydate'], function () {
  var $ = layui.jquery,
    layer = layui.layer
  laydate = layui.laydate;

  var bannerWidth = $('.banner').css('width');
  console.log(bannerWidth);
  $('.banner').height(parseInt(bannerWidth) / 1.39);
  console.log(parseInt(bannerWidth) / 1.39);
  $('.hasB').on('click', function () {
    location.href = 'https://mp.weixin.qq.com/s/XTjZBJgFsTYtwLSYCYYS7g';
  })
  //监听开始服用日期
  $('#hepatitisD').on('change', function () {
    $('#hepatitisT').val($('#hepatitisD').val())

    console.log($('#hepatitisT').val())
  })

  $('#hepatitisDS').on('change', function () {
    $('#hepatitisTS').val($('#hepatitisDS').val())
  })

  $('#hepatitisDT').on('change', function () {
    $('#hepatitisTT').val($('#hepatitisDT').val())
  })

  //监听结束服用日期
  $('#immunoglobulinD').on('change', function () {
    $('#immunoglobulinT').val($('#immunoglobulinD').val())
  })

  //获取user_id
  // var url = 'http://33061990.ngrok.io/wechat-web/wechat/forwardPage/bind_doctor?user_id=170908101424883232',

  var url = location.href,

    userId_startIndex = url.indexOf('user_id=') + 8,

    user_Id = url.slice(userId_startIndex);

  console.log(user_Id);

  //获得baby数量

  $.ajax({
    type: "get",
    url: Main.urll('/wechat-web/wechat/getMyBabyCount/') + user_Id,
    async: true,
    dataType: 'json',
    contentType: 'application/json;charset=utf-8',
    success: function (data) {
      console.log(data);

      var baby_number = data.data;

      sessionStorage.babyNum = baby_number;

      console.log(baby_number);

      if (baby_number == 1 || baby_number == 0) {
        $('.out').hide()
      } else if (baby_number == 2) {
        $('.out').show()
        $('.num3').hide()
      } else if (baby_number == 3) {
        $('.out').show()
        $('.num3').show()
      }

    },
    error: function () {

    }
  });

  //孩子注射疫苗切换

  $('.number').on('click', '.num', function () {

    var index = $(this).index()

    console.log(index)

    $('.focus').removeClass('focus')

    $(this).find('.baby').addClass('focus');

    $('.bigC').hide().eq(index).show()
  })

  //监听未接种按钮

  //	$('.hepatitisLabel').on('click', function() {
  //		$('.delBox').show();
  //
  //		$('.date1').on('change', function() {
  //			$('#hepatitisT').val($('.date1').val());
  //			$('.delBox').hide();
  //		})
  //
  //		$('.inNo').on('click', function() {
  //			$('#hepatitisT').val('未接种');
  //			$('.delBox').hide();
  //		})
  //	})

  //取消接种框
  $('.cancel').on('click', function () {
    $('.delBox').hide();
  })
  // $('.inYes').on('click',function () {
  //   $('.delBox').hide();
  // })

  //封装的弹框事件
  function ino(label, textt, datee, no) {
    $(label).on('click', function () {
      $('.delBox').show();
      $(datee).on('change', function () {
        $(textt).val($(datee).val());
        $('.delBox').hide();
      })

      $(no).on('click', function () {
        $(textt).val('未接种');
        $('.delBox').hide();
      })
    })
  }

  //baby1
  $('.label').on('click', function () {

    var index = $(this).index()

    console.log(index)

    switch (index) {
      case 1:
        $('.dt2').hide();
        $('.noo2').hide();
        $('.dt').hide();
        $('.date1').show();
        $('.noo').hide();
        $('.dt1').hide();
        $('.noo1').hide();
        $('.inNo1').show();
        				// alert(index)
        break;
      case 3:
        $('.dt2').hide();
        $('.noo2').hide();
        $('.dt').hide();
        $('.date3').show();
        $('.noo').hide();
        $('.dt1').hide();
        $('.noo1').hide();
        $('.inNo3').show();
        				// alert(index)
        break;
      case 5:
        $('.dt2').hide();
        $('.noo2').hide();
        $('.dt').hide();
        $('.date5').show();
        $('.noo').hide();
        $('.dt1').hide();
        $('.noo1').hide();
        $('.inNo5').show();
        				// alert(index)
        break;
      case 7:
        $('.dt2').hide();
        $('.noo2').hide();
        $('.dt').hide();
        $('.date7').show();
        $('.noo').hide();
        $('.dt1').hide();
        $('.noo1').hide();
        $('.inNo7').show();
        				// alert(index)
        break;
      default:

    }

  })

  //baby2
  $('.label2').on('click', function () {

    var index = $(this).index()

    console.log(index)

    switch (index) {
      case 1:
        $('.dt2').hide();
        $('.noo2').hide();
        $('.dt1').hide();
        $('.dt').hide();
        $('.date1-1').show();
        $('.noo1').hide();
        $('.noo').hide();
        $('.inNo1-1').show();
        //				alert(index)
        break;
      case 3:
        $('.dt2').hide();
        $('.noo2').hide();
        $('.dt1').hide();
        $('.dt').hide();
        $('.date3-1').show();
        $('.noo1').hide();
        $('.noo').hide();
        $('.inNo3-1').show();
        //				alert(index)
        break;
      case 5:
        $('.dt2').hide();
        $('.noo2').hide();
        $('.dt1').hide();
        $('.dt').hide();
        $('.date5-1').show();
        $('.noo1').hide();
        $('.noo').hide();
        $('.inNo5-1').show();
        //				alert(index)
        break;
      case 7:
        $('.dt2').hide();
        $('.noo2').hide();
        $('.dt1').hide();
        $('.dt').hide();
        $('.date7-1').show();
        $('.noo1').hide();
        $('.noo').hide();
        $('.inNo7-1').show();
        //				alert(index)
        break;
      default:

    }

  })

  //baby3

  $('.label3').on('click', function () {

    var index = $(this).index()

    console.log(index)

    switch (index) {
      case 1:
        $('.dt2').hide();
        $('.dt1').hide();
        $('.dt').hide();
        $('.date1-2').show();
        $('.noo2').hide();
        $('.noo1').hide();
        $('.noo').hide();
        $('.inNo1-2').show();
        //				alert(index)
        break;
      case 3:
        $('.dt2').hide();
        $('.dt1').hide();
        $('.dt').hide();
        $('.date3-2').show();
        $('.noo2').hide();
        $('.noo1').hide();
        $('.noo').hide();
        $('.inNo3-2').show();
        //				alert(index)
        break;
      case 5:
        $('.dt2').hide();
        $('.dt1').hide();
        $('.dt').hide();
        $('.date5-2').show();
        $('.noo2').hide();
        $('.noo1').hide();
        $('.noo').hide();
        $('.inNo5-2').show();
        //				alert(index)
        break;
      case 7:
        $('.dt2').hide();
        $('.dt1').hide();
        $('.dt').hide();
        $('.date7-2').show();
        $('.noo2').hide();
        $('.noo1').hide();
        $('.noo').hide();
        $('.inNo7-2').show();
        //				alert(index)
        break;
    }

  })

  $('.save').on('click', function () {

    if (sessionStorage.babyNum == 1 || sessionStorage.babyNum == 0) {
      var dataBaby = [{
        "baby_No": 1,
        "first_HBIG_Day_Can_Be_Edited": 1,
        "first_HBV_Day_Can_Be_Edited": 1,
        "first_Inoculated_HBV_Day": $('#hepatitisT').val(),
        "first_Inoculated_HBIG_Day": $('#immunoglobulinT').val(),
        "second_HBV_Day_Can_Be_Edited": 1,
        "second_Inoculated_HBV_Day": $('#hepatitisTS').val(),
        "third_HBV_Day_Can_Be_Edited": 1,
        "third_Inoculated_HBV_Day": $('#hepatitisTT').val(),
        "user_Id": user_Id
      }]
    } else if (sessionStorage.babyNum == 2) {
      dataBaby = [{
        "baby_No": 1,
        "first_HBIG_Day_Can_Be_Edited": 1,
        "first_HBV_Day_Can_Be_Edited": 1,
        "first_Inoculated_HBIG_Day": $('#immunoglobulinT').val(),
        "first_Inoculated_HBV_Day": $('#hepatitisT').val(),
        "second_HBV_Day_Can_Be_Edited": 1,
        "second_Inoculated_HBV_Day": $('#hepatitisTS').val(),
        "third_HBV_Day_Can_Be_Edited": 1,
        "third_Inoculated_HBV_Day": $('#hepatitisTT').val(),
        "user_Id": user_Id
      }, {
        "baby_No": 2,
        "first_HBIG_Day_Can_Be_Edited": 1,
        "first_HBV_Day_Can_Be_Edited": 1,
        "first_Inoculated_HBIG_Day": $('#immunoglobulinT2').val(),
        "first_Inoculated_HBV_Day": $('#hepatitisT2').val(),
        "second_HBV_Day_Can_Be_Edited": 1,
        "second_Inoculated_HBV_Day": $('#hepatitisTS2').val(),
        "third_HBV_Day_Can_Be_Edited": 1,
        "third_Inoculated_HBV_Day": $('#hepatitisTT2').val(),
        "user_Id": user_Id
      }]
    } else if (sessionStorage.babyNum == 3) {
      dataBaby = [{
        "baby_No": 1,
        "first_HBIG_Day_Can_Be_Edited": 1,
        "first_HBV_Day_Can_Be_Edited": 1,
        "first_Inoculated_HBIG_Day": $('#immunoglobulinT').val(),
        "first_Inoculated_HBV_Day": $('#hepatitisT').val(),
        "second_HBV_Day_Can_Be_Edited": 1,
        "second_Inoculated_HBV_Day": $('#hepatitisTS').val(),
        "third_HBV_Day_Can_Be_Edited": 1,
        "third_Inoculated_HBV_Day": $('#hepatitisTT').val(),
        "user_Id": user_Id
      }, {
        "baby_No": 2,
        "first_HBIG_Day_Can_Be_Edited": 1,
        "first_HBV_Day_Can_Be_Edited": 1,
        "first_Inoculated_HBIG_Day": $('#immunoglobulinT2').val(),
        "first_Inoculated_HBV_Day": $('#hepatitisT2').val(),
        "second_HBV_Day_Can_Be_Edited": 1,
        "second_Inoculated_HBV_Day": $('#hepatitisTS2').val(),
        "third_HBV_Day_Can_Be_Edited": 1,
        "third_Inoculated_HBV_Day": $('#hepatitisTT2').val(),
        "user_Id": user_Id
      }, {
        "baby_No": 3,
        "first_HBIG_Day_Can_Be_Edited": 1,
        "first_HBV_Day_Can_Be_Edited": 1,
        "first_Inoculated_HBIG_Day": $('#immunoglobulinT3').val(),
        "first_Inoculated_HBV_Day": $('#hepatitisT3').val(),
        "second_HBV_Day_Can_Be_Edited": 1,
        "second_Inoculated_HBV_Day": $('#hepatitisTS3').val(),
        "third_HBV_Day_Can_Be_Edited": 1,
        "third_Inoculated_HBV_Day": $('#hepatitisTT3').val(),
        "user_Id": user_Id
      }]
    }

    var babyNumJson = JSON.stringify(dataBaby);

    $.ajax({
      type: "post",
      url: Main.urll('/wechat-web/wechat/editMyBabyInoculatedInfoExtend'),
      async: true,
      dataType: 'json',
      contentType: 'application/json;charset=utf-8',
      data: babyNumJson,
      success: function (data) {
        console.log(data)

        if (data.status == 0) {
          location.href = `${context}/wechat/forwardPage/post?user_id=` + user_Id+'&doctor_phone=';
        }
      },
      error: function () {

      }
    });
  })

  //获得孩子接种情况

  $.ajax({
    type: "get",
    url: Main.urll('/wechat-web/wechat/getMyBabyInoculatedInfoExtendList/') + user_Id,
    async: true,
    dataType: 'json',
    contentType: 'application/json;charset=utf-8',
    success: function (data) {

      console.log(data);
      $('#hepatitisT').val(data.data[0].first_Inoculated_HBV_Day);
      $('#immunoglobulinT').val(data.data[0].first_Inoculated_HBIG_Day);
      $('#hepatitisTS').val(data.data[0].second_Inoculated_HBV_Day);
      $('#hepatitisTT').val(data.data[0].third_Inoculated_HBV_Day);

      if (data.data[1]) {
        $('#immunoglobulinT2').val(data.data[1].first_Inoculated_HBIG_Day);
        $('#hepatitisT2').val(data.data[1].first_Inoculated_HBV_Day);
        $('#hepatitisTS2').val(data.data[1].second_Inoculated_HBV_Day);
        $('#hepatitisTT2').val(data.data[1].third_Inoculated_HBV_Day);
      }

      if (data.data[2]) {
        $('#immunoglobulinT3').val(data.data[2].first_Inoculated_HBIG_Day);
        $('#hepatitisT3').val(data.data[2].first_Inoculated_HBV_Day);
        $('#hepatitisTS3').val(data.data[2].second_Inoculated_HBV_Day);
        $('#hepatitisTT3').val(data.data[2].third_Inoculated_HBV_Day);
      }


      var firstChild = data.data[0];
      console.log(firstChild)
      var secondChild = data.data[1];
      console.log(secondChild)
      var thirdChild = data.data[2];
      console.log(thirdChild)
      //firstChild firstZ canEdited?

      if (firstChild.first_HBIG_Day_Can_Be_Edited == 0 && firstChild.first_HBV_Day_Can_Be_Edited == 0) {
        $('.first_img').hide();
      } else {
        ino('.hepatitisLabel', '#hepatitisT', '.date1', '.inNo1');
        ino('.immunoglobulinLabel', '#immunoglobulinT', '.date3', '.inNo3');
      }

      //firstChild secondZ canEdited?

      if (firstChild.second_HBV_Day_Can_Be_Edited == 0) {
        $('.second_img').hide();
      } else {
        ino('.hepatitisLabel2', '#hepatitisTS', '.date5', '.inNo5');
      }

      //firstChild thirdZ canEdited?

      if (firstChild.third_HBV_Day_Can_Be_Edited == 0) {
        $('.third_img').hide();
      } else {
        ino('.hepatitisLabel3', '#hepatitisTT', '.date7', '.inNo7');
      }

      //secondChild firstZ canEdited?

      if (secondChild) {
        if (secondChild.first_HBIG_Day_Can_Be_Edited == 0 && secondChild.first_HBV_Day_Can_Be_Edited == 0) {
          $('.first_img2').hide();
        } else {
          ino('.hepatitisLabel2-1', '#hepatitisT2', '.date1-1', '.inNo1-1');
          ino('.immunoglobulinLabel2', '#immunoglobulinT2', '.date3-1', '.inNo3-1');
        }
        //secondChild secondZ canEdited?

        if (secondChild.second_HBV_Day_Can_Be_Edited == 0) {
          $('.second_img2').hide();
        } else {
          ino('.hepatitisLabel2-2', '#hepatitisTS2', '.date5-1', '.inNo5-1');
        }
        //secondChild thirdZ canEdited?

        if (secondChild.third_HBV_Day_Can_Be_Edited == 0) {
          $('.third_img2').hide();
        } else {
          ino('.hepatitisLabel2-3', '#hepatitisTT2', '.date7-1', '.inNo7-1');
        }

      }

      if (thirdChild) {
        //thirdChild firstZ canEdited?

        if (thirdChild.first_HBIG_Day_Can_Be_Edited == 0 && thirdChild.first_HBV_Day_Can_Be_Edited == 0) {
          $('.first_img3').hide();
        } else {
          ino('.hepatitisLabel3-1', '#hepatitisT3', '.date1-2', '.inNo1-2');
          ino('.immunoglobulinLabel3', '#immunoglobulinT3', '.date3-2', '.inNo3-2');

        }

        //thirdChild secondZ canEdited?

        if (thirdChild.second_HBV_Day_Can_Be_Edited == 0) {
          $('.second_img3').hide();
        } else {
          ino('.hepatitisLabel3-2', '#hepatitisTS3', '.date5-2', '.inNo5-2');
        }

        //thirdChild thirdZ canEdited?

        if (thirdChild.third_HBV_Day_Can_Be_Edited == 0) {
          $('.third_img3').hide();
        } else {
          ino('.hepatitisLabel3-3', '#hepatitisTT3', '.date7-2', '.inNo7-2');
        }
      }


    },
    error: function () {

    }
  });
})