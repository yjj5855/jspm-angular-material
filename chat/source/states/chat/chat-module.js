/**
 * Created by yangjiajun on 15/9/28.
 */

var ChatModule;

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

if(is_weixn()){
    ChatModule = angular.module('chat',[])
}else{
    ChatModule = angular.module('chat',['ngMaterial'])
}
export default ChatModule;