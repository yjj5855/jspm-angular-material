/**
 * Created by yangjiajun on 15/9/24.
 */
import ChatRoute from 'source/states/chat-weixin/chat-route'

function CoreRouter($routeProvider,$locationProvider) {

    $routeProvider
        .when('/',ChatRoute)
        .otherwise({redirectTo: '/'});
    //$locationProvider.html5Mode(true);
}

CoreRouter.$inject = ['$routeProvider','$locationProvider'];

export default CoreRouter;