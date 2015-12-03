
function ImgDialogCtrl($scope,$mdDialog){
    $scope.closeDialog = function() {
        $mdDialog.hide();
    }
}

ImgDialogCtrl.$inject = ['$scope','$mdDialog'];

export default ImgDialogCtrl