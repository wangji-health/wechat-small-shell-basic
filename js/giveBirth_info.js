import '../layui/css/layui.css';
import '../css/giveBirth_info.scss';
import {context, htmlPath,Main} from './core/constants';

layui.use(['jquery', 'form'], function() {
	var $ = layui.jquery,
		layer = layui.layer;

	//监听日期选择
	$('#date').on('change', function() {

		$('.birth_date').text($('#date').val());

		sessionStorage.birthDate = $('.birth_date').text()

		//控制清除按钮的时候提示性文字的显示
		if(!$('.birth_date').text()) {
			$('.birth_date').text('请选择日期')
		}
	})

	//监听时间选择
	$('#time').on('change', function() {

		$('.birth_time').text($('#time').val());

		sessionStorage.birthTime = $('.birth_time').text()

		//控制清除按钮的时候提示性文字的显示
		if(!$('.birth_time').text()) {
			$('.birth_time').text('请选择时间')
		}
	})

	//监听胎儿数量
	$('.babyNumBox').on('click', '.bb', function() {
		$('.checked').removeClass('checked').find('.imck').prop('src', require('../img/notck.png'));
		$(this).addClass('checked').find('.imck').prop('src', require('../img/ck.png'));

		if($(this).index() == 0) {
			console.log('选择的是单胎');
			$('#baby2').hide();
			$('#baby3').hide();
			$('.baby_infoBox').text('宝宝信息')
		} else if($(this).index() == 1) {
			console.log('选择的是双胞胎');
			$('#baby2').show().css('marginBottom',100);
			$('#baby3').hide();
			$('.baby_infoBox').text('宝宝1信息')
		} else if($(this).index() == 2) {
			console.log('选择的是三胞胎')
			$('#baby2').show().css('marginBottom',0);
			$('#baby3').show();
			$('.baby_infoBox').text('宝宝1信息')
		}

		sessionStorage.babyNum = $(this).index() + 1

		console.log(sessionStorage.babyNum)
	})

	//监听baby1是否有缺陷
	$('.badNumBox').on('click', '.bad', function() {

		$('.isBad').removeClass('isBad').find('.iimck').prop('src', require('../img/notck.png'));
		$(this).addClass('isBad').find('.iimck').prop('src', require('../img/ck.png'))
		console.log($(this).index());

		if($(this).index() == 0) {
			$('.sickNameBox').show();
			sessionStorage.baby1Defect = "是";
		} else if($(this).index() == 1) {
			$('.sickNameBox').hide();
			$('#sickName').val('')
			sessionStorage.baby1Defect = "否";
		}
		console.log(sessionStorage.baby1Defect)
	})

	//监听baby2是否有缺陷
	$('.badNumBox2').on('click', '.bad_no2', function() {

		$('.isBad2').removeClass('isBad2').find('.iimck2').prop('src', require('../img/notck.png'));
		$(this).addClass('isBad2').find('.iimck2').prop('src', require('../img/ck.png'))
		console.log($(this).index());

		if($(this).index() == 0) {
			$('.sickNameBox2').show();
			sessionStorage.baby2Defect = "是";
		} else if($(this).index() == 1) {
			$('.sickNameBox2').hide();
			$('#sickName2').val('')
			sessionStorage.baby2Defect = "否";
		}
		console.log(sessionStorage.baby2Defect)
	})

	//监听baby3是否有缺陷
	$('.badNumBox3').on('click', '.bad_no3', function() {

		$('.isBad3').removeClass('isBad3').find('.iimck3').prop('src', require('../img/notck.png'));
		$(this).addClass('isBad3').find('.iimck3').prop('src', require('../img/ck.png'))
		console.log($(this).index());

		if($(this).index() == 0) {
			$('.sickNameBox3').show();
			sessionStorage.baby3Defect = "是";
		} else if($(this).index() == 1) {
			$('.sickNameBox3').hide();
			$('#sickName3').val('')
			sessionStorage.baby3Defect = "是";
		}

		console.log(sessionStorage.baby3Defect)

	})

	//获取user_id
	// var url = 'http://33061990.ngrok.io/wechat-web/wechat/forwardPage/bind_doctor?user_id=170908101424883232',
		var url = location.href,

		userId_startIndex = url.indexOf('user_id=') + 8,

		user_Id = url.slice(userId_startIndex);

	console.log(user_Id);

	//提交宝宝出生信息

//

  $('#date').on('change', function() {
		if($('#date').val()&&($('#time').val() || $('.birth_time').text() == '未知')) {
			$('.save').off('click');
			$('.save').css('backgroundColor', '#52c8fd').on('click', postBabyInfo)
		} else {
			$('.save').css('backgroundColor', '#d4d9da').off('click');
		}
	});

  $('#time').on('change', function() {
		if($('#date').val()&&$('#time').val()) {
			$('.save').off('click');
			$('.save').css('backgroundColor', '#52c8fd').on('click', postBabyInfo)
		} else {
			$('.save').css('backgroundColor', '#d4d9da').off('click');
		}
	});

  $('.inYes').on('click',function () {
    $('.birth_time').text('未知');
    $('.delBox').hide();
    if($('#date').val()&&$('.birth_time').text() == '未知') {
      $('.save').off('click');
      $('.save').css('backgroundColor', '#52c8fd').on('click', postBabyInfo)
    } else {
      $('.save').css('backgroundColor', '#d4d9da').off('click');
    }
  })
	// $(document).on('keyup', function() {
	// 	if($('#date').val()&&$('#time').val()) {
	// 		alert(123)
	// 		$('.save').off('click');
	// 		$('.save').css('backgroundColor', '#52c8fd').on('click', postBabyInfo)
	// 	} else {
	// 		$('.save').css('backgroundColor', '#d4d9da').off('click');
	// 	}
	// });

//	"delivery_Time": $('#time').val(),
	//	$('.save').on('click', postBabyInfo)
	//是否记得时间
  $('.cancel').on('click',function () {
    $('.delBox').hide()
  });

  $('.inNo').on('click',function () {
    $('.delBox').hide()
  });
  $('.birth_time').on('click',function () {
    $('.delBox').show()
  })

	function postBabyInfo() {
		if(!sessionStorage.babyNum){
      sessionStorage.babyNum = 1
		}
		var medicine_url = Main.urll('/wechat-web/wechat/addMyBabyDrugUseInfoExtend')
		var bb2 =  $('#weight2').val()*50+$('#weightt2').val()*500 == 0 ? "" : $('#weight2').val()*50+$('#weightt2').val()*500;
		var bb3 =  $('#weight3').val()*50+$('#weightt3').val()*500 == 0 ? "" : $('#weight3').val()*50+$('#weightt3').val()*500;
		var babyInfo = {
			"baby_Number": sessionStorage.babyNum,
			"delivery_Day": $('#date').val(),
			"delivery_Time": $('.birth_time').text(),
			"extend_Id": "",
			"first_Baby_Have_Physiological_Defect": sessionStorage.baby1Defect,
			"first_Baby_Height": $('#height').val(),
			"first_Baby_Physiological_Defect": $('#sickName').val(),
			"first_Baby_Weight": $('#weight').val()*50+$('#weightt').val()*500,
			"second_Baby_Have_Physiological_Defect": sessionStorage.baby2Defect,
			"second_Baby_Height": $('#height2').val(),
			"second_Baby_Physiological_Defect": $('#sickName2').val(),
			"second_Baby_Weight": bb2,
			"third_Baby_Have_Physiological_Defect": sessionStorage.baby3Defect,
			"third_Baby_Height": $('#height3').val(),
			"third_Baby_Physiological_Defect": $('#sickName3').val(),
			"third_Baby_Weight": bb3,
			"user_Id": user_Id
		};
		// console.log(JSON.stringify(babyInfo))
		var real_babyInfo = JSON.stringify(babyInfo);

		$.ajax({
			type: "post",
			url: medicine_url,
			async: true,
			dataType: 'json',
			data: real_babyInfo,
			contentType: 'application/json;charset=utf-8',
			success: function(data) {
				console.log(data);
				
				if(data.status==0){
					location.href = `${context}/wechat/forwardPage/post?user_id=`+user_Id+'&doctor_phone='
				}else{
					layer.msg(data.rspMsg);
					return false
				}

			},
			error: function() {
				
			}
		});

	}

})