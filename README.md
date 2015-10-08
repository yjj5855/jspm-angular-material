# jspm-angular-material
使用jspm 快速构建 Material Design 设计模式的 angular 应用

demo : <a href="http://182.92.99.230">http://182.92.99.230</a>

1.执行 npm install jspm -g  全局安装jspm

2.执行 jspm install 安装依赖包

3.执行 npm install 安装开发和构建包

4.执行 gulp 构建开发项目

5.开发完成后 单入口项目 可使用 jspm bundle source/app --inject --minify 打包所有依赖(包括CSS)

6.jspm unbundle 不使用打包合并的js