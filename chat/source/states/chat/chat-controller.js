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
            $scope.open_audio_status = value.open_audio_status;
            $scope.message = value.message;
            $scope.msg_list = value.msg_list;
            $scope.service_info = value.service_info;
            $scope.user_info = value.user_info;

            $scope.page = value.page;
            $scope.timestamp = value.timestamp = new Date().getTime();

            $scope.toggleRight = buildToggler('right');
            $scope.showGridBottomSheet = showGridBottomSheet;
            $scope.gotoBottom = gotoBottom;
            $scope.sendMessage = sendMessage;
            $scope.showFace = showFace;
            $scope.hideFace = hideFace;
            $scope.toggleAd = toggleAd;
            $scope.is_loading_history = false;

            $scope.code = getUrlVar('code');


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
             * 显示底部框
             * @param $event
             * @param type
             */
            function showGridBottomSheet($event,type){
                $mdBottomSheet.show({
                    template: SendOtherMessageHtml,
                    controller: 'SendOtherMessageCtrl',
                    targetEvent: $event
                }).then(function(clickedItem) {

                });
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
                //socketService.sendMsg(msg);
            }

            /**
             * 显示表情
             */
            function showFace(){
                $scope.open_face_status = !$scope.open_face_status;
            }

            function hideFace(){
                $scope.open_face_status = false;
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


    }])