/**
 * Created by yangjiajun on 15/10/15.
 */

import $ from 'jquery'


function myAppCtrl($rootScope,$timeout,$cookies){

    $rootScope.is_weixn = window.is_weixn();
    $rootScope.isAndroid = navigator.userAgent.match(/Android/i) ? true: false;
    $rootScope.isBlackBerry = navigator.userAgent.match(/BlackBerry/i) ? true: false;
    $rootScope.isiPhone = navigator.userAgent.match(/iPhone/i) ? true: false;
    $rootScope.isWindows = navigator.userAgent.match(/IEMobile/i) ? true: false;
    $rootScope.autoSetMessageBoxHeight = autoSetMessageBoxHeight;

    getSysVersion();//获取系统版本

    //页面加载完成后自适应屏幕
    $rootScope.$on('$viewContentLoaded', function() {
        $timeout(()=>{
            autoSetMessageBoxHeight()
        },1e1)
    });
    $(window).resize(function(){
        autoSetMessageBoxHeight();
    })


    $rootScope.pageClass = 'page';
    //判断 用户登录
    $rootScope.$on('$routeChangeStart', function(evt, next, current) {

        var user_secret = $cookies.get('user_login_cookie');
        //下一个页面的控制器
        var ctrl_name = next.$$route?next.$$route.controller:'';
        //当前页面的路径
        var curr_path = '';
        if(angular.isDefined(current)&&angular.isDefined(current.$$route)){
            curr_path = current.$$route.originalPath;
        }else{
            curr_path = '/login'
        }

        //第一优先 判断token
        //if(angular.isUndefined(user_secret)){
        //    $location.path('/login');
        //    return;
        //}else{
        //    if(ctrl_name == 'LoginCtrl'){
        //        $location.path('/');
        //        return;
        //    }
        //}


        //刷新页面进来的
        if(angular.isUndefined(current)) {

        }else{

        }
    })
////////////////////////////////////

    function autoSetMessageBoxHeight(){
        var el = $("#message_box");
        if(el.length == 1){
            $rootScope.winheight= $(window).height();
            $rootScope.winwidth = $(window).width();
            $rootScope.header = $("#cm-header").height();
            $rootScope.topToolbar = $("md-toolbar:first").height();
            $rootScope.bottom = 49;
            $(el[0]).css('height',$rootScope.winheight-$rootScope.header-$rootScope.topToolbar-$rootScope.bottom+'px');

            $("#message_input").css('width',$rootScope.winwidth-48-48-13);
        }
        $("body").css('background','#f1f1f1');
    }

    function getSysVersion(){
        if($rootScope.isAndroid){
            var str = navigator.userAgent.match(/Android ([\d.]+)/);
            for(let i=0;i<str.length;i++){
                if(parseFloat(str[i])>0){
                    $rootScope.sys_version = parseFloat(str[i]);
                }
            }
        }else if($rootScope.isiPhone){
            var str = navigator.userAgent.match(/iPhone OS ([\d_]+) /);
            for(let i=0;i<str.length;i++){
                if(parseFloat(str[i])>0){
                    $rootScope.sys_version = parseFloat(str[i]);
                }
            }
        }
    }

}

myAppCtrl.$inject = ['$rootScope','$timeout','$cookies'];

export default myAppCtrl;