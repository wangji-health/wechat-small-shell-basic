import '../layui/css/layui.css';
import '../css/supplementary_info.scss';
import {context, htmlPath,Main} from './core/constants';
layui.use(['jquery', 'form'], function() {
	var $ = layui.jquery,
		layer = layui.layer;

	$().ready(function() {
		//获取user_id
		// var url = 'http://33061990.ngrok.io/wechat-web/wechat/forwardPage/bind_doctor?user_id=170908101424883232',
			var url = location.href,

			userId_startIndex = url.indexOf('user_id=') + 8,

			user_Id = url.slice(userId_startIndex);

		console.log(user_Id);

		//渲染宝宝个数
		$.ajax({
			type: "get",
			url: Main.urll('/wechat-web/wechat/getMyBabyCount/') + user_Id,
			async: true,
			dataType: 'json',
			contentType: 'application/json;charset=utf-8',
			success: function(data) {
				console.log(data);

				console.log(data.data)
				if(data.data == 1) {
					$('#baby2').hide();
					$('#baby3').hide();
					$(document).on('input', function() {
						if($('#height').val() && $('#weight').val()) {
							$('.save').css('backgroundColor', '#52c8fd').on('click', function() {
								$('.confirm').show()
							})
						} else {
							$('.save').css('backgroundColor', 'rgb(212,217,218)').off('click')
						}
					})
				} else if(data.data == 2) {
					$('.baby_infoBox').text('宝宝1信息')
					$('#baby2').show();
					$('#baby3').hide();

					$(document).on('input', function() {
						if($('#height').val() && $('#weight').val() && $('#height2').val() && $('#weight2').val()) {
							$('.save').css('backgroundColor', '#52c8fd').on('click', function() {
								$('.confirm').show()
							})
						} else {
							$('.save').css('backgroundColor', 'rgb(212,217,218)').off('click')
						}
					})
				} else if(data.data == 3) {
					$('.baby_infoBox').text('宝宝1信息')
					$('#baby2').show();
					$('#baby3').show();
					$(document).on('input', function() {
						if($('#height').val() && $('#weight').val() && $('#height2').val() && $('#weight2').val() && $('#height3').val() && $('#weight3').val()) {
							$('.save').css('backgroundColor', '#52c8fd').on('click', function() {
								$('.confirm').show()
							})
						} else {
							$('.save').css('backgroundColor', 'rgb(212,217,218)').off('click')
						}
					})
				}
			},
			error: function() {
				console.log(data)
			}
		});

		//确认框

		$('.del_cancel').on('click', function() {

			var babyData = {
				"extend_Id": "",
				"first_Baby_Height": $('#height').val(),
				"first_Baby_Weight": $('#weight').val(),
				"second_Baby_Height": $('#height2').val(),
				"second_Baby_Weight": $('#weight2').val(),
				"third_Baby_Height": $('#height3').val(),
				"third_Baby_Weight": $('#weight3').val(),
				"user_Id": user_Id
			}

			var rel_data = JSON.stringify(babyData)
			console.log(babyData)

			$('.confirm').hide()

			$.ajax({
				type: "post",
				url: Main.urll(`${context}/wechat/addMyBabyServenMonthsInfoExtend`),
				async: true,
				dataType: 'json',
				data: rel_data,
				contentType: 'application/json;charset=utf-8',
				success: function(data) {
					console.log(data);
					if(data.status==0){
						location.href = `${context}/wechat/forwardPage/post?user_id=`+user_Id;
					}
				},
				error: function() {
					console.log(data)
				}
			});
		})

		$('.del_del').on('click', function() {
			$('.confirm').hide()
		})

	})

})