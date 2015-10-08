/**
 * Created by yangjiajun on 15/10/8.
 */

import LeftMenuTpl from './menu-left-template.html!text'

export default angular.module('index')
    .directive('menuLeft',[function(){
        return {
            restrict: 'AE',
            replace: true,
            transclude:true,
            scope:{
            },
            template: LeftMenuTpl,
            link : function(scope, element, attrs){

            }
        }
    }])