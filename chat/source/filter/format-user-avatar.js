/**
 * Created by yangjiajun on 15/10/10.
 */

angular.module('format_avatar',[])
    .filter('format_avatar',['$rootScope','$filter',function ($rootScope,$filter) {
            return function (avatar,channel_sign) {

                if(avatar!=''){
                    return avatar;
                }

                switch(channel_sign){
                    case'czl_xxyh':
                        avatar = '/chat/public/img/default_user_xxyh.jpg';
                        break;
                    case'czl_lechebang':
                        avatar = '/chat/public/img/default_user_lechebang.jpg';
                        break;
                    default:
                        avatar = '/chat/public/img/default_user.jpg';
                        break;
                }
                return avatar;
            }
        }]
    )