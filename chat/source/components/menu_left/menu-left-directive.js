/**
 * Created by yangjiajun on 15/10/8.
 */

import LeftMenuTpl from './menu-left-template.html!text'

export default angular.module('index')
    .directive('menuLeft',[function(){
        return {
            restrict: 'E',
            replace: true,
            transclude:true,
            scope:{
            },
            template: LeftMenuTpl,
            link : function(scope, element, attrs){

            }
        }
    }])
    .directive('menuLeftBtn',['$mdUtil','$mdSidenav','$log', function($mdUtil,$mdSidenav,$log){
        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
        function toggler(navID) {
            var debounceFn =  $mdUtil.debounce(function(){
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            },200);
            return debounceFn;
        }

        return {
            restrict: 'A',
            compile : function(element, attrs){
                var toggleLeft = toggler('left');
                angular.element(element).on('click',function(){
                    toggleLeft();
                });
            }
        }
    }])