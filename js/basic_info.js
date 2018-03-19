import '../layui/css/layui.css';
import '../css/basic_info.scss';
import '../js/add_info.js';
import {context, htmlPath, Main, appId} from './core/constants';
layui.use(['jquery', 'form'], function () {
  var wxUrl = Main.urll('/wechat-web/wechat/getWXConfig');
  var $ = layui.jquery,
    layer = layui.layer,
    form = layui.form();  

  $().ready(function () {

    //阻止缓存
    window.onpageshow = function(e) {
      if(e.persisted) {
        location.reload()
      }
    };

    var url = location.href

      // var url = 'http://33061990.ngrok.io/wechat-web/wechat/forwardPage/?user_id=170908101424883232&doctor_phone=6c0b513bb1c751a19ac6465b9db837e9'

      ,
      userId_startIndex = url.indexOf('user_id=') + 8

      ,
      userId_endIndex = url.indexOf("&")

      ,
      user_Id = url.slice(userId_startIndex, userId_endIndex)

      ,
      doctorPhone_startIndex = url.indexOf('doctor_phone=') + 13

      ,
      doctor_Phone = url.slice(doctorPhone_startIndex);

    console.log(user_Id);

    console.log(doctor_Phone);

    //民族
    var nation = null;
    form.on('radio(nation)', function (data) {
      console.log(data.elem); //得到radio原始DOM对象
      console.log(data.value); //被点击的radio的value值
      nation = data.value
    });
    //是否乙肝
    var isH = null;
    form.on('radio(isH)', function (data) {
      console.log(data.value);
      isH = data.value;
      sessionStorage.isH = JSON.stringify(isH);
      if(sessionStorage.isP){
        if(JSON.parse(sessionStorage.isP) ==0){
          $('.next').text('完成')
        }else{
          if (isH == 0) {
            $('.next').text('完成')
          }else if(isH == 1){
            $('.next').text('下一步')
          }
        }
      }else{
        if (isH == 0) {
          $('.next').text('完成')
        }else if(isH == 1){
          $('.next').text('下一步')
        }
      }

    });
    //怀孕状态
    var isPregnant = null;

    form.on('radio(isPregnant)', function (data) {

      console.log(data.value);
      isPregnant = data.value;
      sessionStorage.isP = JSON.stringify(isPregnant);
      if(sessionStorage.isH){
        if(JSON.parse(sessionStorage.isH) == 0){
          $('.next').html('完成')
        }else{
          if (isPregnant == 0) {
            $('.next').html('完成')
          } else {
            $('.next').html('下一步')
          }
        }
      }else{
        if (isPregnant == 0) {
          $('.next').html('完成')
        } else {
          $('.next').html('下一步')
        }
      }


      if (data.value == 1) {
        $('.last_menses').css('display', 'block');
        $('.birth_time').css('display', 'none')

      } else if (data.value == 0) {
        $('.last_menses').css('display', 'none');
        $('.birth_time').css('display', 'none')

      } else if (data.value == 2) {
        $('.last_menses').css('display', 'block');
        $('.birth_time').css('display', 'block')

      }
      //			if(data.value == 1){
      //
      //			}
    });


    $('.date').on('change',function () {
      $('.realdate').val($('.date').val())
    })

    $('.MMdate').on('change', function () {
      $('.realMMdate').val($('.MMdate').val())
    })

    //计算器

    $('.Mdate').on("change", function () {
      console.log($('.Mdate').val());
      $('.realDate').val($('.Mdate').val());
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
      //			else{
      //				month = month+1
      //				console.log('拼合后的month:' + month)
      //			}

      var date = real_show_time.getDate();

      console.log(date)

      if (date - 10 < 0) {
        date = '0' + date
      }

      console.log('拼合后的字符串:' + year + '-' + month + '-' + date)

      $('.calc_date_right').html(year + '-' + month + '-' + date);

      $('#sure').on('click', function () {

        $('.realMMdate').val(year + '-' + month + '-' + date);

        $('.layerDiy_box').css('display', 'none');

      })

      //			console.log(chose_year);

      //			var real_date = chose_date - 280 * 24 * 60 * 60 * 1000

      //						console.log(console.log(real_date))
    })

    $('.MMMdate').on('change', function () {
        $('.realMMMdate').val($('.MMMdate').val());
    });

    $('#birth_time').on('change', function () {
      $('#realBirth_time').val($('#birth_time').val());
    })

    $('.estimate').on('click', function () {
      $('.layerDiy_box').css('display', 'block')
    })

    $('.close').on('click', function () {
      $('.layerDiy_box').css('display', 'none')
    })

    //校验字符长度

    String.prototype.calcStr = function () {
      var len = 0;
      for (var i = 0; i < this.length; i++) {
        if (this.charCodeAt(i) > 127 || this.charCodeAt(i) == 94) {
          len += 2;
        } else {
          len++;
        }
      }
      return len;
    }

    //判断名字规范

    function checkName() {
      if ($('.real-name').val().length == 0) {
        layer.msg('请填写真实姓名')
        return false
      } else if ($('.real-name').val().calcStr() > 10) {
        layer.msg('姓名格式不正确，长度至多为五个汉字或者10个英文字母')
        return false
      } else {
        return true
      }
    }

    //判断出生日期
    function birthTime() {
      if ($('.date').val().length == 0) {
        layer.msg('请选择出生日期')
        return false
      } else {
        return true
      }
    }

    //判断民族的返回值
    function isChoseNation() {
      for (var i = 0; i <= 2; i++) {
        if ($('.nation').eq(i).prop('checked')) {
          return i
        }
      }
    }

    //判断民族是否选择
    function Nation() {
      if (typeof isChoseNation() == 'number') {
        return true
      } else {
        layer.msg('请选择民族')
        return false
      }
    }

    //判断乙肝的返回值

    function isChoseHepatitis() {
      for (var i = 0; i <= 1; i++) {
        if ($('.heP').eq(i).prop('checked')) {
          return i
        }
      }
    }

    //判断乙肝是否选择
    function Hepatitis() {
      if (typeof isChoseHepatitis() == 'number') {
        return true
      } else {
        layer.msg('请选择是否乙肝');
        return false
      }
    }

    //判断怀孕状态

    function isChosePregnant() {
      for (var i = 0; i <= 2; i++) {
        if ($('.isPr').eq(i).prop('checked')) {
          return i
        }
      }
    }

    function Pregnant() {
      if (typeof isChosePregnant() == 'number') {
        return true
      } else {
        layer.msg('请选择怀孕状态')
        return false
      }
    }
    //是否知晓分娩时间
    $('.cancel').on('click',function () {
      $('.delBox').hide()
    });
    $('.inYes').on('click',function () {
      $('#realBirth_time').val('未知');
      $('.delBox').hide()
    });
    $('.inNo').on('click',function () {
      $('.delBox').hide()
    });
    $('#fbirth_time').on('click',function () {
      $('.delBox').show()
    })
    //上传头像
    $('#photo').on('click', function () {
      console.log('wxUrl:'+wxUrl);
      $.ajax({
        type: "post",
        url: wxUrl,
        data: {
          url: location.href
        },
        async: true,
        dataType: 'json',
        success: function (data) {
          console.log(data);
          var signature = data.data.signature;
          var timestamp = data.data.timestamp;
          var nonceStr = data.data.nonceStr;
          wx.config({
            debug: false,
            appId: appId,
            timestamp: timestamp,
            nonceStr: nonceStr,
            signature: signature,
            jsApiList: [
              'checkJsApi',
              'chooseImage',
              'uploadImage',
            ]
          });
          //上传图片
          wx.ready(function () {
            var images = {
              localId: [],
              serverId: []
            };
            wx.chooseImage({
              count: 1,
              success: function (res) {
                images.localId = res.localIds;
                // alert('已选择 ' + res.localIds.length + ' 张图片');
                uploadPic()
              }
            });

            function uploadPic() {
              if (images.localId.length == 0) {
                // alert('请先使用 chooseImage 接口选择图片');
                return;
              }
              var i = 0,
                length = images.localId.length;
              images.serverId = [];
              function upload() {
                wx.uploadImage({
                  localId: images.localId[i],
                  success: function (res) {
                    var serverId = res.serverId;
                    i++;
                    //alert('已上传：' + i + '/' + length);
                    images.serverId.push(res.serverId);
                    // alert(serverId);
                    $.ajax({
                      type: "get",
                      url: Main.urll('/wechat-web/wechat/updateFile?media_id=') + serverId + '&user_id=' + user_Id,
                      async: true,
                      dataType: 'json',
                      contentType: 'application/json;charset=utf-8',
                      success:function (data) {
                        console.log(data);
                        // alert(data.data);
                        if(data.data){
                          $('.photo').css('borderRadius',200).prop('src',data.data);
                          sessionStorage.photo = JSON.stringify(data.data);
                        }
                      },
                      error:function () {

                      }
                    });
                    if (i < length) {
                      upload();
                    }
                  },
                  fail: function (res) {
                    // alert(JSON.stringify(res));
                  }
                });
              }
              upload();
            }
          });

        },
        error: function () {
          console.log(data);
        }
      })
    });

    $('.next').on('click', function () {
      if(sessionStorage.photo){
        var photoUrl = JSON.parse(sessionStorage.photo);
        sessionStorage.removeItem('photo');
      }
      if($('.id_Num').val()){
        var num = $('.id_Num').val().toUpperCase();
        if(!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num)))     {
          layer.msg('请输入正确的身份证信息');
          return false;
        }
      }

      var _data = {
          "birth_Date": $('#date').val(),
          "delivery_day": $('.MMMdate').val(),
          "delivery_time": $('#realBirth_time').val(),
          "full_Name": $('#real-name').val(),
          "id_Number": $('.id_Num').val(),
          "info_Id": "",
          "info_Photo": photoUrl,
          "is_Hepatitis": Number(isH),
          "is_Pregnant": "",
          "last_Menstruation_Date": $('.realMMdate' ).val(),
          "nation": nation,
          "phone": "",
          "pregnant_Status": isPregnant,
          "user_Id": user_Id
        },
        basic_data = JSON.stringify(_data);
      if (checkName() && birthTime() && Nation() && Hepatitis() && Pregnant()) {
        var basic_url = Main.urll(`${context}/wechat/updatePatientInfo`);

        function pst() {
          $.ajax({
            type: "post",
            url: basic_url,
            async: true,
            data: basic_data,
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (data) {
              console.log(data);
              if (data.status != 0) {
                layer.msg(data.rspMsg);
                return false
              }
              if( _data.is_Hepatitis == 0){
                location.href = `${context}/wechat/forwardPage/thanks`;
              }else{
                var isTurnBingUrl = Main.urll(`${context}/wechat/trunBindDoctorLink?patient_user_id=`) + user_Id + '&doctor_phone=' + doctor_Phone;
                $.ajax({
                  type: "get",
                  url: isTurnBingUrl,
                  async: true,
                  dataType: 'json',
                  contentType: 'application/json;charset=utf-8',
                  success: function (data) {
                    console.log(data)
                    if (data.data == true) {
                      location.href = `${context}/wechat/forwardPage/bind_doctor?user_id=` + user_Id + '&doctor_phone=' + doctor_Phone;
                    } else if (data.data == false) {
                      location.href = `${context}/wechat/forwardPage/post?user_id=` + user_Id + '&doctor_phone=' + doctor_Phone;
                    }
                  },
                  error: function () {

                  }

                });
              }

              // 'http://localhost:8080/wechat-web/wechat/trunBindDoctorLink?patient_user_id=' + user_Id + '&doctor_phone=' + doctor_Phone
            },
            error: function (data) {
              console.log(data)
            }
          });
        }

        // $.ajax({
        //   type: "post",
        //   url: basic_url,
        //   async: true,
        //   data: basic_data,
        //   dataType: 'json',
        //   contentType: 'application/json;charset=utf-8',
        //   success: function (data) {
        //     console.log(data);
        //     if (data.data != 0) {
        //       layer.msg(data.rspMsg)
        //     }
        //     if( _data.is_Hepatitis == 0){
        //       location.href = `${context}/wechat/forwardPage/thanks`;
        //     }else{
        //       var isTurnBingUrl = Main.urll(`${context}/wechat/trunBindDoctorLink?patient_user_id=`) + user_Id + '&doctor_phone=' + doctor_Phone;
        //       $.ajax({
        //         type: "get",
        //         url: isTurnBingUrl,
        //         async: true,
        //         dataType: 'json',
        //         contentType: 'application/json;charset=utf-8',
        //         success: function (data) {
        //           console.log(data)
        //           if (data.data == true) {
        //             location.href = `${context}/wechat/forwardPage/bind_doctor?user_id=` + user_Id + '&doctor_phone=' + doctor_Phone;
        //           } else if (data.data == false) {
        //             location.href = `${context}/wechat/forwardPage/post?user_id=` + user_Id + '&doctor_phone=' + doctor_Phone;
        //           }
        //         },
        //         error: function () {
        //
        //         }
        //
        //       });
        //     }
        //
        //     // 'http://localhost:8080/wechat-web/wechat/trunBindDoctorLink?patient_user_id=' + user_Id + '&doctor_phone=' + doctor_Phone
        //   },
        //   error: function (data) {
        //     console.log(data)
        //   }
        // });

        if(JSON.parse(sessionStorage.isP) == 0  ){
            pst()
          // alert(JSON.parse(sessionStorage.isP))
        }else if(JSON.parse(sessionStorage.isP) == 1){
          if($('.realMMdate').val()){
              pst()
            // alert('aB:'+$('.MMdate').val())
            // alert(JSON.parse(sessionStorage.isP))
            // alert('成功提交')
          }else{
            layer.msg('请填写末次月经日期');
            return
          }
        }else if(JSON.parse(sessionStorage.isP) == 2){
          // alert(JSON.parse(sessionStorage.isP));
            if($('.realMMdate').val() && $('.realMMMdate').val() && $('#realBirth_time').val()){
              pst()
              // alert('成功提交')
            }else{
              if(!$('.realMMdate').val()){
                layer.msg('请填写末次月经日期')
                return
              }
              if(!$('.realMMMdate').val()){
                layer.msg('请填写分娩日期')
                return
              }if(!$('#realBirth_time').val()){
                layer.msg('请填写分娩时间')
                return
              }
            }
        }
      }
    })
  })
})