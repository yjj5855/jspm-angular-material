/**
 * Created by yangjiajun on 15/9/24.
 */
import $ from 'jquery'
import 'angular-route';
import 'angular-resource'
import '../service/ApiConfig'
import '../env'
import 'source/filter/format-message'

import ChatModule from 'source/states/chat/chat-module'

import CoreRouter from 'source/core/core-router'


var CoreModule = angular.module('myApp',[
    'ngRoute',
    'ngResource',
    'ngMaterial',

    'env',
    'apiConfig',
    'format_msg',
    ChatModule.name,
])
    .config(CoreRouter)
    .controller('myAppCtrl',['$rootScope',function($rootScope){
        $rootScope.is_weixn = is_weixn;

        if(is_weixn()){
            //页面加载完成后自适应屏幕
            $rootScope.$on('$viewContentLoaded', function() {
                $rootScope.winheight= $(window).height();
                $rootScope.winwidth = $(window).width();
                $rootScope.header = is_weixn()?0:56;
                var el = $("#message_box");
                if(el.length == 1){
                    $(el[0]).css('max-height',$rootScope.winheight-$rootScope.header-48);
                    $("#message_input").css('width',$rootScope.winwidth-48-48-52-30);
                    $("#audio_input").css('width',$rootScope.winwidth-48-52-10);
                }
            });
        }

        /**
         * 判断是否在微信打开
         * @returns {boolean}
         */
        function is_weixn(){
            var ua = navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i)=="micromessenger") {
                return true;
            } else {
                return false;
            }
        }
    }]);

export default CoreModule