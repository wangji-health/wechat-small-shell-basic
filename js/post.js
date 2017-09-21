layui.use('jquery', function() {
	var $ = layui.jquery,
		layer = layui.layer;

	$().ready(function() {

		var url = 'http://33061990.ngrok.io/wechat-web/wechat/forwardPage/bind_doctor?user_id=170908101424883232',
			userId_startIndex = url.indexOf('user_id=') + 8,
			user_Id = url.slice(userId_startIndex);

		$('.top2').on('click', function() {
			location.href = '/wechat-web/wechat/antivirus.html'
		})

		$('.top3').on('click',function(){
			location.href = '/wechat-web/wechat/inoculate.html'
		})
		
		console.log(user_Id);

		var Main = {
			url: "http://localhost:8080",
			urll: function(data) {
				return this.url + data
			}
		}

		var basic_url = Main.urll('/wechat-web/wechat/getButton?user_id=') + user_Id;
		//主页的按钮显示
		$.ajax({
			type: "get",
			url: basic_url,
			async: true,
			dataType: 'json',
			contentType: 'application/json;charset=utf-8',
			success: function(data) {

				console.log(data)

				var user = data.data;

				console.log(user);

				if(user == 1) {
					$('.out').show();
					$('.wd11').text('怀孕了？');
					$('.wd22').text('点击填写怀孕信息');

					$('.out').on('click', function() {
						location.href = '/wechat-web/wechat/pregnant_info.html';
					})
				} else if(user == 2) {
					$('.out').show();
					$('.wd11').text('宝宝出生了?');
					$('.wd22').text('点击填写分娩信息');

					$('.out').on('click', function() {
						location.href = '/wechat-web/wechat/giveBirth_info.html'
					})
				} else if(user == 0) {
					$('.out').hide();
				} else if(user == 3) {
					$('.out').show();
					$('.wd11').text('补充宝宝信息');
					$('.wd22').text('点击补充宝宝7月信息');
					
					$('.out').on('click', function() {
						location.href = '/wechat-web/wechat/supplementary_info.html'
					})
				}

			},
			error: function(data) {
				console.log(data)
			}
		});

	})

})