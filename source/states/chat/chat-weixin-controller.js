/**
 * Created by yangjiajun on 15/9/28.
 */
import 'angular-material'

import './chat-value'
import SendOtherMessageHtml from './bottom_sheet/send-other-message-template.html!text'
import SendOtherMessageCtrl from './bottom_sheet/send-other-message-controller';

import 'source/filter/format-message'
import $ from 'jquery'

//表情控件
import CmFace from 'source/components/face/face-directive'
//返回按钮指令
import 'source/components/btn_back/btn-back-directive'


export default angular.module('chat')
    .controller('ChatWeiXinCtrl',['$rootScope','$scope','$routeParams','$timeout','$window','chat.value','$log','$filter','wxService','socket',
        function($rootScope,$scope,$routeParams,$timeout,$window,value,$log,$filter,wxService,socketService){
            $scope.open_face_status = value.open_face_status;
            $scope.open_audio_status = value.open_audio_status;
            $scope.message = value.message;
            $scope.msg_list = value.msg_list;
            $scope.service_info = value.service_info;
            $scope.user_info = value.user_info;
            
            $scope.gotoBottom = gotoBottom;
            $scope.sendMessage = sendMessage;
            $scope.showFace = showFace;
            $scope.hideFace = hideFace;
            $scope.toggleAd = toggleAd;

            console.log($routeParams);

            $scope.$on(socketService.im.cmd_login,function(event,data){
                console.log('登陆成功');
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
                $rootScope.$apply('msg_list')
            });

            socketService.connect()
                .then(socketService.loginIM);

            /**
             * 监听表情控件的输入表情事件
             */
            $scope.$on('face_inputting',face_inputting);

            /**
             * 初始化微信分享
             */
            wxService.init({
                title:"车知了--做你身边懂车的朋友",
                desc:"用车问题专业技师一对一解答，一键提问一分钟响应",
                link:document.URL
            });

            /**
             * 监听表情输入
             * @param event
             * @param msg
             */
            function face_inputting(event,msg){
                $scope.message.content = value.message.content += msg;
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
             * 发送文字消息
             */
            function sendMessage(message,type){
                let time = new Date();
                let date = $filter('date')(time,'yyyy-MM-dd HH:mm:ss');
                let msg = {
                    "msg_id":   time.getTime(),
                    "from":     0,
                    "type":     type,
                    "content":  message,
                    "created_at":   date,
                    "updated_at":   date
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
                    $(el[0]).css('max-height',$rootScope.winheight-$rootScope.header-48-200);
                }else{
                    $(el[0]).css('max-height',$rootScope.winheight-$rootScope.header-48);
                }
            }

            function hideFace(){
                $scope.open_face_status = false;
                var el = $("#message_box");
                $(el[0]).css('max-height',$rootScope.winheight-$rootScope.header-48);
            }

            /**
             * 显示广告
             */
            function toggleAd(){
                if(angular.isUndefined($scope.openAd)){
                    $scope.openAd = true;
                }else{
                    $scope.openAd = !$scope.openAd;
                }

            }


        }]
    )