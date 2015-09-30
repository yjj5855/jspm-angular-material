/**
 * Created by yangjiajun on 15/9/28.
 */

import './chat-value'

export default angular.module('chat')
    .controller('ChatCtrl',['$rootScope','$scope','$timeout','$window','chat.value','$mdSidenav','$mdUtil','$log',
        function($rootScope,$scope,$timeout,$window,value,$mdSidenav,$mdUtil,$log){
            $scope.msg_list = value.msg_list;
            $scope.service_info = value.service_info;
            $scope.user_info = value.user_info;
            $scope.back = back;
            $scope.toggleRight = buildToggler('right');
            /////////////////////////////////////////////
            function back(){
                $window.history.back()
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
        }]
    )
    .controller('ChatRightCtrl',['$rootScope','$scope','$timeout','$window','chat.value',
        function($rootScope,$scope,$timeout,$window,value){

        }]
    )