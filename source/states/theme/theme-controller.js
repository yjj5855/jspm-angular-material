
import 'source/components/btn_back/btn-back-directive'

class ThemeCtrl{
    constructor($scope,$rootScope){
        //$scope.themes = [
        //    {
        //        name:'主色:蓝|次色:绿|警告色:橙',
        //        primary:'blue',
        //        primarySetting:{
        //            'default'   :   '500',
        //            'hue-1'     :   '900',
        //            'hue-2'     :   'A100',
        //            'hue-3'     :   '400'
        //        }
        //    }
        //];


        $scope.changeTheme = changeTheme;


        function changeTheme(theme_name){
        
        }
    }
}

ThemeCtrl.$inject = ['$scope','$rootScope'];

export default ThemeCtrl;