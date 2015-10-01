/**
 * Created by yangjiajun on 15/9/30.
 */

export default angular.module('chat')
    .controller('SendOtherMessageCtrl', function($scope, $mdBottomSheet) {
        $scope.items = [
            { name: '表情', type: 1 , icon: 'emoticon' },
            { name: '图片', type: 3 , icon: 'file-image-box' },
            { name: '语音', type: 2 , icon: 'microphone' }
        ];
        $scope.listItemClick = function($index) {
            var clickedItem = $scope.items[$index];
            $mdBottomSheet.hide(clickedItem);
        };
    })