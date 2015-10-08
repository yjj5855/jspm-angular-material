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
import ThemeModule from 'source/states/theme/theme-module'

import CoreRouter from 'source/core/core-router'
import CoreTheme  from 'source/core/core-theme'


var CoreModule = angular.module('myApp',[
    'ngRoute',
    'ngMaterial',
    'ngResource',

    'env',
    'apiConfig',
    'Qa',
    IndexModule.name,
    HomeModule.name,
    ChatModule.name,
    ThemeModule.name,
])
    .config(CoreRouter)
    .config(CoreTheme);

export default CoreModule