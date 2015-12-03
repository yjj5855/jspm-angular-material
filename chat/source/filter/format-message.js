/**
 * Created by yangjiajun on 15/10/10.
 */

angular.module('format_msg',[])
    .filter('format_msg',['$sce','$rootScope',function($sce,$rootScope){
        var face_list = {
            '[blush]': 'ee_1.png',
            '[relieved]': 'ee_2.png',
            '[heart_eyes]': 'ee_3.png',
            '[hushed]': 'ee_4.png',
            '[kissing_closed_eyes]': 'ee_5.png',
            '[stuck_out_tongue_winking_eye]': 'ee_6.png',
            '[stuck_out_tongue_closed_eyes]': 'ee_7.png',
            '[sleepy]': 'ee_8.png',
            '[sob]': 'ee_9.png',
            '[joy]': 'ee_10.png',
            '[grin]': 'ee_11.png',
            '[smiley]': 'ee_12.png',
            '[sweat]': 'ee_13.png',
            '[confounded]': 'ee_14.png',
            '[kissing_heart]': 'ee_15.png',
            '[angry]': 'ee_16.png',
            '[flushed]': 'ee_17.png',
            '[mask]': 'ee_18.png',
            '[astonished]': 'ee_19.png',
            '[rage]': 'ee_20.png',
            '[zzz]': 'ee_21.png',
            '[iphone]': 'ee_22.png',
            '[beers]': 'ee_23.png',
            '[punch]': 'ee_24.png',
            '[ok_hand]': 'ee_25.png',
            '[+1]': 'ee_26.png',
            '[thumbsdown]': 'ee_27.png',
            '[clap]': 'ee_28.png',
            '[pray]': 'ee_29.png',
            '[broken_heart]': 'ee_30.png',
            '[rose]': 'ee_31.png',
            '[bikini]': 'ee_32.png',
            '[dress]': 'ee_33.png',
            '[womans_hat]': 'ee_34.png',
            '[shirt]': 'ee_35.png',
            '[high_heel]': 'ee_36.png',
            '[boot]': 'ee_37.png',
            '[boy]': 'ee_38.png',
            '[girl]': 'ee_39.png',
            '[man]': 'ee_40.png',
            '[woman]': 'ee_41.png',
            '[skull]': 'ee_42.png',
            '[fire]': 'ee_43.png',
            //兼容客户端 传的标识不一样
            '[smile]': 'ee_12.png'
        }

        return function (text,type) {
            type = type+'';
            switch (type){
                case '1'://文本
                    if(text && text !='' && text != undefined){
                        text = text.replace(/\n/g,function(a,b){
                            return '<br/>';
                        });
                        text = text.replace(/\[.+?\]/g,function(a,b){
                            return  '<image src="/chat/public/img/face/'+face_list[a]+'" height="30px"/>';
                        });
                        text = text.replace(/<\(.+?\)>/g,function(a,b){
                            if(a.length>4){
                                var baike = a.replace('<(','').replace(')>','');
                                return '<a target="_blank" class="" href="javascript:;"><code>'+baike+'</code></a>'
                            }
                            return a;
                        });
                    }
                    break;
                case '2'://语音
                    text = '<audio controls="controls" src="'+text+'"></audio>';
                    break;
                case '3'://图片
                    text = '<img src="'+text+'!dengbisuofang" width="auto"/>';
                    break;
                case '4'://用户分享行为
                    text = text.toString();
                    switch(text){
                        case "show":
                            text = "客户端弹出了分享框!";
                            break;
                        case"qq":
                            text = "用户分享到了QQ";
                            break;
                        case"wx":
                            text = "用户分享到了好友";
                            break;
                        case"pyq":
                            text = "用户分享到了朋友圈";
                            break;
                        case"cancel":
                            text = "用户取消了分享";
                            break;
                        default :
                            break;
                    }
                    text = "系统消息:"+text;
                    break;
                default :

                    break;
            }
            return $sce.trustAsHtml(text);
        }
    }]);