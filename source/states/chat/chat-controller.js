/**
 * Created by yangjiajun on 15/9/28.
 */

import './chat-value'
import SendOtherMessageHtml from './bottom_sheet/send-other-message-template.html!text'
import SendOtherMessageCtrl from './bottom_sheet/send-other-message-controller';

//表情控件
import CmFace from 'source/components/face/face-directive'

//返回按钮指令
import 'source/components/btn_back/btn-back-directive'

export default angular.module('chat')
    .controller('ChatCtrl',['$rootScope','$scope','$timeout','$window','chat.value','$mdSidenav','$mdUtil','$mdBottomSheet','$log',
        function($rootScope,$scope,$timeout,$window,value,$mdSidenav,$mdUtil,$mdBottomSheet,$log){
            $scope.open_face_status = value.open_face_status;
            $scope.message = value.message;
            $scope.msg_list = value.msg_list;
            $scope.service_info = value.service_info;
            $scope.user_info = value.user_info;
            $scope.toggleRight = buildToggler('right');
            $scope.showGridBottomSheet = showGridBottomSheet;


            $scope.$on('face_inputting',face_inputting);
            bindMessageInput();
            /////////////////////////////////////////////
            /**
             * Build handler to open/close a SideNav; when animation finishes
             * report completion in console
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
             * 消息框 获取焦点后 表情框消失 给手机输入框留空间
             */
            function bindMessageInput(){
                angular.element(document.getElementById('message_input')).on('focus',function(){
                    $scope.open_face_status = value.open_face_status = false;
                    $rootScope.$apply('open_face_status');
                })
            }

            /**
             * 监听表情输入
             * @param event
             * @param msg
             */
            function face_inputting(event,msg){
                $scope.message.content = value.message.content += msg;
            }
        }]
    )
    .controller('ChatRightCtrl',['$rootScope','$scope','$timeout','$window','chat.value',
        function($rootScope,$scope,$timeout,$window,value){

        }]
    )