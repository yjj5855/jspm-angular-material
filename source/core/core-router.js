/**
 * Created by yangjiajun on 15/9/24.
 */
import HomeRoute from 'source/states/home/home-route'
import IndexRoute from 'source/states/index/index-route'
import ChatRoute from 'source/states/chat/chat-route'

function CoreRouter($routeProvider) {
    $routeProvider
        .when('/'    ,IndexRoute)
        .when('/home',HomeRoute)
        .when('/chat',ChatRoute)
        .otherwise({redirectTo: '/'});
}

CoreRouter.$inject = ['$routeProvider'];

export default CoreRouter;