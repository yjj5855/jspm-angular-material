/**
 * Created by yangjiajun on 15/9/28.
 */

import './index-value'

class IndexCtrl{
    constructor($location,$scope,value,$timeout,$rootScope){
        $scope.chatStatus = value.chatStatus?value.chatStatus = !value.chatStatus:'';
        $scope.openChatRoute = openChatRoute;


        /**
         * function
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

IndexCtrl.$inject = ['$location','$scope','index.value','$timeout','$rootScope'];

export default IndexCtrl;