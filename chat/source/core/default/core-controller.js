/**
 * Created by yangjiajun on 15/10/15.
 */

import $ from 'jquery'


function myAppCtrl($rootScope,$cookies,$location){

    $rootScope.is_weixn = window.is_weixn();
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



    $rootScope.$on('$viewContentLoaded', function() {
        autoSetMessageBoxHeight();
    });
    $(window).resize(function(){
        autoSetMessageBoxHeight();
    })

    function autoSetMessageBoxHeight(){
        var el = $("#message_box");
        if(el.length == 1){
            $rootScope.winheight= $(window).height();
            $rootScope.winwidth = $(window).width();
            $rootScope.header = $rootScope.is_weixn?0:56;
            $(el[0]).css('height',$rootScope.winheight-$rootScope.header-48+'px');
        }
        $("body").css('background','#fff');
    }


}

myAppCtrl.$inject = ['$rootScope','$cookies','$location'];

export default myAppCtrl;