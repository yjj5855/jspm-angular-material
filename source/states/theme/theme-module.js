/**
 * Created by yangjiajun on 15/9/28.
 */
export default angular.module('theme',['ngMaterial'])
    .config(['$mdThemingProvider',function($mdThemingProvider){


        //angular.$watch('app_theme',function(newValue,oldValue,scope){
        //   switch (newValue){
        //       case 'default':
        //           $mdThemingProvider.theme('default');
        //           break;
        //       case 'dark':
        //           $mdThemingProvider.theme('default').dark();
        //           break;
        //       default :
        //           $mdThemingProvider.theme('default');
        //           break;
        //   }
        //},true);
    }]);