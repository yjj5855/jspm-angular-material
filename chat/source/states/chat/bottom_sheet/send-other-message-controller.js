/**
 * Created by yangjiajun on 15/9/30.
 */
import 'source/lib/qiniu/qupload'
import UploadToast from './upload-toast-template.html!text'
import UploadToastCtrl from './upload-tosat-controller'

function SendOtherMessageCtrl($scope, $mdBottomSheet,$rootScope,apiConfig,UploadService,$qupload,$mdToast) {

        var qiniu_im_host = apiConfig.qiniu_im_host;
        $scope.selectFiles = [];


        var start = function (index) {
            $mdBottomSheet.hide();
            $mdToast.show({
                controller: UploadToastCtrl,
                template: UploadToast,
                hideDelay: 60e3,
                position: 'top'
            });
            var key = new Date().getTime()+'';
            $scope.selectFiles[index].upload = $qupload.upload({
                //key: $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss')+'_'+$rootScope.talkUser.user_uin,//按用户名称和发送时间命名 方便数据迁移
                key: key,//按用户名称和发送时间命名 方便数据迁移
                file: $scope.selectFiles[index].file,
                token:$scope.uploadToken,
            });
            $scope.selectFiles[index].upload.then(function (response) {
                //上传成功 发送图片
                var img_url = qiniu_im_host+response.key;
                $rootScope.$broadcast('img_upload_success',{img_url:img_url});
                $scope.selectFiles.splice(index,1);
            }, function (response) {
                //toaster.pop('error','上传失败!');
                $scope.selectFiles.splice(index,1);
            }, function (evt) {
                $mdToast.updateContent(Math.floor(100 * evt.loaded / evt.totalSize));
            });
        };


        $scope.convertBase64UrlToBlob = function(urlData){
            var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte

            //处理异常,将ascii码小于0的转换为大于0
            var ab = new ArrayBuffer(bytes.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < bytes.length; i++) {
                ia[i] = bytes.charCodeAt(i);
            }

            return new Blob( [ab] , {type : 'image/png'});
        }

        $scope.onFileSelect = function ($files) {
            var offsetx = $scope.selectFiles.length;
            $scope.getUpToken().then(function(){
                for (var i = 0; i < $files.length; i++) {
                    if(!($files[i].type == 'image/png' || $files[i].type == 'image/jpg' || $files[i].type == 'image/jpeg')){
                        //toaster.pop('info',$files[i].name+'不是图片类型,不能上传!');
                        continue;
                    }
                    $scope.selectFiles[i + offsetx] = {
                        file: $files[i]
                    };
                    start(i + offsetx);
                }
            })

        };

        $scope.getUpToken = function(){
            //that.value = null;
            return new Promise(function(resolve,reject){
                UploadService.get({type:'im'}).$promise.then(function(data){
                    if(data && data.code == 200){
                        $scope.uploadToken = data.data.upload_token;
                        resolve()
                    }else{
                        reject()
                    }
                }).catch(function(){
                    reject()
                })
            })
        };

    }

SendOtherMessageCtrl.$inject = ['$scope','$mdBottomSheet','$rootScope','apiConfig','Upload','$qupload','$mdToast'];

export default SendOtherMessageCtrl