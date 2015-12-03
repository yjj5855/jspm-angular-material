
export default
    angular.module('User',['ngRoute','ngResource'])
    .config(['$resourceProvider','$httpProvider', function($resourceProvider,$httpProvider) {

        $httpProvider.defaults.headers.common = {
            'Accept':'application/json, text/javascript, */*; q=0.01',
            'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
        };
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

    }])
    .service('User',['$rootScope','$http','$resource','apiConfig',
        function($rootScope,$http,$resource,apiConfig){
            var wechat_host = apiConfig.wx_host;
            let mobile_host = apiConfig.mobile_host;

            return $resource(wechat_host+'callback/userinfobycode',{},{
                getUserInfoByCode:{
                    url:wechat_host+'callback/userinfobycode',
                    method:'GET',
                    params: apiConfig.authParams,
                },
                getHistoryMsg:{
                    url:wechat_host+'user/historymsg',
                    method:'GET',
                    params: apiConfig.authParams,
                },
                getUserInfoByThirdApp:{
                    url:mobile_host+'passport/login',
                    method:'POST',
                }
            });
        }]);