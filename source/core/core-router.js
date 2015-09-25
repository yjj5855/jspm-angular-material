/**
 * Created by yangjiajun on 15/9/24.
 */
import HomeRoute from 'source/states/home/home-route'

function CoreRouter($routeProvider) {
    $routeProvider
        .when('/home',HomeRoute)

        .otherwise({redirectTo: '/'});
}

CoreRouter.$inject = ['$routeProvider'];

export default CoreRouter;