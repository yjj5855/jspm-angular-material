/**
 * Created by yangjiajun on 15/10/15.
 */

import $ from 'jquery'


function myAppCtrl($rootScope){

    $rootScope.is_weixn = window.is_weixn();

    if($rootScope.is_weixn){
        //页面加载完成后自适应屏幕
        $rootScope.$on('$viewContentLoaded', function() {
            $rootScope.winheight= $(window).height();
            $rootScope.winwidth = $(window).width();
            $rootScope.header = $rootScope.is_weixn?0:56;
            var el = $("#message_box");
            if(el.length == 1){
                $(el[0]).css('max-height',$rootScope.winheight-$rootScope.header-48);
                $("#message_input").css('width',$rootScope.winwidth-48-48-52-30);
                $("#audio_input").css('width',$rootScope.winwidth-48-52-10);
            }
        });
    }

}

myAppCtrl.$inject = ['$rootScope'];

export default myAppCtrl;