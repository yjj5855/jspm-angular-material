/**
 * Created by yangjiajun on 15/11/5.
 */

import $ from 'jquery'


function LoginCtrl($scope,$timeout,$interval,$location,$cookies){

    $scope.loginInfo = {
        phone:'',
        code :''
    }
    $scope.auth_code_text = '获取验证码';

    $scope.getAuthCode = getAuthCode;
    $scope.webLogin = webLogin;

    function getAuthCode(){
        $('#getAuthCode_btn').attr('disabled','disabled');
        $timeout(()=>{
            $('#getAuthCode_btn').removeAttr('disabled');
            $scope.auth_code_text = '获取验证码';
        },60e3)
        let i = 59;
        $interval(()=>{
            $scope.auth_code_text = i+'秒后可再次获取';
            i--;
        },1e3,59)

    }

    function webLogin(){

        $cookies.putObject('user_login_cookie','123456',{expires: 0,'path':'/'});
        $location.path('/');
    }
}

LoginCtrl.$inject = ['$scope','$timeout','$interval','$location','$cookies'];


export default angular.module('login')
    .controller('LoginCtrl',LoginCtrl)
