import '../layui/css/layui.css';
import '../css/bind_doctor.scss';
import {context,htmlPath,Main} from './core/constants';
layui.use(['jquery', 'form'], function() {

	var $ = layui.jquery,
		layer = layui.layer,
		form = layui.form();

	$().ready(function() {

				var url = location.href

		// var url = 'http://33061990.ngrok.io/wechat-web/wechat/forwardPage/bind_doctor?user_id=170908101424883232&doctor_phone=6c0b513bb1c751a19ac6465b9db837e9'

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

				//患者编号弹框
    var screenWidth = $(window).width();
    console.log(screenWidth);
		$('.pntId').width(screenWidth*0.752).height(screenWidth*0.752*1.23);

		$('.bgBox').height(screenWidth*0.752*0.709*0.554);
		$('.bg').width(screenWidth*0.752*0.709).height(screenWidth*0.752*0.709*0.554);
		$('.idNum').width(screenWidth*0.752*0.709);
    $('.thanksWordBox').width(screenWidth*0.752*0.847);
		//获取患者

		console.log(user_Id);

		//获取医生

		console.log(doctor_Phone)

		var doctor_phone = doctor_Phone,

			userId = user_Id,

			// urll = "/wechat-web/wechat/getPatientBindHospitalWechat?patient_user_id=" + userId + '&doctor_phone=' + doctor_phone
			urll = Main.urll(`${context}/wechat/getPatientBindHospitalWechat?patient_user_id=`) + userId + '&doctor_phone=' + doctor_phone;
		console.log(userId);

		console.log(urll);

		//展示所在的医院

		$.ajax({
			type: "get",
			url: urll,
			async: true,
			dataType: 'json',
			contentType: 'application/json;charset=utf-8',
			success: function(data) {
        console.log(data)

				if(data.status !=0){
					layer.msg(data.rspMsg);
					return false
				}



				console.log(data.data.length)

				$('.hospital').off('click')

				console.log('显示医院')

				//获取医院列表

				if(data.data.length == 1) {
					//只有一所医院
					console.log('现在是绑定过医生的')

					console.log(data.data[0].hospital_Name)

					var hostital_Name = data.data[0].hospital_Name

					$('.plz_chose').text(data.data[0].hospital_Name).css({
						'color': "#2fafff",
						"font-size": "0.8rem"
					})

					$.ajax({
						type: "get",
						url: Main.urll(`${context}/wechat/getPatientBindDoctorWechat?patient_user_id=`) + userId + '&doctor_phone=' + doctor_phone + '&hospital_name=' + hostital_Name,
						async: true,
						dataType: 'json',
						contentType: 'application/json;charset=utf-8',
						success: function(data2) {
              if(data.status !=0){
                layer.msg(data.rspMsg)
                return false
              }
							console.log(data2);
							//返回医生列表

							//自定义的select选框
							$('.cancel').on('click', function() {
								$('.fake_box').hide()
								$('.fake_select').empty();
							})

							function canBindInfec() {

								console.log(data2.data.infection_doctor_list)
																
								$(".inf_doc").on('click', function() {

									$('.infect_doc').remove()

									var infection_doctor = data2.data.infection_doctor_list;

									console.log(infection_doctor);

									if(infection_doctor.length == 0) {

										layer.msg('该医院感染科暂无小贝壳注册医生')
										return false
									} else {
										$('.fake_box').show()
										for(var i = 0; i < infection_doctor.length; i++) {

											var infect_doc = '<div class="infect_doc">' + infection_doctor[i].doctor_Name + '</div>';

											$('.fake_select').append(infect_doc)

											var id = 'id' + i

											//						console.log(id)

											$('.infect_doc').data(id, infection_doctor[i].user_Id)

										}
									}

								})

								$('.fake_select').on('click', '.infect_doc', function() {

									console.log($(this).html())

									console.log($(this).index())

									var id = 'id' + $(this).index()

									console.log($(this).data(id))

									sessionStorage.infId = $(this).data(id)

									$('.infect_chose').html($(this).html()).css('color', '#2fafff')
									$('.fake_box').hide();
									$('.infect_doc').remove();

								})
							}

							//获取感染科医生列表
							if(data2.data.infection_doctor_list.length == 1) {

								if(data2.data.infection_doctor_list[0].can_Change_Doctor == false) {

								 	var	infection_id = data2.data.infection_doctor_list[0].user_Id

									console.log(infection_id)

									$('.infect_chose').text(data2.data.infection_doctor_list[0].doctor_Name).css('color', "#2fafff")

								} else {

									canBindInfec()
									//////////////////////////////////////未选定状态可以重新选择医生////////////////////////////////////////////////
								}
							} else {
								canBindInfec()
							}

							function canBindObste() {
								//妇产科医生绑定
								
								
								$(".bir_doc").on('click', function() {

									console.log(data2.data.obstetrics_doctor_list)
									//				alert('nihao')
									$('.obstetrics_doc').remove()

									var obstetrics_doctor = data2.data.obstetrics_doctor_list;

									console.log(obstetrics_doctor);

									if(obstetrics_doctor.length == 0) {

										layer.msg('该医院妇产科暂无小贝壳注册医生')
										return false
									} else {
										$('.fake_box').show()
										for(var i = 0; i < obstetrics_doctor.length; i++) {

											var obstetrics_doc = '<div class="obstetrics_doc">' + obstetrics_doctor[i].doctor_Name + '</div>';

											$('.fake_select').append(obstetrics_doc)

											var id = 'id' + i

											//						console.log(id)

											$('.obstetrics_doc').data(id, obstetrics_doctor[i].user_Id)

										}
									}

								})

								$('.fake_select').on('click', '.obstetrics_doc', function() {
									console.log($(this).html())

									console.log($(this).index())

									var id = 'id' + $(this).index()

									console.log($(this).data(id))

									sessionStorage.birId = $(this).data(id)

									$('.birth_chose').html($(this).html()).css('color', '#2fafff')
									$('.fake_box').hide();
									$('.obstetrics_doc').remove();

								})
							}

							//获取妇产科医生列表
							if(data2.data.obstetrics_doctor_list.length == 1) {

								if(data2.data.obstetrics_doctor_list[0].can_Change_Doctor == false) {

									var obstetrics_id = data2.data.obstetrics_doctor_list[0].user_Id

									console.log(obstetrics_id)

									$('.birth_chose').text(data2.data.obstetrics_doctor_list[0].doctor_Name).css('color', "#2fafff")
									console.log(data2.data.obstetrics_doctor_list[0].doctor_Name)
									console.log('这是已经绑定的妇产科')

								} else {
									canBindObste()
								}
								//								
							} else {
								canBindObste()
							}
							//获取儿科医生列表

							function canBindpedia() {
								//儿科医生绑定
								
								$(".chi_doc").on('click', function() {

									console.log(data2.data.pediatrics_doctor_list)

									$('.pediatrics_doc').remove()

									var pediatrics_doctor = data2.data.pediatrics_doctor_list;

									console.log(pediatrics_doctor);

									if(pediatrics_doctor.length == 0) {

										layer.msg('该医院儿科暂无小贝壳注册医生')
										return false
									} else {
										$('.fake_box').show()
										for(var i = 0; i < pediatrics_doctor.length; i++) {

											var pediatrics_doc = '<div class="pediatrics_doc">' + pediatrics_doctor[i].doctor_Name + '</div>';

											$('.fake_select').append(pediatrics_doc)

											var id = 'id' + i
											//						console.log(id)
											$('.pediatrics_doc').data(id, pediatrics_doctor[i].user_Id)

										}
									}

								})

								$('.fake_select').on('click', '.pediatrics_doc', function() {

									console.log($(this).html())

									console.log($(this).index())

									var id = 'id' + $(this).index()

									console.log(id)

									console.log($(this).data(id))

									sessionStorage.chiId = $(this).data(id)

									$('.child_chose').html($(this).html()).css('color', '#2fafff')
									$('.fake_box').hide();
									$('.pediatrics_doc').remove();

								})
							}

							if(data2.data.pediatrics_doctor_list.length == 1) {

								if(data2.data.pediatrics_doctor_list[0].can_Change_Doctor == false) {

									var pediatrics_id = data2.data.pediatrics_doctor_list[0].user_Id

									console.log(pediatrics_id)

									$(".chi_doc").off('click')

									$('.child_chose').text(data2.data.pediatrics_doctor_list[0].doctor_Name).css('color', "#2fafff")
									

								} else {
									canBindpedia()
								}

							} else {
								canBindpedia()
							}

							function isChoseInfect() {
								if($('.infect_chose').text() == '请选择') {
									console.log($('.infect_chose').text())
									return false
								} else {
									return true
								}

							}

							function isChoseBirth() {
								if($('.birth_chose').text() == '请选择') {
									return false
								} else {
									return true
								}

							}

							function isChoseChild() {
								if($('.child_chose').text() == '请选择') {
									return false
								} else {
									return true
								}
							}

							function doctor_list() {
								var ary = [];
								if($('.infect_chose').text() != '请选择') {
									ary.push(sessionStorage.infId)
								}

								if($('.birth_chose').text() != '请选择') {
									ary.push(sessionStorage.birId)
								}

								if($('.child_chose').text() != '请选择') {
									ary.push(sessionStorage.chiId)
								}

//								return ary.join()

								var newAry = ary.filter(function(d) {
									if(d != undefined) {
										return true
									} else {
										return
									}
								})
								if(newAry.join().length == 0){
									return newAry.join()
								}else{
									return ","+newAry.join()
								}
								 
							}

							function finDoc_id(infection_id, obstetrics_id, pediatrics_id) {
								var array = [];
								array.push(infection_id)
								array.push(obstetrics_id)
								array.push(pediatrics_id)

								var newAry = array.filter(function(d) {
									if(d != undefined) {
										return true
									} else {
										return
									}
								})

								return newAry.join()

							}
							
							var bind_id = finDoc_id(infection_id, obstetrics_id, pediatrics_id)
							$('.bind_sure').on('click', function() {
								
								console.log(bind_id)
								
								console.log(doctor_list())

								// var url = 'http://localhost:8080/wechat-web/wechat/addBindDoctorWechat?doctor_user_id_list=' +bind_id+doctor_list() + '&patient_user_id=' + userId;
                var url = Main.urll(`${context}/wechat/addBindDoctorWechat?doctor_user_id_list=`)+bind_id+doctor_list() + '&patient_user_id=' + userId;
								if(isChoseInfect() || isChoseBirth() || isChoseBirth()) {
									console.log(url)
									$.ajax({
										type: "get",
										url: url,
										dataType: 'json',
										contentType: 'application/json;charset=utf-8',
										success: function(data) {
											console.log(data)
											if(data.status == 0) {
												sessionStorage.clear()
												location.href = `${context}/wechat/forwardPage/post?user_id=`+user_Id + '&doctor_phone' + doctor_Phone
											} else {
												layer.msg(data.rspMsg);
												return false
											}
										},
										error: function() {

										}
									});

								} else {
									layer.msg('请至少绑定一个医生')
								}

							})

						},
						error: function() {
							console.log('请求失败')
						}
					});

					///////////////////////////////现在是绑定过医生的逻辑////////////////////////////////////////////////
				} else {
					//未绑定医院

					var hospital = data.data;

					var len = data.data.length

					for(var i = 0; i < len; i++) {

						//						console.log(hospital[i].hospital_Name)
						//						医院列表

						var list = '<li class="list">' + hospital[i].hospital_Name + '</li>'
						$('.hospital_list').append(list)
					}

					//显示隐藏医院列表
					$('.hospital').on('click', function() {
						$('.search_hospital').toggle()
						$('.infect_chose').text('请选择').css('color', '#99aaba');
						$('.birth_chose').text('请选择').css('color', '#99aaba');
						$('.child_chose').text('请选择').css('color', '#99aaba');

					})
					//显示隐藏取消
					$('.search_right').on('click', function() {
						$('.search_hospital').toggle()
					})

					//寻找关键字
					$('#ipt').on('input', function() {

						$('.list').hide()

						console.log($(this).val())

						var keyWord = $(this).val();

						for(i = 0; i < len; i++) {

							var list_hospital = document.getElementsByTagName('li')[i].innerHTML

							if(!(list_hospital.indexOf(keyWord) == -1)) {

								document.getElementsByTagName('li')[i].style.display = 'block'

							}

						}

					})

					$('.hospital_list').on('click', '.list', function() {

						//						$('#ipt').val($(this).html())
						console.log($(this).html())

						$('.search_hospital').toggle()

						$('.plz_chose').text($(this).html()).css({
							'color': '#2fafff',
						})

						console.log(Main.urll(`${context}/wechat/getPatientBindDoctorWechat?patient_user_id=`) + userId + '&doctor_phone=' + '&hospital_name=' + $(this).html())

						// Main.urll(`${context}/wechat/getPatientBindDoctorWechat?patient_user_id=`) + userId + '&doctor_phone=' + '&hospital_name=' + $(this).html(),
            $.ajax({
							type: "get",
							url: Main.urll(`${context}/wechat/getPatientBindDoctorWechat?patient_user_id=`) + userId + '&doctor_phone=' + '&hospital_name=' + $(this).html(),
							async: true,
							dataType: 'json',
							contentType: 'application/json;charset=utf-8',
							success: function(data) {
								if(data.status !=0){
									layer.msg(data.rspMsg)
									return false
								}
								console.log(data);
								// doctorList = data;
								sessionStorage.doctorList = JSON.stringify(data);
							},
							error: function() {
								console.log('请求失败')
							}
						});

					})

					//自定义的select选框
					$('.cancel').on('click', function() {
						$('.fake_box').hide()
						$('.fake_select').empty();
					})

					//感染科医生绑定

					$(".inf_doc").on('click', function() {

						//				alert('nihao')

						$('.infect_doc').remove()

						if($('.plz_chose').text() == '请选择') {

							layer.msg('请先选择医院')
							return false
						} else {
							var doctorList = JSON.parse(sessionStorage.doctorList);
							var infection_doctor = doctorList.data.infection_doctor_list;

							console.log(doctorList)

							console.log(infection_doctor);

							if(infection_doctor.length == 0) {

								layer.msg('该医院感染科暂无小贝壳注册医生')
								return false
							} else {
								$('.fake_box').show()
								for(var i = 0; i < infection_doctor.length; i++) {

									var infect_doc = '<div class="infect_doc">' + infection_doctor[i].doctor_Name + '</div>';

									$('.fake_select').append(infect_doc)

									var id = 'id' + i

									//						console.log(id)

									$('.infect_doc').data(id, infection_doctor[i].user_Id)

								}
							}

						}

					})

					$('.fake_select').on('click', '.infect_doc', function() {

						console.log($(this).html())

						console.log($(this).index())

						var id = 'id' + $(this).index()

						console.log($(this).data(id))

						sessionStorage.infId = $(this).data(id)

						$('.infect_chose').html($(this).html()).css('color', '#2fafff')
						$('.fake_box').hide();
						$('.infect_doc').remove();

					})

					//妇产科医生绑定
					$(".bir_doc").on('click', function() {

						//				alert('nihao')

						$('.obstetrics_doc').remove()

						if($('.plz_chose').text() == '请选择') {

							layer.msg('请先选择医院')
							return false
						} else {

              var doctorList = JSON.parse(sessionStorage.doctorList);
							var obstetrics_doctor = doctorList.data.obstetrics_doctor_list;

							console.log(doctorList)

							console.log(obstetrics_doctor);

							if(obstetrics_doctor.length == 0) {

								layer.msg('该医院妇产科暂无小贝壳注册医生')
								return false
							} else {
								$('.fake_box').show()
								for(var i = 0; i < obstetrics_doctor.length; i++) {

									var obstetrics_doc = '<div class="obstetrics_doc">' + obstetrics_doctor[i].doctor_Name + '</div>';

									$('.fake_select').append(obstetrics_doc)

									var id = 'id' + i

									//						console.log(id)

									$('.obstetrics_doc').data(id, obstetrics_doctor[i].user_Id)

								}
							}

						}

					})

					$('.fake_select').on('click', '.obstetrics_doc', function() {
						console.log($(this).html())

						console.log($(this).index())

						var id = 'id' + $(this).index()

						console.log($(this).data(id))

						sessionStorage.birId = $(this).data(id)

						$('.birth_chose').html($(this).html()).css('color', '#2fafff')
						$('.fake_box').hide();
						$('.obstetrics_doc').remove();

					})

					//儿科医生绑定
					$(".chi_doc").on('click', function() {

						$('.pediatrics_doc').remove()

						if($('.plz_chose').text() == '请选择') {

							layer.msg('请先选择医院')
							return false
						} else {
              var doctorList = JSON.parse(sessionStorage.doctorList);

							var pediatrics_doctor = doctorList.data.pediatrics_doctor_list;

							console.log(doctorList)

							console.log(pediatrics_doctor);

							if(pediatrics_doctor.length == 0) {

								layer.msg('该医院儿科暂无小贝壳注册医生')
								return false
							} else {
								$('.fake_box').show()
								for(var i = 0; i < pediatrics_doctor.length; i++) {

									var pediatrics_doc = '<div class="pediatrics_doc">' + pediatrics_doctor[i].doctor_Name + '</div>';

									$('.fake_select').append(pediatrics_doc)

									var id = 'id' + i

									//						console.log(id)

									$('.pediatrics_doc').data(id, pediatrics_doctor[i].user_Id)

								}
							}

						}

					})

					$('.fake_select').on('click', '.pediatrics_doc', function() {

						console.log($(this).html())

						console.log($(this).index())

						var id = 'id' + $(this).index()

						console.log(id)

						console.log($(this).data(id))

						sessionStorage.chiId = $(this).data(id)

						$('.child_chose').html($(this).html()).css('color', '#2fafff')
						$('.fake_box').hide();
						$('.pediatrics_doc').remove();

					})

					//绑定医生提交判定

					$('.birth_chose').text('请选择').css('color', '#99aaba');
					$('.child_chose').text('请选择').css('color', '#99aaba');

					function isChoseInfect() {
						if($('.infect_chose').text() == '请选择') {
							console.log($('.infect_chose').text())
							return false
						} else {
							return true
						}

					}

					function isChoseBirth() {
						if($('.birth_chose').text() == '请选择') {
							return false
						} else {
							return true
						}

					}

					function isChoseChild() {
						if($('.child_chose').text() == '请选择') {
							return false
						} else {
							return true
						}
					}

					function doctor_list() {
						var ary = [];
						if($('.infect_chose').text() != '请选择') {
							ary.push(sessionStorage.infId)
						}

						if($('.birth_chose').text() != '请选择') {
							ary.push(sessionStorage.birId)
						}

						if($('.child_chose').text() != '请选择') {
							ary.push(sessionStorage.chiId)
						}

						return ary.join()
					}

					$('.bind_sure').on('click', function() {

						// var url = 'http://localhost:8080/wechat-web/wechat/addBindDoctorWechat?doctor_user_id_list=' + doctor_list() + '&patient_user_id=' + userId;

						var url = Main.urll(`${context}/wechat/addBindDoctorWechat?doctor_user_id_list=`) + doctor_list() + '&patient_user_id=' + userId;
						if(isChoseInfect() || isChoseBirth() || isChoseBirth()) {

							console.log(url)

							$.ajax({
								type: "get",
								url: url,
								dataType: 'json',
								contentType: 'application/json;charset=utf-8',
								success: function(data) {
									console.log(data)
									if(data.status == 0) {
										sessionStorage.clear()
										$('.sOrH').show();
										$('.realNum').text(data.data);
										$('.close').on('click',function () {
                      location.href = `${context}/wechat/forwardPage/post?user_id=`+user_Id+'&doctor_phone='+doctor_phone
                    })
									} else {
										layer.msg(data.rspMsg);
										return false
									}
								},
								error: function() {

								}
							});

						} else {
							layer.msg('请至少绑定一个医生')
						}

					})
					//、、、、、、、、、、、、、、、、、、未绑定医生逻辑、、、、、、、、、、、、、、、、、、、、、、、
				}

			},
			error: function() {

			}
		})

	})

})