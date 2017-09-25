/**
 * Created by Administrator on 2017-9-25.
 */
export const context = '/wechat-web';
export const htmlPath = 'html_inline';

export const Main = {
  url: "http://localhost:8080",
  urll: function(data) {
    return this.url + data
  }
};
