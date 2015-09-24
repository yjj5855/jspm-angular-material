/**
 * Created by yangjiajun on 15/9/24.
 */
import 'angular-route';
import 'angular-material';
import 'angular-material/angular-material.css!';
import 'mdi/css/materialdesignicons.css!'
import '/css/app.css!'


import HomeModule from 'source/states/home/home-module'

import CoreRouter from 'source/core/core-router'

export default angular.module('myApp',[
    'ngRoute',
    'ngMaterial',
    HomeModule.name
])
    .config(CoreRouter)