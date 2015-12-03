/**
 * Created by yangjiajun on 15/11/17.
 */


function UploadToastCtrl($scope, $mdToast) {
    $scope.closeToast = function() {
        $mdToast.hide();
    };
    $scope.$on('img_upload_success',function(event,data){
        $mdToast.hide();
        $mdToast.show(
            $mdToast.simple()
                .content('上传成功!')
                .position('top')
                .hideDelay(1000)
        );
    });
}

UploadToastCtrl.$inject = ['$scope','$mdToast']

export default UploadToastCtrl;