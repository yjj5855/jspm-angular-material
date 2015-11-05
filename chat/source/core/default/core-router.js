/**
 * Created by yangjiajun on 15/9/24.
 */
import ChatRoute from 'source/states/chat/chat-route'
import LoginRoute from 'source/states/login/login-route'

function CoreRouter($routeProvider,$locationProvider) {

    $routeProvider
        .when('/',ChatRoute)
        .when('/login',LoginRoute)
        .otherwise({redirectTo: '/'});
    //$locationProvider.html5Mode(true);
}

CoreRouter.$inject = ['$routeProvider','$locationProvider'];

export default CoreRouter;