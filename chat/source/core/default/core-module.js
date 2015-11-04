/**
 * Created by yangjiajun on 15/9/24.
 */
import $ from 'jquery'
import 'angular-route';
import 'angular-resource'
import 'angular-material'
import 'source/service/ApiConfig'
import 'source/env'
import 'source/filter/format-message'
import 'source/filter/format-date'

import ChatModule from 'source/states/chat/chat-module'
import WXModule from 'source/service/WXService'
import SocketModule from 'source/service/SocketService'

import CoreRouter from 'source/core/default/core-router'
import CoreCtrl from 'source/core/default/core-controller'


var CoreModule = angular.module('myApp',[
    'ngRoute',
    'ngResource',
    'ngMaterial',

    'env','apiConfig',
    WXModule.name,SocketModule.name,
    'format_msg','format_date',
    ChatModule.name,
])
    .config(CoreRouter)
    .controller('myAppCtrl',CoreCtrl);


export default CoreModule