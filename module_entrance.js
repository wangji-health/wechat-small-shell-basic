//layui.config({
//	base: 'js/'
//}).extend({
//	
//})

layui.use(['form', "jquery", 'layedit', 'laydate'], function() {
	var $ = layui.jquery,
		form = layui.form(),
		layer = layui.layer,
		layedit = layui.layedit,
		laydate = layui.laydate;

	$(".hf-ol-2").on("click", function() {
		location.href = "http://localhost:8080/wechat-web/wechat/register.html"
	})

	$(".protocol").on("click", function() {
		location.href = "http://localhost:8080/wechat-web/wechat/protocol.html"
	})

	$(".left").on("click", function() {
		location.href = "http://localhost:8080/wechat-web/wechat/forgetPS.html"
	})

	$('.right').on('click',function(){
		location.href = 'http://localhost:8080/wechat-web/wechat/register.html'
	})
});