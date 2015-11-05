/**
 * Created by yangjiajun on 15/9/28.
 */
import ChatCtrl from './chat-controller';
import ChatTpl from './chat-template.html!text';

var ChatRoute = {
        template    :   ChatTpl,
        controller  :  'ChatCtrl',
        resolve:{

        }
    };

export default ChatRoute;