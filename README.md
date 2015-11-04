# jspm-angular-material
使用jspm 快速构建 Material Design 设计模式的 angular 应用

示例 : <a href="http://182.92.99.230/chat/dist/weixin/index.html">请在微信中打开</a>

注意:代码中没有env.js 需要自行添加到 chat/source/env.js 代码如下

    export default angular.module('env',[])
    .service('env',function(){
        return {
            APP_ID       : "你的微信公众号ID",
            APP_HOST     : "你的微信网页授权地址",
            BASE_HOST    : "你的API后台地址",
            IM_HOST      : "你的IM后台地址"
        }
    });

0.目前只有chat这个项目 前往目录

    cd chat

1.全局安装jspm

    npm install jspm -g

2.安装依赖包

    jspm install

3.安装开发和构建包

    npm install

4.构建开发项目

    修改 public/index.html 中的 System.import("source/app-default 或 source/app-weixin"); 调试不同页面

    gulp

5.开发完成后 打包项目 这里只打包了一个项目

    gulp weixin

