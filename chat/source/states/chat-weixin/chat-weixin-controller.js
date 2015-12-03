/**
 * Created by yangjiajun on 15/9/28.
 */

import './chat-value'
import 'source/filter/format-message'
import $ from 'jquery'

//表情控件
import CmFace from 'source/components/face/face-directive'
//返回按钮指令
import 'source/components/btn_back/btn-back-directive'


export default angular.module('chat')
    .controller('ChatWeiXinCtrl',['$rootScope','$scope','$routeParams','$timeout','$window','chat.value','$log','$filter','wxService','socket','User','$location','apiConfig',
        function($rootScope,$scope,$routeParams,$timeout,$window,value,$log,$filter,wxService,socketService,UserService,$location,apiConfig){
            var from = getUrlVar('state');
            var share_link = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+apiConfig.app_id+'&redirect_uri=http%3A%2F%2F'+apiConfig.app_host+'%2Fchat%2Fdist%2Fweixin%2Findex.html&response_type=code&scope=snsapi_userinfo&state='+from+'#wechat_redirect';

            $scope.open_face_status = value.open_face_status;
            $scope.open_audio_status = value.open_audio_status;
            $scope.message = value.message;
            $scope.msg_list = value.msg_list;
            $scope.service_info = value.service_info;
            $scope.user_info = value.user_info;

            $scope.page = value.page;
            $scope.timestamp = value.timestamp = new Date().getTime();
            
            $scope.gotoBottom = gotoBottom;
            $scope.sendMessage = sendMessage;
            $scope.showFace = showFace;
            $scope.hideFace = hideFace;
            $scope.toggleAd = toggleAd;
            $scope.loadHistoryMsg = loadHistoryMsg;
            $scope.is_loading_history = true;
            $scope.preview = preview;
            $scope.keypressInChatInput = keypressInChatInput;

            $scope.code = getUrlVar('code');



            if($scope.code){

                let code = $scope.code;

                //ajax访问后台 获取用户信息
                UserService.getUserInfoByCode({code:code,state:from}).$promise.then(
                    function(data){
                        if(data && data.code==200){
                            $scope.userInfo = data.data;
                            /**
                             * 初始化微信分享  需要获得微信用户信息
                             */
                            share_link = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+apiConfig.app_id+'&redirect_uri=http%3A%2F%2F'+apiConfig.app_host+'%2Fchat%2Fdist%2Fweixin%2Findex.html&response_type=code&scope=snsapi_userinfo&state='+$scope.userInfo.user_id+'#wechat_redirect';
                            wxService.init({
                                title:"车知了--你身边懂车的朋友",
                                desc:"用车问题专业技师一对一解答，一键提问一分钟响应",
                                link:document.URL,
                                shareLink:share_link
                            },$scope.userInfo.wx_userInfo);

                            //获取用户信息后 登陆IM
                            socketService.connect().then(
                                function(){
                                    $rootScope.loginInfo = {
                                        'uin': $scope.userInfo.user_id,
                                        'nick':$scope.userInfo.nickname,
                                        'pic': $scope.userInfo.user_avatar,
                                        'location':'',
                                        'address':'',
                                        'token':$scope.userInfo.user_token,
                                        'client_type': 3,
                                        'client_id':'',
                                        'client_ver':'1.0.0',
                                        'channel': $scope.userInfo.channel_sign,//渠道
                                        'latitude':angular.isDefined(wxService.latitude)?wxService.latitude:''
                                    }
                                    socketService.loginIM($rootScope.loginInfo);
                                    data.data.user_avatar !=''?value.user_info.avatar = data.data.user_avatar:'';
                                    value.user_info.name = $scope.userInfo.nickname;
                                    $rootScope.$apply('user_info');
                                },
                                function(){
                                    $rootScope.isLinkedToSocket = false;
                                    alert('连接断开');
                                    console.log('连接断开');
                                }
                            )
                        }else{
                            window.location.href = share_link;
                        }

                    }
                );


            }else if(angular.isUndefined($scope.code)){
                console.log('授权失败!');
                window.location.href = share_link;

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
                //
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
                //            'latitude':angular.isDefined(wxService.latitude)?wxService.latitude:''
                //        }
                //        socketService.loginIM($rootScope.loginInfo);
                //        value.user_info.avatar = $scope.userInfo.user_avatar;
                //        value.user_info.name = $scope.userInfo.nickname;
                //        $rootScope.$apply('user_info');
                //    },
                //    function(){
                //        $rootScope.isLinkedToSocket = false;
                //        alert('连接断开');
                //        console.log('连接断开');
                //    }
                //)
            }

            $scope.$on(socketService.im.cmd_login,function(event,data){
                console.log('登陆成功',$rootScope.loginInfo);
                //发送用户进框事件
                //$timeout(()=>{
                //    socketService.inChatWindow();
                //},1000);
                let msg_id = new Date().getTime();
                value.msg_list.push({
                    "msg_id":   msg_id,
                    "from":     1,
                    "type":     1,
                    "content":  '您好,想了解汽车哪方面内容呢?',
                    "created_at":   msg_id,
                    "updated_at":   msg_id
                });
                //获取用户聊天记录
                loadHistoryMsg();
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
             * 监听表情控件的输入表情事件
             */
            $scope.$on('face_inputting',face_inputting);


            //绑定回车按键
            function keypressInChatInput($event){
                if($scope.message.content.trim() != '' && $event.keyCode==13 && $event.altKey == false && $event.ctrlKey==false && $event.shiftKey==false ){
                    $event.preventDefault();
                    $event.stopPropagation();
                    $scope.sendMessage($scope.message.content,1);
                    return;
                }
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
             * 微信中预览图片
             * @param imgUrl
             */
            function preview(imgUrl,msg_type){
                if(msg_type == 3){
                    wxService.previewImage(imgUrl);
                }
            }

            /**
             * 监听表情输入
             * @param event
             * @param msg
             */
            function face_inputting(event,msg){
                value.message.content += msg.face_name;
            }

            /**
             * 滚到底部
             */
            function gotoBottom(){
                $timeout(()=>{
                    document.getElementById("message_box").scrollTop = document.getElementById("message_box").scrollHeight;
                },100)
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
                hideFace();
                socketService.sendMsg(msg);
            }

            /**
             * 显示表情
             */
            function showFace(){
                $scope.open_face_status = !$scope.open_face_status;
                var el = $("#message_box");
                if($scope.open_face_status){
                    $(el[0]).css('height',$rootScope.winheight-$rootScope.header-$rootScope.bottom-200);
                    gotoBottom();
                }else{
                    $(el[0]).css('height',$rootScope.winheight-$rootScope.header-$rootScope.bottom);
                }
            }

            function hideFace(){
                $scope.open_face_status = false;
                var el = $("#message_box");
                $(el[0]).css('height',$rootScope.winheight-$rootScope.header-$rootScope.bottom);
            }

            /**
             * 显示广告
             */
            function toggleAd(){
                if($scope.userInfo.channel_sign == 'czl_weixin'){
                    if(angular.isUndefined($scope.openAd)){
                        $scope.openAd = true;
                    }else{
                        $scope.openAd = !$scope.openAd;
                    }
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
                let value = getUrlVars()[name]
                if((name=='code'||name=='state') && angular.isString(value)){
                    value = value.replace('#','');
                    value = value.replace('/','');
                }
                return value;
            }


        }]
    )