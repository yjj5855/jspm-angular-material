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

        var app_id = env.APP_ID;
        var app_host = env.APP_HOST;

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
            wx_host:base_host+'wechat/',
            im_host:im_host,

            app_id:app_id,
            app_host:app_host,

            qiniu_qa_host:'http://7xkkt4.com2.z0.glb.qiniucdn.com/',
            qiniu_im_host:'http://7xkz66.com2.z0.glb.qiniucdn.com/',
            qiniu_wiki_host:'http://7xkz65.com2.z0.glb.qiniucdn.com/',
            qiniu_avatar_host:'http://7xl1vx.com2.z0.glb.qiniucdn.com/',
        }
    }]);