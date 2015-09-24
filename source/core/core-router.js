/**
 * Created by yangjiajun on 15/9/24.
 */
import HomeRouter from 'source/states/home/home-route'

function CoreRouter($routeProvider) {
    $routeProvider
        .when('/home',HomeRouter)

        .otherwise({redirectTo: '/'});
}

CoreRouter.$inject = ['$routeProvider'];

export default CoreRouter;