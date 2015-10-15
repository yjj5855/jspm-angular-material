
import io from 'source/lib/socket-client/socket.io-1.2.0'



export default angular.module('socket',[])
    .service('socket',['$rootScope','apiConfig',function($rootScope,apiConfig){

    if(angular.isUndefined($rootScope.isLinkedToSocket)){
        $rootScope.isLinkedToSocket = false;
    }

    if(!$rootScope.isLinkedToSocket) {
        var socket = {};
    }
    
    var im = {
        cmd_login :  'CMD_USER_LOGIN',//登录

        cmd_logout:  'CMD_USER_LOGOUT',//登出

        cmd_chat_msg:'CMD_USER_CHAT_MSG',//聊天消息

        cmd_chat_msg_ask: 'CMD_USER_CHAT_MSG_ACK',//聊天消息收到

        cmd_user_in_chat:  'CMD_USER_ENTER_CHAT_WINDOW',//用户进入聊天页面

        cmd_create_session_notify: 'CMD_USER_CREATE_SESSION_NOTIFY',//创建会话

        cmd_keep_live:  'CMD_USER_KEEPLIVE',//心跳包

        cmd_kick_user:  'CMD_USER_KICK_USER_NOTIFY',//相同用户踢掉通知

    };
    return {
        im : im,
        on: function(eventName, callback) {
            socket.on(eventName, function() {

                var args = arguments;
                $rootScope.$apply(function(){
                    callback.apply(socket, args);
                });
            });
        },

        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    if(callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        },

        close: function(){
            socket.close();
        },

        connect: function(){
            var self = this;
            return new Promise(function(resolve,reject){

                if($rootScope.isLinkedToSocket == true){
                    resolve();
                }
                console.log('还没连上socket');
                socket = io(apiConfig.im_host);

                self.initListen();

                //socket连接成功
                socket.on('connect',function(){
                    console.info("socket连接成功");
                    $rootScope.isLinkedToSocket = true;
                    $rootScope.isLoginIM = false;
                    resolve();
                });

                //socket连接断开，直接关闭socket
                socket.on('disconnect',function(){
                    $rootScope.isLinkedToSocket = false;
                    $rootScope.isLoginIM = false;
                    $rootScope.$apply();
                    this.close();
                    console.error("socket连接断开");
                    reject();
                });

            });
        },

        //登陆
        loginIM: function(userInfo){
            var userInfo = { 
                'uin': 213456,     
                'nick':'frank',
                'pic': 'http://pic.chezhi.com/1.jpg',
                'location':'上海',
                'address':'上海市浦东新区',
                'token':'afsadfbckkckckck',
                'client_type': 1,
                'client_id':'asfjsdkfjsdklflsd',
                'client_ver':'3.0.1',
                'channel': 'czl_qq',
                'latitude':'fsddsfsd',
            };
            setTimeout(()=>{
                console.log('正在登陆');
                socket.emit(im.cmd_login,userInfo);
            },1000)
        },
        //登出
        logoutIM: function(){
            socket.emit(im.cmd_logout,{});
        },
        //发消息
        sendMsg : function(msg){
            socket.emit(im.cmd_chat_msg,msg);
        },
        //初始化 监听
        initListen:function(){
            //登陆
            socket.on(im.cmd_login,(data)=>{
                $rootScope.$broadcast(im.cmd_login,data)
            })

            //登出
            socket.on(im.cmd_logout,(data)=>{
                $rootScope.$broadcast(im.cmd_logout,data)
            })

            //接收到消息
            socket.on(im.cmd_chat_msg,(msg)=>{
                $rootScope.$broadcast(im.cmd_chat_msg,msg);
            });
            //发送消息的反馈
            socket.on(im.cmd_chat_msg_ask,(ask)=>{
                $rootScope.$broadcast(im.cmd_chat_msg_ask,ask);
            });
            //被踢原因
            socket.on(im.cmd_kick_user,(season)=>{
                $rootScope.$broadcast(im.cmd_kick_user,season);
            });
        }
    };
}]);
