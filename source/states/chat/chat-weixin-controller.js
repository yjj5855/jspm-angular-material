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
//语音按钮指令
import 'source/components/btn_audio/btn-audio-directive'

export default angular.module('chat')
    .controller('ChatWeiXinCtrl',['$rootScope','$scope','$timeout','$window','chat.value','$log','$filter',
        function($rootScope,$scope,$timeout,$window,value,$log,$filter){
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

            /**
             * 监听表情控件的输入表情事件
             */
            $scope.$on('face_inputting',face_inputting);
            /**
             * 监听语音输入
             */
            $scope.$on('audio_inputting',audio_inputting);

            function audio_inputting(event,audio_url){
                $scope.sendMessage(audio_url,2);
                $rootScope.$apply($scope.msg_list);
            }

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
                let date = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
                value.msg_list.push({
                    "id":17076,
                    "session_id":"434-1442899152457",
                    "msg_id":"1442899151741",
                    "user_avatar":"",
                    "admin_id":41,
                    "admin_avatar":"",
                    "from":0,
                    "type":     type,
                    "content":  message,
                    "push_status":1,
                    "read_status":1,
                    "user_nickname":"15821121693",
                    "user_id":434,
                    "admin_nickname":"\u6d4b\u8bd5",
                    "admin_name":"cjl",
                    "chat_session_id":928,
                    "created_at":   date,
                    "updated_at":   date
                });
                if(type == 1){
                    value.message.content = '';
                }
                $scope.gotoBottom();
                hideFace();
            }


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

        }]
    )