/**
 * Created by yangjiajun on 15/10/15.
 */

import $ from 'jquery'

import ErrorDialogCtrl from 'source/states/chat/dialog/error-dialog-controller';
import ErrorDialogHtml from 'source/states/chat/dialog/error-dialog-template.html!text'

function myAppCtrl($rootScope,$timeout,$mdDialog,$scope){

    $rootScope.is_weixn = window.is_weixn();
    $rootScope.isAndroid = navigator.userAgent.match(/Android/i) ? true: false;
    $rootScope.isBlackBerry = navigator.userAgent.match(/BlackBerry/i) ? true: false;
    $rootScope.isiPhone = navigator.userAgent.match(/iPhone/i) ? true: false;
    $rootScope.isWindows = navigator.userAgent.match(/IEMobile/i) ? true: false;
    $rootScope.autoSetMessageBoxHeight = autoSetMessageBoxHeight;
    $rootScope.errorDialog = errorDialog;

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

    function errorDialog(msg){
        $scope.error_msg = msg;
        $mdDialog.show({
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
            template: ErrorDialogHtml,
            controller:ErrorDialogCtrl
        });
    }
}

myAppCtrl.$inject = ['$rootScope','$timeout','$mdDialog','$scope'];

export default myAppCtrl;