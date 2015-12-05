/**
 * Created by yangjiajun on 15/9/24.
 */
import ChatRoute from 'source/states/chat/chat-route';
import PreviewRoute from 'source/states/preview/preview-route';

function CoreRouter($routeProvider,$locationProvider) {

    $routeProvider
        .when('/',ChatRoute)
        .when('/preview',PreviewRoute)
        .otherwise({redirectTo: '/'});
    //$locationProvider.html5Mode(true);
}

CoreRouter.$inject = ['$routeProvider','$locationProvider'];

export default CoreRouter;