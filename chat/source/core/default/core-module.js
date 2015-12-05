/**
 * Created by yangjiajun on 15/9/24.
 */
import $ from 'jquery'
import 'angular-route';
import 'angular-resource'
import 'angular-material'
import 'angular-cookies'
import 'angular-local-storage'
import 'source/service/ApiConfig'
import 'source/env'
import 'source/filter/format-message'
import 'source/filter/format-date'
import 'source/filter/format-user-avatar'

import 'source/components/loading/http-loading'

import ChatModule from 'source/states/chat/chat-module'
import PreviewModule from 'source/states/preview/preview-module'

import SocketModule from 'source/service/SocketService'
import UserModule from 'source/service/UserService'
import UploadModule from 'source/service/UploadService'

import CoreRouter from 'source/core/default/core-router'
import CoreCtrl from 'source/core/default/core-controller'


var CoreModule = angular.module('myApp',[
    'ngRoute',
    'ngResource',
    'ngMaterial',
    'ngCookies',
    'LocalStorageModule','angularQFileUpload','loading',
    'env','apiConfig',
    SocketModule.name,UserModule.name,UploadModule.name,
    'format_msg','format_date','format_avatar',
    ChatModule.name,PreviewModule.name,
])
    .config(CoreRouter)
    .controller('myAppCtrl',CoreCtrl);


export default CoreModule