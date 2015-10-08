/**
 * Created by yangjiajun on 15/9/28.
 */

import './index-value'
import 'source/components/menu_left/menu-left-directive'

class IndexCtrl{
    constructor($location,$scope,value,$timeout,$rootScope,$mdUtil,$mdSidenav,$log){
        $scope.chatStatus = value.chatStatus?value.chatStatus = !value.chatStatus:'';
        $scope.openChatRoute = openChatRoute;
        $scope.toggleLeft = buildToggler('left');

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

        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
        function buildToggler(navID) {
            var debounceFn =  $mdUtil.debounce(function(){
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            },200);
            return debounceFn;
        }
    }

}

IndexCtrl.$inject = ['$location','$scope','index.value','$timeout','$rootScope','$mdUtil','$mdSidenav','$log'];

export default IndexCtrl;