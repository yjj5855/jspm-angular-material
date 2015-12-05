
import $ from 'jquery'

export default angular.module('loading',[])
    .directive('loading',['$http','$rootScope',function($http,$rootScope){
        return {
            restrict: 'A',
            link: function (scope, elm, attrs)
            {
                let top = ($(window).height()-102)/2;
                let left = ($(window).width()-102)/2;
                $(elm).css('top',top+'px');
                $(elm).css('left',left+'px');

                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (v)
                {
                    if(v){
                        if($rootScope.hide_http_loading){
                           return;
                        }
                        $(elm).show();
                    }else{
                        $(elm).hide();
                    }
                });
            }
        };
    }]);