/**
 * Created by yangjiajun on 15/10/8.
 *
 */
export default angular.module('chat')
    .directive('cmBackBtn',['$window',function($window){
        return {
            restrict: 'AE',
            replace: true,
            scope:true,
            link : function(scope,element,attrs){

                function back(){
                    $window.history.back()
                }

                angular.element(element).on('click',function(){
                    back();
                })
            }
        }
    }]);