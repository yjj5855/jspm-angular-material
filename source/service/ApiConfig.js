/**
 * Created by yangjiajun on 15/9/25.
 */


export default angular.module('apiConfig',[])
    .service('apiConfig',['$rootScope','env',function($rootScope,env){
        var base_host = env.BASE_HOST;
        var api_service_path = 'service/';
        var im_host = env.IM_HOST;
        $rootScope.client_id = env.CLIENT_ID;
        $rootScope.client_secre = env.CLIENT_SECRE;

        return {
            authParams: {
                client_id : $rootScope.client_id,
                user_secret:$rootScope.user_secret
            },
            client_id : $rootScope.client_id,
            user_secret:$rootScope.user_secret,
            client_secre:$rootScope.client_secre,

            base_host:base_host,
            mobile_host:base_host+'mobile/',
            service_host:base_host+'service/',
            chat_host:base_host+'chat/',
            im_host:im_host,

        }
    }]);