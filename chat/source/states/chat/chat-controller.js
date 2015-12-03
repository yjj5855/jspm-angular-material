/**
 * Created by yangjiajun on 15/9/28.
 */

import $ from 'jquery'
import './chat-value'
import SendOtherMessageHtml from './bottom_sheet/send-other-message-template.html!text'
import SendOtherMessageCtrl from './bottom_sheet/send-other-message-controller';
import ImgDialogCtrl from './dialog/img-dialog-controller';
import ImgDialogHtml from './dialog/img-dialog-template.html!text';
import ErrorDialogCtrl from './dialog/error-dialog-controller';
import ErrorDialogHtml from './dialog/error-dialog-template.html!text'

import 'source/filter/format-message'

//表情控件
import CmFace from 'source/components/face/face-directive'
import 'source/components/btn_back/btn-back-directive'

export default angular.module('chat')
    .controller('SendOtherMessageCtrl',SendOtherMessageCtrl)
    .controller('ChatCtrl',['$rootScope','$scope','$timeout','$window','chat.value','$mdSidenav','$mdUtil','$mdBottomSheet','$log','$filter','User','socket','$mdToast','$mdDialog',
        function($rootScope,$scope,$timeout,$window,value,$mdSidenav,$mdUtil,$mdBottomSheet,$log,$filter,UserService,socketService,$mdToast,$mdDialog){

            $rootScope.pageClass = 'page';
            $scope.showTopToolBar = true;
            $scope.is_loading_history = true;
            $scope.error_msg = '服务器错误!';
            $scope.open_face_status = value.open_face_status;
            $scope.open_audio_status = value.open_audio_status;
            $scope.message = value.message;
            $scope.msg_list = value.msg_list;
            $scope.service_info = value.service_info;
            $scope.user_info = value.user_info;
            $scope.page = value.page;
            $scope.timestamp = value.timestamp = new Date().getTime();
            $scope.toggleRight = buildToggler('right');
            $scope.toggleFace = toggleFace;
            $scope.showGridBottomSheet = showGridBottomSheet;
            $scope.gotoBottom = gotoBottom;
            $scope.sendMessage = sendMessage;
            $scope.keypressInChatInput = keypressInChatInput;
            $scope.loadHistoryMsg = loadHistoryMsg;
            $scope.preview = preview;
            /**
             * 监听表情控件的输入表情事件
             */
            $scope.$on('face_inputting',face_inputting);
            /**
             * 监听语音输入(没用)
             */
            $scope.$on('audio_inputting',audio_inputting);
            $scope.$on('img_upload_success',handleImgUploadSuccess);
            /**
             * 登陆成功事件
             */
            $scope.$on(socketService.im.cmd_login,function(event,data){
                console.log('登陆成功',$rootScope.loginInfo);
                let msg_id = new Date().getTime();
                value.msg_list.push({
                    "msg_id":   msg_id,
                    "from":     1,
                    "type":     1,
                    "content":  '您好,想了解汽车哪方面内容呢?',
                    "created_at":   msg_id,
                    "updated_at":   msg_id
                });
                loadHistoryMsg();
                $rootScope.autoSetMessageBoxHeight();
            });
            /**
             * 收到消息事件
             */
            $scope.$on(socketService.im.cmd_chat_msg,function(event,msg){
                value.msg_list.push({
                    "msg_id":   msg.msg_id,
                    "from":     1,
                    "type":     parseInt(msg.type),
                    "content":  msg.content,
                    "created_at":   msg.time,
                    "updated_at":   msg.time
                });
                $rootScope.$apply('msg_list');
                gotoBottom();
            });
            /**
             * 消息发送反馈事件
             */
            $scope.$on(socketService.im.cmd_chat_msg_ask,function(event,msg){
                console.log(msg);
                for(let i=value.msg_list.length-1;i>=0;i--){
                    if(msg.msg_id == value.msg_list[i].msg_id){
                        $rootScope.$apply(function(){
                            value.msg_list[i].push_status = true;
                        })
                        break;
                    }
                }
            });
            /**
             * 接收欢迎语
             */
            $scope.$on(socketService.im.cmd_user_in_chat,function(event,data){
                if(data.working == 0){
                    let msg_id = new Date().getTime();
                    value.msg_list.push({
                        "msg_id":   msg_id,
                        "from":     1,
                        "type":     1,
                        "content":  data.welcome,
                        "created_at":   data.time,
                        "updated_at":   data.time
                    });
                }
            });

            init();
            ////////////////////////////////////////
            function init(){
                $scope.system_version = getUrlVar('system_version');
                let params = {
                    uid         :   getUrlVar('uid'),
                    channel     :   getUrlVar('channel'),
                    device      :   getUrlVar('device'),
                    timestamp   :   getUrlVar('timestamp'),
                    city        :   getUrlVar('city'),
                    car_type    :   getUrlVar('car_type'),
                    system_version: getUrlVar('system_version'),
                    nickname    :   getUrlVar('nickname'),
                    sign        :   getUrlVar('sign'),
                    return_url  :   getUrlVar('return_url')
                }

                //获取参数
                if(params.uid && params.channel && params.sign){
                    //ajax访问后台 获取用户信息
                    UserService.getUserInfoByThirdApp(params).$promise.then(
                        function(data){
                            if(data && data.code==200){
                                //{
                                //    account_type: 5
                                //    address: ""
                                //    alpha_id: "Jsj"
                                //    answer_number: 0
                                //    appoint_number: 0
                                //    car_number: ""
                                //    car_type_name: ""
                                //    channel_sign: ""
                                //    gender: 0
                                //    gender_str: "保密"
                                //    nickname: "13761783877"
                                //    realname: ""
                                //    telephone: ""
                                //    user_allow_login: true
                                //    user_avatar: ""
                                //    user_id: 35757
                                //    user_token: "k5oXXmClkQylC9ejpZxYsA=="
                                //}
                                $scope.userInfo = data.data;

                                //获取用户信息后 登陆IM
                                socketService.connect().then(
                                    function(){
                                        $rootScope.loginInfo = {
                                            'uin': $scope.userInfo.user_id,
                                            'nick':$scope.userInfo.nickname,
                                            'pic': $scope.userInfo.user_avatar,
                                            'location':params.city?decodeURI(params.city):'',
                                            'city':params.city?decodeURI(params.city):'',
                                            'area':params.city?decodeURI(params.city):'',
                                            'address':$scope.userInfo.address,
                                            'token':$scope.userInfo.user_token,
                                            'client_type': 3,
                                            'client_id':'',
                                            'client_ver':'1.0.0',
                                            'channel': $scope.userInfo.channel_sign,//渠道
                                            'latitude':''
                                        }
                                        socketService.loginIM($rootScope.loginInfo);
                                        value.user_info.avatar = $filter('format_avatar')(data.data.user_avatar,$scope.userInfo.channel_sign);
                                        value.user_info.name = $scope.userInfo.nickname;
                                        $rootScope.channel_sign = $scope.userInfo.channel_sign
                                        $rootScope.$apply('user_info');


                                        //车与我 判断显示+号图标
                                        if($scope.userInfo.channel_sign == 'czl_cyw'
                                            && $rootScope.isAndroid && $rootScope.sys_version < 4.4){
                                            $scope.showMoreBtn = false;
                                        }else if($scope.userInfo.channel_sign == 'czl_lechebang'){
                                            $scope.showTopToolBar = true;
                                        }
                                    },
                                    function(){
                                        $rootScope.isLinkedToSocket = false;
                                        errorDialog('连接断开!');
                                        console.log('连接断开');
                                    }
                                )
                            }else{
                                errorDialog('服务器错误!');
                            }

                        }
                    );


                }else{
                    console.log('授权失败!');
                    errorDialog('服务器错误!');
                    //获取用户信息后 登陆IM
                    //socketService.connect().then(
                    //    function(){
                    //        $scope.userInfo = {
                    //            address: "",
                    //            alpha_id: "Gsj",
                    //            answer_number: 0,
                    //            appoint_number: 0,
                    //            car_number: "",
                    //            car_type_name: "",
                    //            gender: 1,
                    //            gender_str: "男",
                    //            nickname: "杨佳军",
                    //            realname: "",
                    //            telephone: "",
                    //            channel_sign:'czl_weixin',
                    //            user_allow_login: true,
                    //            user_avatar: "http://wx.qlogo.cn/mmopen/wJibWkqN1bUO2ozCTUD2e0k9AIsot7OdRLPt9UbRyaFa4I6cvaqXWyUrczoZn5gkOSngAJKWj8JAicRibZV6SVr9xjYPLqZ7qUZ/0",
                    //            user_id: 35754,
                    //            user_token: "9vEqDHX9wZo/Gz4Gpc2lmw==",
                    //        }
                    //        $rootScope.loginInfo = {
                    //            'uin': $scope.userInfo.user_id,
                    //            'nick':$scope.userInfo.nickname,
                    //            'pic': $scope.userInfo.user_avatar,
                    //            'location':'',
                    //            'address':'',
                    //            'token':$scope.userInfo.user_token,
                    //            'client_type': 3,
                    //            'client_id':'',
                    //            'client_ver':'1.0.0',
                    //            'channel': $scope.userInfo.channel_sign,//渠道
                    //            'latitude':''
                    //        };
                    //        socketService.loginIM($rootScope.loginInfo);
                    //        $rootScope.$apply(function(){
                    //            value.user_info.avatar = $scope.userInfo.user_avatar;
                    //            value.user_info.name = $scope.userInfo.nickname;
                    //        });
                    //    },
                    //    function(){
                    //        $rootScope.isLinkedToSocket = false;
                    //        alert('连接断开');
                    //        console.log('连接断开');
                    //    }
                    //)
                }
            }

            function toggleFace(status){
                if(angular.isUndefined(status)){
                    $scope.open_face_status = !$scope.open_face_status;
                }else{
                    $scope.open_face_status = status;
                }
                console.log($scope.open_face_status);
                var el = $("#message_box");
                if($scope.open_face_status){
                    $(el[0]).css('height',$rootScope.winheight-$rootScope.header-$rootScope.topToolbar-$rootScope.bottom-200+'px');
                }else{
                    $(el[0]).css('height',$rootScope.winheight-$rootScope.header-$rootScope.topToolbar-$rootScope.bottom+'px');
                }
            }

            //绑定回车按键
            function keypressInChatInput($event){
                if($scope.message.content.trim()!=''&&$event.keyCode==13 && $event.altKey == false && $event.ctrlKey==false && $event.shiftKey==false ){
                    $event.preventDefault();
                    $event.stopPropagation();
                    $scope.sendMessage($scope.message.content,1);
                    return;
                }
            }
            /**
             * 根据md-component-id的值来显示或者隐藏侧栏
             */
            function buildToggler(navID) {
                var debounceFn =  $mdUtil.debounce(function(){
                    $mdSidenav(navID)
                        .toggle()
                        .then(function () {
                            $log.debug("toggle " + navID + " is done");
                        });
                },200);
                return debounceFn;
            }


            /**
             * 监听表情输入
             * @param event
             * @param msg
             */
            function face_inputting(event,msg){
                value.message.content += msg.face_name;
            }

            function audio_inputting(event,audio_url){
                $scope.sendMessage(audio_url,2);
                $rootScope.$apply($scope.msg_list);
            }

            function handleImgUploadSuccess(event,data){
                if(data && data.img_url){
                    $scope.sendMessage(data.img_url,3);
                }
            }
            /**
             * 滚到底部
             */
            function gotoBottom(){
                setTimeout(()=>{
                    document.getElementById("message_box").scrollTop = document.getElementById("message_box").scrollHeight;
                },100)
            }

            /**
             * 显示底部框
             * @param $event
             * @param type
             */
            function showGridBottomSheet($event,type){
                if(angular.isDefined($scope.system_version)){
                    let version = $scope.system_version.split('_');
                    if(angular.isUndefined(version[1]) || version[0] == 'android' && parseFloat(version[1]) < 4.4){
                        pop('安卓版本过低,不能发送图片!');
                        return;
                    }
                }
                if(angular.isDefined($scope.userInfo) && $scope.userInfo.channel_sign == 'czl_xxyh'){
                    if($rootScope.isiPhone){
                        pop('浏览器限制,不能发送图片!');
                        return;
                    }
                }
                $mdBottomSheet.show({
                    template: SendOtherMessageHtml,
                    controller: 'SendOtherMessageCtrl',
                    targetEvent: $event
                }).then(function(clickedItem) {

                });
            }

            /**
             * 发送文字消息
             */
            function sendMessage(message,type){
                if(!$rootScope.isLinkedToSocket){
                    alert('连接已断开,请重新进入页面!');
                    return;
                }

                let time = new Date();
                let date = $filter('date')(time,'yyyy-MM-dd HH:mm:ss');
                let msg = {
                    "msg_id":   time.getTime(),
                    "from":     0,
                    "type":     type,
                    "content":  message,
                    "created_at":   date,
                    "updated_at":   date,
                    "push_status"   :   false
                };
                if(type == 1){
                    value.message.content = '';
                }
                value.msg_list.push(msg);
                $scope.gotoBottom();
                value.open_face_status = false;
                socketService.sendMsg(msg);
            }

            /**
             * 只是上拉加载聊天历史
             */
            function loadHistoryMsg(){
                var prams = {
                    page : value.page,
                    timestamp : value.timestamp,
                    user_id : $scope.userInfo.user_id,
                    alpha_id : $scope.userInfo.alpha_id
                };
                $scope.is_loading_history = true;
                return new Promise(function(){
                    UserService.getHistoryMsg(prams).$promise.then(
                        function(data){
                            if(data.data.length==0){
                                $scope.page = value.page = 0;
                                return;
                            }
                            if(value.msg_list.length == 0){
                                for(let i=data.data.length-1;i>=0;i--){
                                    value.msg_list.push(data.data[i]);
                                }
                            }else{
                                for(let j=0;j<data.data.length;j++){
                                    value.msg_list.unshift(data.data[j]);
                                }
                            }
                            value.page++;
                            $scope.is_loading_history = false;
                        }
                    ).catch(function(){
                        console.log("获取聊天记录失败");
                        $scope.is_loading_history = false;
                    });
                })

            }

            /**
             * 浏览图片
             * @param url
             */
            function preview(url,type){
                if(type == 3){
                    $scope.preview_url = url;
                    $mdDialog.show({
                        clickOutsideToClose: true,
                        scope: $scope,        // use parent scope in template
                        preserveScope: true,
                        template: ImgDialogHtml,
                        controller:ImgDialogCtrl
                    });
                }
            }
            /**
             * 获取get参数
             * @returns {Array}
             */
            function getUrlVars(){
                var vars = [], hash;
                var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
                for(var i = 0; i < hashes.length; i++)
                {
                    hash = hashes[i].split('=');
                    vars.push(hash[0]);
                    vars[hash[0]] = hash[1];
                }
                return vars;
            }

            function getUrlVar(name){
                let value = getUrlVars()[name];
                if(angular.isString(value)){
                    value = value.replace('#/','');
                }
                return value;
            }

            /**
             * 底部提示框
             * @param content
             */
            function pop(content){
                $mdToast.show(
                    $mdToast.simple()
                        .content(content)
                        .position('bottom')
                        .hideDelay(2000)
                );
            }

            function errorDialog(msg){
                $scope.error_msg = msg;
                $mdDialog.show({
                    clickOutsideToClose: false,
                    scope: $scope,
                    preserveScope: true,
                    template: ErrorDialogHtml,
                    controller:ErrorDialogCtrl
                });
            }

    }])