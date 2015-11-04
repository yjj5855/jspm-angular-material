/**
 * Created by yangjiajun on 15/10/15.
 */

import $ from 'jquery'


function myAppCtrl($rootScope){

    $rootScope.is_weixn = window.is_weixn();

    $rootScope.$on('$viewContentLoaded', function() {
        var el = $("#message_box");
        if(el.length == 1){
            $rootScope.winheight= $(window).height();
            $rootScope.winwidth = $(window).width();
            $rootScope.header = $rootScope.is_weixn?0:56;
            $(el[0]).css('height',$rootScope.winheight-$rootScope.header-48+'px');
        }
        $("body").css('background','#fff');
    });

}

myAppCtrl.$inject = ['$rootScope'];

export default myAppCtrl;