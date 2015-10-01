/**
 * Created by yangjiajun on 15/9/24.
 */
import 'angular-route';
import 'angular-resource'
import '../service/ApiConfig'
import '../env'

import HomeModule from 'source/states/home/home-module'
import IndexModule from 'source/states/index/index-module'
import ChatModule from 'source/states/chat/chat-module'

import CoreRouter from 'source/core/core-router'

export default angular.module('myApp',[
    'ngRoute',
    'ngMaterial',
    'ngResource',

    'env',
    'apiConfig',
    'Qa',
    IndexModule.name,
    HomeModule.name,
    ChatModule.name,
])
    .config(CoreRouter)