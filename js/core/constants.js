/**
 * Created by Administrator on 2017-9-25.
 */
export const context = '/wechat-web';

export let htmlPath = 'html_inline';

export let appId = 'wx1214f069d527b6d2';//测试
// export let appId = 'wx05f582ee2491334f';//正式
export const Main = {
  // url: "http://localhost:8080",
  // url: "http://192.168.8.180:8080",
  // url: "http://test2.vongihealth.com",
  url: "http://test.vongihealth.com",
  // url: "http://wechat.vongihealth.com",
  // url: "http://290e880c.ngrok.io",
  urll: function(data) {
    return this.url + data
  }
};

if (process.env.NODE_ENV === 'production') {
  htmlPath = 'html'
}
