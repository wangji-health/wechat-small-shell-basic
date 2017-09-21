layui.use('jquery',function(){
	var $ = layui.jquery;
	$().ready(function(){
//		var url = location.href 
		var url = 'http://c7f31360.ngrok.io/wechat-web/wechat/judge/loginOrRegister?doctor_phone=6c0b513bb1c751a19ac6465b9db837e9&openid=c547e5d570040d00b1d4a89eb3c981d855e0d0eb952d2a4c3aa2a88a006f4b10'
		
		,idIndex = url.indexOf('openid')
		
		,openid = url.slice(idIndex+7)
		
		,phoneStartIndex = url.indexOf('phone')+6
		
		,phoneEndIndex = url.indexOf('&')
		
		,phoneNum = url.slice(phoneStartIndex,phoneEndIndex)
		
		layui.data('openid',{
			key:'openid',
			value:openid
		})
		
		layui.data('doctor_phone',{
			key:'phone',
			value:phoneNum
		})
		
		
	})
})
