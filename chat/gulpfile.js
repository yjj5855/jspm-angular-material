// gulpfile.js
var fs          = require('fs');
var yaml        = require('js-yaml');
// var _           = require('lodash');
var gulp        = require('gulp');
// var proxy       = require('proxy-middleware');
// var url         = require('url');
var browserSync = require('browser-sync');

var clean = require('gulp-clean');
var concat  = require('gulp-concat');
var uglify  = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');//页面替换

    try {
    var options = yaml.safeLoad(fs.readFileSync('./config.yaml', 'utf-8'));
} catch (error) {
    throw new Error(error);
}

var taskDependencies = (function() {
    gulp.task('server', function() {
        // var proxyMiddleware = proxy(
        //     _.assign(url.parse(options.proxyURL), options.proxyOptions)
        // );
        // options.browserSync.server.middleware.push(proxyMiddleware);
        browserSync(options.browserSync);
    });

    return ['server'];
}());

gulp.task('default', taskDependencies, function() {
    // Default Task Denifition
});

/**
 *  minify: Use minification, defaults to true.
    mangle: Use mangling with minification, defaults to true.
    lowResSourceMaps: Use faster low-resolution source maps, defaults to true.
    sourceMaps: Use source maps, defaults to true.
 */

var jspm = require('jspm');

//清空dist
gulp.task('clean', function() {
    return gulp.src(['./dist/default'], {read: false})
        .pipe(clean({force: true}));
});


gulp.task('weinxinclean', function() {
    return gulp.src(['./dist/weixin'], {read: false})
        .pipe(clean({force: true}));
})

gulp.task('weixin',['weinxinclean'],function(){
    var v = new Date().getTime();
    console.log('开始任务');
    jspm.setPackagePath('./');
    console.log('设置包路径');
    jspm.bundleSFX('./source/app-weixin.js','./dist/weixin/weixin-'+v+'.js',{
        sourceMaps:false,
        minify:true
    }).then(function(){
        console.log('打包weixin.js完成');

        gulp.src('./public/index.html')
            .pipe(htmlreplace({
                app_js:{
                    src: null,
                    tpl: '<script src="/chat/dist/weixin/weixin-'+v+'.js"></script>'
                }
            }))
            .pipe(gulp.dest('./dist/weixin'))

        console.log('执行成功！');
    })
});

gulp.task('appclean', function() {
    return gulp.src(['./dist/default'], {read: false})
        .pipe(clean({force: true}));
})

gulp.task('app',['appclean'],function(){
    var v = new Date().getTime();
    console.log('开始任务');
    jspm.setPackagePath('./');
    console.log('设置包路径');
    jspm.bundleSFX('./source/app-default.js','./dist/default/default-'+v+'.js',{
        sourceMaps:false,
        minify:true
    }).then(function(){
        console.log('打包default.js完成');

        gulp.src('./public/index.html')
            .pipe(htmlreplace({
                app_js:{
                    src: null,
                    tpl: '<script src="/chat/dist/default/default-'+v+'.js"></script>'
                }
            }))
            .pipe(gulp.dest('./dist/default'))

        console.log('执行成功！');
    })
});

gulp.task('all',['app','weixin'],function(){

})