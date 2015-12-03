
export default angular.module('Upload',['ngRoute','ngResource'])
    .config(['$resourceProvider','$httpProvider', function($resourceProvider,$httpProvider) {

        $httpProvider.defaults.headers.common = {
            'Accept':'application/json, text/javascript, */*; q=0.01',
            'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
        };
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

    }])
    .service('Upload',['$rootScope','$cookies','$http','$resource','apiConfig',
        function($rootScope,$cookies,$http,$resource,apiConfig){
        var service_host = apiConfig.service_host;

        return $resource(service_host+'upload/upload-token',{},{
            get:   {
                method:'GET',
                params: apiConfig.authParams,
            }
        });
    }]);