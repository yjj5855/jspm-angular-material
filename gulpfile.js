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
    return gulp.src(['./dist'], {read: false})
        .pipe(clean({force: true}));
});

gulp.task('public',['clean'],function(){
    gulp.src('./public/**').pipe(gulp.dest('./dist/public'));
})

gulp.task('jspm',['public'],function(){
    jspm.setPackagePath('.');
    jspm.bundle('source/app','./build.js',{
        inject:true,
        sourceMaps:false,
        minify:true,

    }).then(function(){


        gulp.src([
            './jspm_packages/system.js',
            './config.js',
        ])
            .pipe(concat('system.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('./dist'))

        gulp.src('./build.js').pipe(gulp.dest('./dist'));

        gulp.src('./public/index.html')
            .pipe(htmlreplace({
                system_js:'../system.min.js',
            }))
            .pipe(gulp.dest('./dist/public'))

        console.log('执行成功！');
    })
});
