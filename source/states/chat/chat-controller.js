/**
 * Created by yangjiajun on 15/9/28.
 */

import './chat-value'

class ChatCtrl{
    constructor($rootScope,$scope,$timeout,$window,value){
        $scope.msg_list = value.msg_list;
        $scope.service_info = value.service_info;
        $scope.user_info = value.user_info;
        $scope.back = function(){
            $window.history.back()
        }
    }

}

ChatCtrl.$inject = ['$rootScope','$scope','$timeout','$window','chat.value'];

export default ChatCtrl;