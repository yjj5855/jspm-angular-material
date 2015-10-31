/**
 * Created by yangjiajun on 15/9/30.
 */


export default angular.module('chat')
    .controller('SendOtherMessageCtrl',['$scope','$mdBottomSheet','$rootScope',function($scope, $mdBottomSheet,$rootScope) {
        $scope.items = [
            { name: '表情', type: 1 , icon: 'emoticon' },
            { name: '图片', type: 3 , icon: 'file-image-box' },
            //{ name: '语音', type: 2 , icon: 'microphone' }
        ];
        $scope.listItemClick = function($index) {
            var clickedItem = $scope.items[$index];
            switch (clickedItem.type){
                case 2:
                    //语音

                    break;
                case 3:
                    //图片

                    break;
                default :
                    break;
            }
            $mdBottomSheet.hide(clickedItem);
        };

    }])