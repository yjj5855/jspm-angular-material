/**
 * Created by yangjiajun on 15/9/28.
 */
import PreviewTpl from './preview-template.html!text';
import PreviewCtrl from './preview-controller';

var PreviewRoute = {
    template    :   PreviewTpl,
    controller  :  'PreviewCtrl',
    //previewDetail:['$route',function($route){
    //    console.log($route.current.params)
    //}]
};
export default PreviewRoute;