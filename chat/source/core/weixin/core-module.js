/**
 * Created by yangjiajun on 15/9/24.
 */
import $ from 'jquery'
import 'angular-route';
import 'angular-resource'
import 'source/service/ApiConfig'
import 'source/env'
import 'source/filter/format-message'
import 'source/filter/format-date'

import ChatModule from 'source/states/chat-weixin/chat-module'

import WXModule from 'source/service/WXService'
import SocketModule from 'source/service/SocketService'
import UserModule from 'source/service/UserService'

import CoreRouter from 'source/core/weixin/core-router'
import CoreCtrl from 'source/core/weixin/core-controller'


var CoreModule = angular.module('myApp',[
    'ngRoute',
    'ngResource',

    'env','apiConfig',
    WXModule.name,SocketModule.name,UserModule.name,
    'format_msg','format_date',
    ChatModule.name,
])
    .config(CoreRouter)
    .controller('myAppCtrl',CoreCtrl);


export default CoreModule