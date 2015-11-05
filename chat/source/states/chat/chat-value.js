/**
 * Created by yangjiajun on 15/9/28.
 */

var chatValue = {
    animation_class       :   'chat-page',
    //type 1=文本 | 2=声音 | 3=图片
    message     :   {
        content :   '',
        type    :   1
    },
    open_face_status:false,
    open_audio_status:false,
    user_info   :   {
        name    :   'user',
        avatar  :   '/chat/public/img/default_user.jpg'
    },
    service_info :   {
        name    :   'admin',
        avatar  :   '/chat/public/img/default_service.png'
    },
    msg_list    :   []
};

export default angular.module('chat').value('chat.value',chatValue);