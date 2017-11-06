import '../layui/css/layui.css';
import '../css/amend.scss';
import {context, htmlPath,Main} from './core/constants';
layui.use('jquery', function() {
	var $ = layui.jquery,
		layer = layui.layer;

	//获取user_id
	// var url = 'http://33061990.ngrok.io/wechat-web/wechat/forwardPage/bind_doctor?user_id=170908101424883232',

		var url = location.href,

		userId_startIndex = url.indexOf('user_id=') + 8,

		user_Id = url.slice(userId_startIndex);

	console.log(user_Id);

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

	//渲染记录

	var choose_medicine = JSON.parse(window.name);

	console.log(choose_medicine)

	var start_time_index = choose_medicine.drug_Time.indexOf('~');

	console.log(start_time_index)

	var start_time = choose_medicine.drug_Time.slice(0, start_time_index);

	console.log(start_time)

	var end_time = choose_medicine.drug_Time.slice(start_time_index + 1);

	console.log(end_time)

	$('.m_choose').text(choose_medicine.name);

	$('#startInput').val(start_time);

	$('#endInput').val(end_time);

	var medicine_url = Main.urll('/wechat-web/wechat/editMyDrugUseInfoExtend')

	//修改保存
	$('.save').on('click', function() {

		var re_data = {
			"dose": "",
			"end_Time": $('#endInput').val(),
			"extend_Id": choose_medicine.extend_Id,
			"name": $('.m_choose').text(),
			"start_Time": $('#startInput').val(),
			"status": "",
			"type": 0,
			"user_Id": "",
			"way": ""
		};
		var real_data = JSON.stringify(re_data)

		$.ajax({
			type: "post",
			url: medicine_url,
			async: true,
			dataType: 'json',
			data: real_data,
			contentType: 'application/json;charset=utf-8',
			success: function(data) {
				console.log(data);
				location.href = `${context}/wechat/forwardPage/antivirus?user_id=` + user_Id;
			},
			error: function() {
				console.log(data)
			}
		});
	})
	
	//删除确认弹窗部分
	
	$('.del_cancel').on('click',function(){
		$('.delBox').hide()
	})
	
	$('.del').on('click',function(){
		$('.delBox').show()
	})
	
	var del_url = Main.urll('/wechat-web/wechat/delMyDrugUseInfoExtend/')+choose_medicine.extend_Id
	
	$('.del_del').on('click',function(){
		$.ajax({
			type:"get",
			url:del_url,
			async:true,
			dataType: 'json',
			data: del_url,
			contentType: 'application/json;charset=utf-8',
			success: function(data) {
				console.log(data);
				location.href = `${context}/wechat/forwardPage/antivirus?user_id=` + user_Id;
			},
			error: function() {
				console.log(data)
			}
		});
	})

})