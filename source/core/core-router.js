/**
 * Created by yangjiajun on 15/9/24.
 */
import ChatRoute from 'source/states/chat/chat-route'

function CoreRouter($routeProvider,$locationProvider) {

    $routeProvider
        .when('/chat',ChatRoute)
        .otherwise({redirectTo: '/chat'});
    $locationProvider.html5Mode(true);
}

CoreRouter.$inject = ['$routeProvider','$locationProvider'];

export default CoreRouter;