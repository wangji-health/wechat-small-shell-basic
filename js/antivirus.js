import '../layui/css/layui.css';
import '../css/antivirus.scss';
import {context, htmlPath,Main} from './core/constants';

layui.use('jquery', function() {

	var $ = layui.jquery,
		layer = layui.layer;
	var bannerWidth = $('.banner').css('width');
	console.log(bannerWidth);

	//保持banner图比例
	$('.banner').height(parseInt(bannerWidth) / 1.39);
	console.log(parseInt(bannerWidth) / 1.39);
	$('.medicine_redordBox').on('click', function() {
		location.href = `${context}/wechat/forwardPage/add_record?user_id=`+user_Id;
	})
	$('.hasB').on('click',function () {
		location.href = 'http://mp.weixin.qq.com/s/NgicLpjjEtrWeqtc7bNz1A'
  })
	//获取user_id

	// var url = 'http://33061990.ngrok.io/wechat-web/wechat/forwardPage/bind_doctor?user_id=170908101424883232',

	var	url = location.href,

		userId_startIndex = url.indexOf('user_id=') + 8,

		user_Id = url.slice(userId_startIndex);

	console.log(user_Id);

	//获取患者

	console.log(user_Id);
	$.ajax({
		type: "get",
		url: Main.urll(`${context}/wechat/getMyDrugUseInfoExtendList/`) + user_Id,
		async: true,
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		success: function(data) {
			console.log(data);

			var medicine_List = data.data;

			console.log(medicine_List)

			for(var i = 0; i < medicine_List.length; i++) {

				var $tmp = $('.tmp').html().replace('{{name}}', medicine_List[i].name).replace('{{dose}}', medicine_List[i].dose).replace('{{drug_Time}}', medicine_List[i].drug_Time);

				$('.tilNameBox').append($tmp)

				//隐藏未知
				if(medicine_List[i].dose == '未知') {
					console.log(i)
					$('.real-medicine').eq(i).find('.hd').hide()

				}

				//隐藏修改状态
				if(!medicine_List[i].can_Be_Edited) {
					$('.real-medicine').eq(i).find('.amend').hide()
				}

				$('.real-medicine').eq(i).find('.amend').on('click', function() {
					var index = $('.amend').index(this)
					
					var amend = medicine_List[index];
					
					console.log(amend)
					
					window.name = JSON.stringify(amend)
					
					location.href = `${context}/wechat/forwardPage/amend_record?user_id=`+user_Id;
				})

			}

			console.log($('.medicine_dose').text())
			
			$('.bd').eq(0).css('border-bottom', 'none')
			$('.bd').eq(i).css('border-bottom', 'none')

		},
		error: function() {
			console.log(data)
		}
	});
	
	

})