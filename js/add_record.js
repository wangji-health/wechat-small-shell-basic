layui.use('jquery', function() {
	var $ = layui.jquery,
		layer = layui.layer;

	//获取user_id
	var url = 'http://33061990.ngrok.io/wechat-web/wechat/forwardPage/bind_doctor?user_id=170908101424883232',

		userId_startIndex = url.indexOf('user_id=') + 8,

		user_Id = url.slice(userId_startIndex);

	console.log(user_Id);

	var Main = {
		url: "http://localhost:8080",
		urll: function(data) {
			return this.url + data
		}
	}

	//控制确定和取消按钮高度一致
	var sureH = $('.sure').height();
	$('.cancel').height(sureH - 2)
	//		console.log(sureH);
	///////////////////////////////////////////////////////

	//控制服用药物弹出层的显示与否

	$('.choose_MBox').on('click', function() {
		$('.medicine_alert').show()
	});

	$('.exit').on('click', function() {
		$('.medicine_alert').hide(); //隐藏弹出层

		$('.m_choose').text('请选择') //恢复原状

		$('.choose').hide(); //隐藏图片

		$('.show').removeClass('show'); //删除类名
	})
	///////////////////////////////////////////////////////

	//监听选择服用的药物
	$('.medicineCBox').on('click', '.child_li', function() {

		//			sessionStorage.removeItem(medicineName)

		$('.child_li').removeClass('show').find('.choose').hide();

		$(this).addClass('show').find('.choose').show();

		sessionStorage.medicineName = $(this).find('.des').text()

		console.log(sessionStorage.medicineName) //记录选择的药物名字

	})

	//确定按钮
	$('.sure').on('click', function() {

		$('.medicine_alert').hide(); //隐藏弹出层

		$('.m_choose').text(sessionStorage.medicineName); //展示选择的药物名字

		$('.choose').hide(); //隐藏图片

		$('.show').removeClass('show'); //删除类名

	})

	//取消按钮
	$('.cancel').on('click', function() {
		$('.medicine_alert').hide(); //隐藏弹出层

		$('.m_choose').text('请选择') //恢复原状

		$('.choose').hide(); //隐藏图片

		$('.show').removeClass('show'); //删除类名
	})

	//监听开始服用日期
	$('#have').on('change', function() {
		$('#startInput').val($('#have').val())
	})

	//监听结束服用日期
	$('#endhave').on('change', function() {
		$('#endInput').val($('#endhave').val())
	})

	//检测文档的点击事件控制saveButton

	$(document).on('click', function() {
		if($('.m_choose').text() != "请选择" && $('#startInput').val() && $('#endInput').val()) {
			$('.save').css('backgroundColor', 'rgb(82,200,253)').off('click').on('click', function() {
				pst()
			})
		} else {
			$('.save').css('backgroundColor', 'rgb(212, 217, 218)').off('click')
			//后期还用取消save的事件
		}
	})

	$('#have').on('blur', function() {
		if($('.m_choose').val() != "请选择" && $('#startInput').val() && $('#endInput').val()) {
			$('.save').css('backgroundColor', 'rgb(82,200,253)').off('click').on('click', function() {
				pst()
			})
		} else {
			$('.save').css('backgroundColor', 'rgb(212, 217, 218)').off('click')
			//后期还用取消save的事件
		}
	})

	$('#endhave').on('blur', function() {
		if($('.m_choose').val() != "请选择" && $('#startInput').val() && $('#endInput').val()) {
			$('.save').css('backgroundColor', 'rgb(82,200,253)').off('click').on('click', function() {
				pst()
			})
		} else {
			$('.save').css('backgroundColor', 'rgb(212, 217, 218)').off('click')
			//后期还用取消save的事件
		}
	})

	function pst() {

		var medicine_url = Main.urll('/wechat-web/wechat/addMyDrugUseInfoExtend')

		var re_data = {
			"dose": "",
			"end_Time": $('#endInput').val(),
			"extend_Id": "",
			"name": $('.m_choose').text(),
			"start_Time": $('#startInput').val(),
			"status": "",
			"type": 0,
			"user_Id": user_Id,
			"way": ""
		};
		
		real_data = JSON.stringify(re_data)
		
		$.ajax({
			type: "post",
			url: medicine_url,
			async: true,
			dataType: 'json',
			data: real_data,
			contentType: 'application/json;charset=utf-8',
			success: function(data) {
				console.log(data);
				if(data.status ==0){
					location.href = 'antivirus.html'
				}
			},
			error: function() {
				console.log(data)
			}
		});
	}

})