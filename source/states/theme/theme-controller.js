
import 'source/components/btn_back/btn-back-directive'

/**
 * 目前还不能动态 修改主题
 * 只能通过修改material源码的方式实现
 */
class ThemeCtrl{
    constructor($scope,$rootScope){
        $rootScope.app_theme = 'default';
    }
}

ThemeCtrl.$inject = ['$scope','$rootScope'];

export default ThemeCtrl;