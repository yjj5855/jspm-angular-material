/**
 * Created by yangjiajun on 15/9/28.
 */

import ChatWeiXinTpl from './chat-weixin-template.html!text';

import ChatWeiXinCtrl from './chat-weixin-controller';

var ChatRoute = {};

ChatRoute = {
    template: ChatWeiXinTpl,
    controller: 'ChatWeiXinCtrl'
}

export default ChatRoute;