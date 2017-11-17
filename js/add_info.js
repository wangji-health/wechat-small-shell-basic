import {context, htmlPath,Main} from './core/constants';
layui.use(['jquery', 'form'], function() {
	var $ = layui.jquery,
		layer = layui.layer,
		form = layui.form();
		
	$().ready(function() {
		//判断补充基本信息
		//阻止缓存
    window.onpageshow = function(e) {
      if(e.persisted) {
        location.reload()
      }
    };
		var url = location.href
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
    //
		var basic_urll = `${context}/wechat/getPatientInfo/` + user_Id;
		// var basic_urll = `${context}/wechat/getPatientInfo/` + '171109064351794189';

		$.ajax({
			type: "get",
			url: basic_urll,
			async: true,
			dataType: 'json',
			contentType: 'application/json;charset=utf-8',
			success: function(data) {

				console.log(data)

				var user = data.data

				console.log(user)

				if(user == null) {
					// alert('该用户还未注册过，请填写信息')
					return true;
				} else if(user) {
					if(user.is_Hepatitis == 0){
            location.href = `${context}/wechat/forwardPage/thanks`;
					}
					else if(user.pregnant_Status == 0){
            location.href = `${context}/wechat/forwardPage/post?user_id=` + user_Id + '&doctor_phone='+doctor_Phone;
					}else if(user.full_Name && user.birth_Date && user.nation && user.is_Hepatitis && user.pregnant_Status){
						
						location.href = `${context}/wechat/forwardPage/bind_doctor?user_id=`+ user_Id + '&doctor_phone='+doctor_Phone;

					}
					
					if(user.birth_Date) {

						$('.date').val(user.birth_Date)

					}
					if(user.info_Photo){
						$('.photo').css({
							width:100,
							height:100,
							borderRadius:200
						}).prop('src',user.info_Photo)
					}

					if(user.full_Name) {

						$('#real-name').val(user.full_Name)

					}
					if(!(user.nation == "")) {

						if(user.nation == '汉族') {

							sessionStorage.nation = "han"

						} else if(user.nation == '其他') {

							sessionStorage.nation == 'other'

						}
					}
					if(user.id_Number) {

						$('.id_Num').val(user.id_Number)

					}
					if(user.is_Hepatitis) {

						console.log(typeof user.is_Hepatitis)

						if(user.is_Hepatitis == 1) {

							sessionStorage.Hep = '1'

						} else if(user.is_Hepatitis == 0) {

							sessionStorage.Hep = '0';
              location.href = `${context}/wechat/forwardPage/thanks`
						}

					}

					if(user.pregnant_Status) {

						if(user.pregnant_Status == '0') {

							sessionStorage.pre = '0'

							$('.next').html('完成')
						} else if(user.pregnant_Status == '1') {

							sessionStorage.pre = '1'

							console.log('已怀孕状态')
							$('.MMdate').attr({
								type: 'date',
								placeholder: ""
							}).val(user.last_Menstruation_Date)

							$('.last_menses').css('display', 'block');

						} else if(user.pregnant_Status == '2') {

							sessionStorage.pre = '2'

							$('.last_menses').css('display', 'block')

							$('.birth_time').css('display', 'block')

							$('.MMdate').attr({
								type: 'date',
								placeholder: ""
							}).val(user.last_Menstruation_Date)

							$('.MMMdate').attr({
								type: 'date',
								placeholder: ""
							}).val(user.delivery_day)

							$('#birth_time').attr({
								type: 'time',
								placeholder: ""
							}).val(user.delivery_time)

						}
					}

				}

			},
			error: function(data) {
				console.log(data)
			}
		});
		if(sessionStorage.nation == 'han') {

			$('#hz').prop('checked', true)
			console.log('进入的是汉族')

		} else if(sessionStorage.nation == 'other') {

			$('#oth').prop('checked'.true)
			console.log('其他')

		} else if(!sessionStorage.nation) {
			console.log("显示没有")
			$('#oth').removeAttr('checked')
		}

		if(sessionStorage.Hep == '1') {
			$('#is_He').prop('checked', true);
		} else if(sessionStorage.Hep == '2') {
			$('#not_He').prop('checked', true)
		}

		if(sessionStorage.pre == '0') {

			$('.willB').prop('checked', true)

		} else if(sessionStorage.pre == '1') {

			$('.alreadyB').prop('checked', true)

		}
		if(sessionStorage.pre == '2') {

			$('.overB').prop('checked', true)
		}
		form.render('radio')
	})
})
//		$().ready(function() {
//判断补充基本信息
//	var basic_urll = 'http://192.168.8.222:9997/wechat-web/wechat/getPatientInfo/' + layui.data('userData').user2
//
//	$.ajax({
//		type: "get",
//		url: basic_urll,
//		async: true,
//		dataType: 'json',
//		contentType: 'application/json;charset=utf-8',
//		success: function(data) {
//
//			console.log(data)
//
//			var user = data.data
//
//			console.log(user)
//
//			if(user == null) {
//				alert('该用户还未注册过，请填写信息')
//				return true;
//			} else if(user) {
//				if(user.birth_Date) {
//
//					$('.date').val(user.birth_Date)
//
//				}
//				if(user.full_Name) {
//
//					$('#real-name').val(user.full_Name)
//
//				}
//				if(!(user.nation == "")) {
//
//					if(user.nation == '汉族') {
//
//						sessionStorage.nation = "han"
//
//					} else if(user.nation == '其他') {
//
//						sessionStorage.nation == 'other'
//
//					}
//				}
//				if(user.id_Number) {
//
//					$('.id_Num').val(user.id_Number)
//
//				}
//				if(user.is_Hepatitis) {
//
//					console.log(typeof user.is_Hepatitis)
//
//					if(user.is_Hepatitis == 1) {
//
//						sessionStorage.Hep = '1'
//
//					} else if(user.is_Hepatitis == 0) {
//
//						sessionStorage.Hep = '0'
//					}
//
//				}
//
//				if(user.pregnant_Status) {
//
//					if(user.pregnant_Status == '0') {
//
//						sessionStorage.pre = '0'
//
//						$('.next').html('完成')
//					} else if(user.pregnant_Status == '1') {
//
//						sessionStorage.pre = '1'
//
//						console.log('已怀孕状态')
//						$('.MMdate').attr({
//							type: 'date',
//							placeholder: ""
//						}).val(user.last_Menstruation_Date)
//
//						$('.last_menses').css('display', 'block');
//
//					} else if(user.pregnant_Status == '2') {
//
//						sessionStorage.pre = '2'
//
//						$('.last_menses').css('display', 'block')
//
//						$('.birth_time').css('display', 'block')
//
//						$('.MMdate').attr({
//							type: 'date',
//							placeholder: ""
//						}).val(user.last_Menstruation_Date)
//
//						$('.MMMdate').attr({
//							type: 'date',
//							placeholder: ""
//						}).val(user.delivery_day)
//
//						$('#birth_time').attr({
//							type: 'time',
//							placeholder: ""
//						}).val(user.delivery_time)
//
//					}
//				}
//
//			}
//
//		},
//		error: function(data) {
//			console.log(data)
//		}
//	});
//	if(sessionStorage.nation == 'han') {
//
//		$('#hz').prop('checked', true)
//		console.log('进入的是汉族')
//
//	} else if(sessionStorage.nation == 'other') {
//
//		$('#oth').prop('checked'.true)
//		console.log('其他')
//
//	} else if(!sessionStorage.nation) {
//		console.log("显示没有")
//		$('#oth').removeAttr('checked')
//	}
//
//	if(sessionStorage.Hep == '1') {
//		$('#is_He').prop('checked', true);
//	} else if(sessionStorage.Hep == '2') {
//		$('#not_He').prop('checked', true)
//	}
//
//	if(sessionStorage.pre == '0') {
//
//		$('.willB').prop('checked', true)
//
//	} else if(sessionStorage.pre == '1') {
//
//		$('.alreadyB').prop('checked', true)
//
//	}
//	if(sessionStorage.pre == '2') {
//
//		$('.overB').prop('checked', true)
//	}
//