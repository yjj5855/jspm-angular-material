/**
 * Created by yangjiajun on 15/9/24.
 */
import ChatRoute from 'source/states/chat/chat-route'

function CoreRouter($routeProvider) {
    $routeProvider
        .when('/chat',ChatRoute)
        .otherwise({redirectTo: '/chat'});
}

CoreRouter.$inject = ['$routeProvider'];

export default CoreRouter;