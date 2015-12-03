
function ErrorDialogCtrl($scope,$mdDialog){
    $scope.closeDialog = function() {
        $mdDialog.hide();
    }
}

ErrorDialogCtrl.$inject = ['$scope','$mdDialog'];

export default ErrorDialogCtrl