/**
 * Created by yangjiajun on 15/9/28.
 */

import './chat-value'
import SendOtherMessageHtml from './bottom_sheet/send-other-message-template.html!text'
import SendOtherMessageCtrl from './bottom_sheet/send-other-message-controller';

import 'source/filter/format-message'

//表情控件
import CmFace from 'source/components/face/face-directive'
//返回按钮指令
import 'source/components/btn_back/btn-back-directive'

export default angular.module('chat')
    .controller('ChatCtrl',['$rootScope','$scope','$timeout','$window','chat.value','$mdSidenav','$mdUtil','$mdBottomSheet','$log','$filter',
        function($rootScope,$scope,$timeout,$window,value,$mdSidenav,$mdUtil,$mdBottomSheet,$log,$filter){
            $scope.open_face_status = value.open_face_status;
            $scope.message = value.message;
            $scope.msg_list = value.msg_list;
            $scope.service_info = value.service_info;
            $scope.user_info = value.user_info;
            $scope.toggleRight = buildToggler('right');
            $scope.showGridBottomSheet = showGridBottomSheet;
            $scope.gotoBottom = gotoBottom;
            $scope.sendMessage = sendMessage;



            /**
             * 监听表情控件的输入表情事件
             */
            $scope.$on('face_inputting',face_inputting);

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
             * 显示底部框
             * @param $event
             * @param type
             */
            function showGridBottomSheet($event,type){
                if(type=='face'){
                    $mdBottomSheet.show({
                        template: SendFaceHtml,
                        controller: 'SendFaceCtrl',
                        targetEvent: $event
                    }).then(function(clickedItem) {
                        alert(clickedItem.name);
                    });
                }else{
                    $mdBottomSheet.show({
                        template: SendOtherMessageHtml,
                        controller: 'SendOtherMessageCtrl',
                        targetEvent: $event
                    }).then(function(clickedItem) {
                        //showGridBottomSheet('','face');
                        $scope.open_face_status = value.open_face_status = true;
                    });
                }
            }

            /**
             * 发送文字消息
             */
            function sendMessage(){
                let date = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
                value.msg_list.push({
                    "id":17076,
                    "session_id":"434-1442899152457",
                    "msg_id":"1442899151741",
                    "user_avatar":"",
                    "admin_id":41,
                    "admin_avatar":"",
                    "from":0,
                    "type":1,
                    "content":value.message.content,
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
                value.message.content = '';
                $scope.gotoBottom();
            }
        }]
    )
    .controller('ChatRightCtrl',['$rootScope','$scope','$timeout','$window','chat.value',
        function($rootScope,$scope,$timeout,$window,value){

        }]
    )