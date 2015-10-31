/**
 * Created by yangjiajun on 15/10/10.
 */

angular.module('format_date',[])
    .filter('format_date',['$rootScope','$filter',function ($rootScope,$filter) {
        return function (text,isHour) {

            if(typeof text == 'number'){
                text = $filter('date')(new Date(text),'yyyy-MM-dd HH:mm:ss');
            }
            if(text && text !='' && text != undefined) {
                if (isHour) {
                    text = text.substr(text.length - 8, 8);
                } else {
                    text = text.substr(text.length - 14, 14);
                }
            }
            return text;
        }
    }]
)