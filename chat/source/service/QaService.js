
export default
    angular.module('Qa',['ngRoute','ngResource'])
    .config(['$resourceProvider','$httpProvider', function($resourceProvider,$httpProvider) {

        $httpProvider.defaults.headers.common = {
            'Accept':'application/json, text/javascript, */*; q=0.01',
            'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
        };
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

    }])
    .service('Qa',['$rootScope','$http','$resource','apiConfig',
        function($rootScope,$http,$resource,apiConfig){
            var service_host = apiConfig.mobile_host;

            return $resource(service_host+'qa/:qa_id',{},{
                create:{
                    url:service_host+'qa/create',
                    method:'GET',
                    params: apiConfig.authParams,
                },
                get:   {
                    method:'GET',
                    params: apiConfig.authParams,
                },
                edit:   {
                    url:service_host+'qa/:qa_id/edit',
                    method:'GET',
                    params: apiConfig.authParams,
                },
                save:  {
                    method:'POST',
                    params: apiConfig.authParams,
                },
                query: {
                    url:service_host+'qa/list',
                    method: "GET",
                    params: apiConfig.authParams,
                    isArray: false
                },
                update: {
                    method:'POST',
                    params: apiConfig.authParams,
                },
                remove: {
                    method:'POST',
                    params: apiConfig.authParams,
                }
            });
        }]);