import {context, htmlPath, Main, appId} from './core/constants';
import '../css/laboratorySheet.scss';
// const wxUrl = Main.urll('/wechat-web/wechat/getWXConfig?url=')+location.href.split('#')[0];
const wxUrl = Main.urll('/wechat-web/wechat/getWXConfig?url=') + location.href;
// "http://localhost:8080/wechat-web/wechat/getWXConfig?url=" + location.href
$().ready(function () {
  //获取user_id
  var url = 'http://33061990.ngrok.io/wechat-web/wechat/forwardPage/bind_doctor?user_id=170908101424883232',
    // var url = location.href,
    userId_startIndex = url.indexOf('user_id=') + 8,
    user_Id = url.slice(userId_startIndex);
  console.log(user_Id);
  var screenWdith = $(window).width();
  console.log(screenWdith);
  $('.postImg').width(screenWdith * 0.44);
  $('.imgBox').width(screenWdith * 0.44).height(screenWdith * 0.44);
  var $imgTmp = $('#preBox').html();
  console.log($imgTmp);
  //控制确认框高度
  var screenWidth = $(window).width();
  var screenHeight = $(window).height();
// console.log(screenHeight);
  $('.confirm').width(screenWidth*0.75);
  var confirmHeight = $('.confirm').width()*0.58;
  $('.confirm').height(confirmHeight);
// console.log($('.confirm').height());
  //展示化验单
  $.ajax({
    type: "get",
    url: Main.urll('/wechat-web/wechat/getAssayList?user_id=') + user_Id,
    async: true,
    dataType: 'json',
    contentType: 'application/json;charset=utf-8',
    success:function (data) {
      console.log(data);
      var len = data.data.length;
      for(var i =0;i<len; i++){
        var showTmp = $imgTmp.replace('{{imgUrl}}',data.data[i].assay_Url).replace('{{picTime}}',data.data[i].assay_Upload_Time.slice(0,10));
        $('.container').append(showTmp);
        $('.del').off().on('click',function () {
          var delIndex = $(this).parents('.postImg').index('.postImg');
          console.log(delIndex);
          sessionStorage.delIndex = JSON.stringify(delIndex);
          $('.cHide').show();
          // $('.postImg').eq(delIndex).remove();
          // var postDelIndexId = data.data[delIndex].assay_Id;
          // console.log(postDelIndexId);
        })
      }
      $('.confirmCancel').on('click',function () {
        $('.cHide').hide();
      });
      $('.confirmSure').off().on('click',function () {
        $('.cHide').hide();
        var realDelIndex = JSON.parse(sessionStorage.delIndex);
        sessionStorage.removeItem('delIndex');
        alert('这是从展示出删除的index:'+realDelIndex);
        $('.postImg').eq(realDelIndex).remove();
        //获取删除id  需要重新请求不然会有错误
        $.ajax({
          type: "get",
          url: Main.urll('/wechat-web/wechat/getAssayList?user_id=') + user_Id,
          async: true,
          dataType: 'json',
          contentType: 'application/json;charset=utf-8',
          success:function (data) {
            console.log(data);
            var postDelIndexId = data.data[realDelIndex].assay_Id;
            console.log(postDelIndexId);
            //向后台提交删除化验单的id
            $.ajax({
              type: "get",
              url: Main.urll('/wechat-web/wechat/deleteAssay?assay_id=') + postDelIndexId,
              async: true,
              dataType: 'json',
              contentType: 'application/json;charset=utf-8',
              success:function (data) {
                console.log(data)
              },
              error:function () {

              }
            })
          },
          error:function () {

          }
        });

      })
    },
    error:function () {

    }
  });
  //上传化验单接口
  $.ajax({
    type: "get",
    url: wxUrl,
    async: true,
    dataType: 'json',
    contentType: 'application/json;charset=utf-8',
    success: function (data) {
      console.log(data);
      var signature = data.data.signature;
      var timestamp = data.data.timestamp;
      var nonceStr = data.data.nonceStr;
      // alert('获取微信配置链接='+location.href+'请求链接='+wxUrl);
      // alert('signature:'+signature+';==nonceStr:'+nonceStr);
      wx.config({
        debug: false,
        appId: appId,
        timestamp: timestamp,
        nonceStr: nonceStr,
        signature: signature,
        jsApiList: [
          'checkJsApi',
          'chooseImage',
          'uploadImage',
        ]
      });
      wx.ready(function () {
        // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
        // document.querySelector('#checkJsApi').onclick = function () {
        //   wx.checkJsApi({
        //     jsApiList: [
        //       'checkJsApi',
        //       'chooseImage',
        //       'uploadImage',
        //     ],
        //     success: function (res) {
        //       alert(JSON.stringify(res));
        //     }
        //   });
        // };
        // 5 图片接口

        //预览接口
        $('.imgBox').off().on('click',function () {
          alert($(this).parents().index());
          var index = $(this).parents().index();
          $('.postImg').eq(index).find('.pre').prop('src');
          // alert($('.postImg').eq(index).find('.pre').prop('src'));
          var nowUrl = $('.postImg').eq(index).find('.pre').prop('src');
            var thisimg = nowUrl;
            var imglist = $('.pre');
            var srcs = new Array();
            for(var i = 0; i < imglist.length; i++) {
              srcs.push(imglist.eq(i).attr('src'));
            }
            wx.ready(function() {
              wx.previewImage({
                current: thisimg, // 当前显示图片的http链接
                urls: srcs // 需要预览的图片http链接列表
              });
            });
        });



        // 5.1 拍照、本地选图
        var images = {
          localId: [],
          serverId: []
        };
        document.querySelector('#chooseImage').onclick = function () {
          wx.chooseImage({
            success: function (res) {
              images.localId = res.localIds;
              alert('已选择 ' + res.localIds.length + ' 张图片');
              // alert(res.localIds);
              uploadPic()
            }
          });
        };
        // 5.3 上传图片
        // uploadIPic
        // document.querySelector('#uploadImage').onclick =
          function uploadPic() {
          if (images.localId.length == 0) {
            alert('请先使用 chooseImage 接口选择图片');
            return;
          }
          var i = 0,
            length = images.localId.length;
          images.serverId = [];
          function upload() {
            wx.uploadImage({
              localId: images.localId[i],
              success: function (res) {
                var serverId = res.serverId;
                $.ajax({
                  type: "get",
                  url: Main.urll('/wechat-web/wechat/addAssays?media_id=') + serverId + '&user_id=' + user_Id,
                  async: true,
                  dataType: 'json',
                  contentType: 'application/json;charset=utf-8',
                  success: function (data) {
                    // $('.word').html(data.data[0].assay_Url);
                    alert('成功回调');
                    console.log(data);
                    // alert(data.data[0].assay_Url);
                    // console.log(data);
                    // alert(data)
                    var imgTmp = $('#preBox').html();
                    console.log(data.data[0].assay_Upload_Time2);
                    var tmp = imgTmp.replace('{{imgUrl}}', data.data[0].assay_Url).replace('{{picTime}}', data.data[0].assay_Upload_Time2.slice(0,10));
                    var screenWdith = $(window).width();
                    console.log(screenWdith);
                    // $('.postImg').width(screenWdith*0.44);
                    $('.imgBox').width(screenWdith * 0.44).height(screenWdith * 0.44).off().on('click',function () {
                      // alert($(this).parents().index());
                      var index = $(this).parent().index();
                      alert('图片的索引'+index);
                      $('.postImg').eq(index).find('.pre').prop('src');
                      // alert($('.postImg').eq(index).find('.pre').prop('src'));
                      var nowUrl = $('.postImg').eq(index).find('.pre').prop('src');
                      var thisimg = nowUrl;
                      var imglist = $('.pre');
                      var srcs = new Array();
                      for(var i = 0; i < imglist.length; i++) {
                        srcs.push(imglist.eq(i).attr('src'));
                      }
                      wx.ready(function() {
                        wx.previewImage({
                          current: thisimg, // 当前显示图片的http链接
                          urls: srcs // 需要预览的图片http链接列表
                        });
                      });
                    });
                    // $('.container').append(tmp);
                    if($('.postImg').eq(0).html()){
                      $(tmp).insertBefore($('.postImg').eq(0));
                    }else{
                      $('.container').append(tmp);
                    }
                    console.log(tmp);
                    //新增的删除化验单接口
                    $('.del').off().on('click',function () {
                      $('.cHide').show();
                      var delIndex = $(this).parents('.postImg').index('.postImg');
                      alert('新增index:'+delIndex);
                      sessionStorage.newIndex = JSON.stringify(delIndex);
                      // $('.postImg').eq(delIndex).remove();
                    });
                    //
                    $('.confirmCancel').on('click',function () {
                      $('.cHide').hide();
                    });
                    $('.confirmSure').off().on('click',function () {
                      $('.cHide').hide();
                      var nowIndex = JSON.parse(sessionStorage.newIndex);
                      alert('传过去的Index'+nowIndex);
                      sessionStorage.removeItem('newIndex');
                      $('.postImg').eq(nowIndex).remove();
                      //重新获取
                      $.ajax({
                        type: "get",
                        url: Main.urll('/wechat-web/wechat/getAssayList?user_id=') + user_Id,
                        async: true,
                        dataType: 'json',
                        contentType: 'application/json;charset=utf-8',
                        success:function (data) {
                          console.log('这是重新获取的Id');
                          console.log(data);
                          //上传化验单Id也就是删除
                          $.ajax({
                            type: "get",
                            url: Main.urll('/wechat-web/wechat/deleteAssay?assay_id=') + data.data[nowIndex].assay_Id,
                            async: true,
                            dataType: 'json',
                            contentType: 'application/json;charset=utf-8',
                            success:function (data) {
                              console.log(data)
                            },
                            error:function () {
                            }
                          })
                        },
                        error:function () {
                        }
                      })
                    })
                  },
                  error: function () {
                  }
                });
                alert(serverId);
                // $('.word').html(serverId);
                i++;
                alert('已上传：' + i + '/' + length);
                images.serverId.push(res.serverId);
                //下载
                if (i < length) {
                  upload();
                }
              },
              fail: function (res) {
                alert(JSON.stringify(res));
              }
            });
          }
          upload();
        };
      });
      wx.error(function (res) {
        alert(res.errMsg);
      });
    },
  });
// 	// 5.2 图片预览
// 	document.querySelector('#previewImage').onclick = function () {
// 	 wx.previewImage({
// 	   current: 'http://img5.douban.com/view/photo/photo/public/p1353993776.jpg',
// 	   urls: [
// 	     'http://img3.douban.com/view/photo/photo/public/p2152117150.jpg',
// 	     'http://img5.douban.com/view/photo/photo/public/p1353993776.jpg',
// 	     'http://img3.douban.com/view/photo/photo/public/p2152134700.jpg'
// 	   ]
// 	 });
// 	};
})

/*
 * 注意：
 * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
 * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
 * 3. 完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
 *
 * 如有问题请通过以下渠道反馈：
 * 邮箱地址：weixin-open@qq.com
 * 邮件主题：【微信JS-SDK反馈】具体问题
 * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
 */
// wx.ready(function() {
// 	// 1 判断当前版本是否支持指定 JS 接口，支持批量判断
// 	document.querySelector('#checkJsApi').onclick = function() {
// 		wx.checkJsApi({
// 			jsApiList: [
// 				'checkJsApi',
// 				'chooseImage',
// 				'uploadImage',
// 			],
// 			success: function(res) {
// 				alert(JSON.stringify(res));
// 			}
// 		});
// 	};
//
// 	// 5 图片接口
// 	// 5.1 拍照、本地选图
// 	var images = {
// 		localId: [],
// 		serverId: []
// 	};
// 	document.querySelector('#chooseImage').onclick = function() {
// 		wx.chooseImage({
// 			success: function(res) {
// 				images.localId = res.localIds;
// 				alert('已选择 ' + res.localIds.length + ' 张图片');
// 			}
// 		});
// 	};
//
// 	// 5.2 图片预览
// 	//document.querySelector('#previewImage').onclick = function () {
// 	//  wx.previewImage({
// 	//    current: 'http://img5.douban.com/view/photo/photo/public/p1353993776.jpg',
// 	//    urls: [
// 	//      'http://img3.douban.com/view/photo/photo/public/p2152117150.jpg',
// 	//      'http://img5.douban.com/view/photo/photo/public/p1353993776.jpg',
// 	//      'http://img3.douban.com/view/photo/photo/public/p2152134700.jpg'
// 	//    ]
// 	//  });
// 	//};
//
// 	// 5.3 上传图片
// 	document.querySelector('#uploadImage').onclick = function() {
// 		if(images.localId.length == 0) {
// 			alert('请先使用 chooseImage 接口选择图片');
// 			return;
// 		}
// 		var i = 0,
// 			length = images.localId.length;
// 		images.serverId = [];
//
// 		function upload() {
// 			wx.uploadImage({
// 				localId: images.localId[i],
// 				success: function(res) {
// 					i++;
// 					//alert('已上传：' + i + '/' + length);
// 					images.serverId.push(res.serverId);
// 					if(i < length) {
// 						upload();
// 					}
// 				},
// 				fail: function(res) {
// 					alert(JSON.stringify(res));
// 				}
// 			});
// 		}
// 		upload();
// 	};
//
// //	var shareData = {
// //		title: '微信JS-SDK Demo',
// //		desc: '微信JS-SDK,帮助第三方为用户提供更优质的移动web服务',
// //		link: 'http://demo.open.weixin.qq.com/jssdk/',
// //		imgUrl: 'http://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRt8Qia4lv7k3M9J1SKqKCImxJCt7j9rHYicKDI45jRPBxdzdyREWnk0ia0N5TMnMfth7SdxtzMvVgXg/0'
// //	};
// //	wx.onMenuShareAppMessage(shareData);
// //	wx.onMenuShareTimeline(shareData);
//
// 	// function decryptCode(code, callback) {
// 	// 	$.getJSON('/jssdk/decrypt_code.php?code=' + encodeURI(code), function(res) {
// 	// 		if(res.errcode == 0) {
// 	// 			codes.push(res.code);
// 	// 		}
// 	// 	});
// 	// }
// });
//
// wx.error(function(res) {
// 	alert(res.errMsg);
// });
// 5.4 下载图片
// document.querySelector('#downloadImage').onclick =
// function () {
//   if (images.serverId.length === 0) {
//     alert('请先使用 uploadImage 上传图片');
//     return;
//   }
//   var i = 0, length = images.serverId.length;
//   images.localId = [];
//   function download() {
//     wx.downloadImage({
//       serverId: images.serverId[i],
//       success: function (res) {
//         i++;
//         alert('已下载：' + i + '/' + length);
//         images.localId.push(res.localId);
//         if (i < length) {
//           download();
//         }
//       }
//     });
//   }
//   download();
// };