/**
 * Created by yangjiajun on 15/10/15.
 */

import $ from 'jquery'


function myAppCtrl($rootScope,$routeParams){

    $rootScope.is_weixn = window.is_weixn();



    //页面加载完成后自适应屏幕
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
            $rootScope.header = $(".cm-toolbar:first").height();
            $rootScope.bottom = 49;
            $(el[0]).css('height',$rootScope.winheight-$rootScope.header-$rootScope.bottom+'px');

            $("#message_input").css('width',$rootScope.winwidth-48-48-52-13);
            $("#audio_input").css('width',$rootScope.winwidth-48-52-10);
        }
        $("body").css('background','#fff');
    }

}

myAppCtrl.$inject = ['$rootScope','$routeParams'];

export default myAppCtrl;