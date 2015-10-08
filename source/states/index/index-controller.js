/**
 * Created by yangjiajun on 15/9/28.
 */

import './index-value'
import 'source/components/menu_left/menu-left-directive'

class IndexCtrl{
    constructor($location,$scope,value,$timeout,$rootScope,$mdUtil,$mdSidenav,$log){
        $scope.chatStatus = value.chatStatus?value.chatStatus = !value.chatStatus:'';
        $scope.openChatRoute = openChatRoute;

        /**
         * 动画过度到chat聊天页面
         */
        function openChatRoute(){
            value.chatStatus = !value.chatStatus;
            $scope.chatStatus = !$scope.chatStatus;
            $timeout(()=>{
                $location.path('/chat');
            },800)
        }
    }

}

IndexCtrl.$inject = ['$location','$scope','index.value','$timeout','$rootScope','$mdUtil','$mdSidenav','$log'];

export default IndexCtrl;