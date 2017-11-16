layui.use('jquery',function(){
	var $ = layui.jquery;
	$().ready(function(){
		var url = location.href
		// var url = 'http://test2.vongihealth.com/wechat-web/wechat/judge/loginOrRegister?doctor_phone=&openid=c547e5d570040d00b1d4a89eb3c981d855e0d0eb952d2a4c3aa2a88a006f4b10'
		
		,idIndex = url.indexOf('openid')
		
		,openid = url.slice(idIndex+7)
		
		,phoneStartIndex = url.indexOf('phone')+6
		
		,phoneEndIndex = url.indexOf('&')
		
		,phoneNum = url.slice(phoneStartIndex,phoneEndIndex);

		console.log(location.href);
		layui.data('openid',{
			key:'openid',
			value:openid
		})

		// console.log('openid:'+openid)

		localStorage.phoneNum = phoneNum;
		console.log(openid)

	})
})
