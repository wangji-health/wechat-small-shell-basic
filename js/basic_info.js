layui.use(['jquery', 'form'], function() {

	var $ = layui.jquery,
		layer = layui.layer,
		form = layui.form(),
		ip = "localhost:8080";

	

	$().ready(function() {
		
		//		var url = location.href 
		var url = 'http://33061990.ngrok.io/wechat-web/wechat/forwardPage/bind_doctor?user_id=170908101424883232&doctor_phone=6c0b513bb1c751a19ac6465b9db837e9'

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

		console.log(doctor_Phone)

		var Main = {
			url: "http://" + ip,
			urll: function(data) {
				return this.url + data
			}
		}

		//民族
		var nation = null;
		form.on('radio(nation)', function(data) {
			console.log(data.elem); //得到radio原始DOM对象
			console.log(data.value); //被点击的radio的value值
			nation = data.value
		});

		//是否乙肝
		var isH = null;
		form.on('radio(isH)', function(data) {
			console.log(data.value);
			isH = data.value
		});

		//怀孕状态
		var isPregnant = null;

		form.on('radio(isPregnant)', function(data) {

			console.log(data.value);
			isPregnant = data.value

			if(data.value == 0) {
				$('.next').html('完成')
			} else {
				$('.next').html('下一步')
			}

			if(data.value == 1) {
				$('.last_menses').css('display', 'block');
				$('.birth_time').css('display', 'none')

			} else if(data.value == 0) {
				$('.last_menses').css('display', 'none')
				$('.birth_time').css('display', 'none')

			} else if(data.value == 2) {
				$('.last_menses').css('display', 'block')
				$('.birth_time').css('display', 'block')

			}
			//			if(data.value == 1){
			//				
			//			}

		});

		$('.date').on('focus', function() {
			$('.date').attr({
				type: 'date',
				placeholder: ""
			})
		})

		$('.Mdate').on('focus', function() {
			$('.Mdate').attr({
				type: 'date',
				placeholder: ""
			})
		})

		$('.MMdate').on('focus', function() {
			$('.MMdate').attr({
				type: 'date',
				placeholder: ""
			})
		})

		//计算器

		$('.Mdate').on("change", function() {

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

			if(month - 10 < 0) {
				month = '0' + month
				console.log('拼合后的month:' + month)
			}
			//			else{
			//				month = month+1
			//				console.log('拼合后的month:' + month)
			//			}

			var date = real_show_time.getDate();

			console.log(date)

			if(date - 10 < 0) {
				date = '0' + date
			}

			console.log('拼合后的字符串:' + year + '-' + month + '-' + date)

			$('.calc_date_right').html(year + '-' + month + '-' + date);

			$('#sure').on('click', function() {

				$('.MMdate').val(year + '-' + month + '-' + date);

				$('.layerDiy_box').css('display', 'none');

				//				$('.calc_date_right').html('请填写预产期')

			})

			//			console.log(chose_year);

			//			var real_date = chose_date - 280 * 24 * 60 * 60 * 1000

			//						console.log(console.log(real_date))
		})

		$('.MMMdate').on('focus', function() {
			$('.MMMdate').attr({
				type: 'date',
				placeholder: ""
			})
		})

		$('#birth_time').on('focus', function() {
			$('#birth_time').attr({
				type: 'time',
				placeholder: ""
			})
		})

		$('.estimate').on('click', function() {
			$('.layerDiy_box').css('display', 'block')
		})

		$('.close').on('click', function() {
			$('.layerDiy_box').css('display', 'none')
		})

		//校验字符长度

		String.prototype.calcStr = function() {
			var len = 0;
			for(var i = 0; i < this.length; i++) {
				if(this.charCodeAt(i) > 127 || this.charCodeAt(i) == 94) {
					len += 2;
				} else {
					len++;
				}
			}
			return len;
		}

		//判断名字规范

		function checkName() {
			if($('.real-name').val().length == 0) {
				layer.msg('请填写真实姓名')
				return false
			} else if($('.real-name').val().calcStr() > 10) {
				layer.msg('姓名格式不正确，长度至多为五个汉字或者10个英文字母')
				return false
			} else {
				return true
			}
		}

		//判断出生日期
		function birthTime() {
			if($('.date').val().length == 0) {
				layer.msg('请选择出生日期')
				return false
			} else {
				return true
			}
		}

		//判断民族的返回值
		function isChoseNation() {
			for(var i = 0; i <= 1; i++) {
				if($('.nation').eq(i).prop('checked')) {
					return i
				}
			}
		}

		//判断民族是否选择
		function Nation() {
			if(typeof isChoseNation() == 'number') {
				return true
			} else {
				layer.msg('请选择民族')
				return false
			}
		}

		//判断乙肝的返回值

		function isChoseHepatitis() {
			for(var i = 0; i <= 1; i++) {
				if($('.heP').eq(i).prop('checked')) {
					return i
				}
			}
		}

		//判断乙肝是否选择
		function Hepatitis() {
			if(typeof isChoseHepatitis() == 'number') {
				return true
			} else {
				layer.msg('请选择是否乙肝')
				return false
			}
		}

		//判断怀孕状态

		function isChosePregnant() {
			for(var i = 0; i <= 2; i++) {
				if($('.isPr').eq(i).prop('checked')) {
					return i
				}
			}

		}

		function Pregnant() {
			if(typeof isChosePregnant() == 'number') {
				return true
			} else {
				layer.msg('请选择怀孕状态')
				return false
			}
		}

		$('.next').on('click', function() {

			var data = {
					"birth_Date": $('#date').val(),
					"delivery_day": $('.MMMdate').val(),
					"delivery_time": $('#birth_time').val(),
					"full_Name": $('#real-name').val(),
					"id_Number": $('.id_Num').val(),
					"info_Id": "",
					"info_Photo": "",
					"is_Hepatitis": Number(isH),
					"is_Pregnant": "",
					"last_Menstruation_Date": $('.MMdate').val(),
					"nation": nation,
					"phone": "",
					"pregnant_Status": isPregnant,
					"user_Id": user_Id
				},
				basic_data = JSON.stringify(data)

			if(checkName() && birthTime() && Nation() && Hepatitis() && Pregnant()) {
				var basic_url = Main.urll("/wechat-web/wechat/updatePatientInfo");
				$.ajax({
					type: "post",
					url: basic_url,
					async: true,
					data: basic_data,
					dataType: 'json',
					contentType: 'application/json;charset=utf-8',
					success: function(data) {
						console.log(data)

						var isTurnBingUrl = 'http://localhost:8080/wechat-web/wechat/trunBindDoctorLink?patient_user_id=' + user_Id + '&doctor_phone=' + doctor_Phone

						$.ajax({
							type: "get",
							url: isTurnBingUrl,
							async: true,
							dataType: 'json',
							contentType: 'application/json;charset=utf-8',
							success: function(data) {
								console.log(data)
								if(data.data == true) {
									location.href = 'http://localhost:8080/wechat-web/wechat/bind_doctor.html'
								} else if(data.data == false) {
									location.href = "http://localhost:8080/wechat-web/wechat/post.html"
								}
							},
							error: function() {

							}

						});

					},
					error: function(data) {
						console.log(data)
					}
				});
			}

		})

	})
})