/**
 * Created by yangjiajun on 15/9/28.
 */
import ChatTpl from './chat-template.html!text';
import ChatWeiXinTpl from './chat-weixin-template.html!text';
import ChatCtrl from './chat-controller';
import ChatWeiXinCtrl from './chat-weixin-controller';

function is_weixn(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else {
        return false;
    }
}
var ChatRoute = {
    template    :   ChatWeiXinTpl,
    controller  :  'ChatWeiXinCtrl'
};
if(!is_weixn()){
    ChatRoute = {
        template    :   ChatTpl,
        controller  :  'ChatCtrl'
    };
}

export default ChatRoute;