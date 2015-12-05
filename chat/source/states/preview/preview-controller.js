/**
 * Created by yangjiajun on 15/12/3.
 */
import $ from 'jquery';

import 'source/components/btn_back/btn-back-directive'

export default angular.module('preview')
    .controller('PreviewCtrl',['$scope','$routeParams','$rootScope','$timeout',
        function($scope,$routeParams,$rootScope,$timeout){
            $scope.pageClass = 'page';
            $("#preview_box").css('height',$rootScope.winheight+'px')

            $scope.isSamllImg = true;
            $scope.toggleImg = toggleImg;

            init();

            //////////////////////////////////////////////
            function init(){
                autoMarginTop();
            }

            function toggleImg(){
                $scope.isSamllImg = !$scope.isSamllImg;
                autoMarginTop();
            }

            function autoMarginTop(){
                $timeout(()=>{
                    let img_height = $("#preview_img")[0].height;
                    let margin_top = Math.abs($rootScope.winheight-img_height)/2;

                    if($scope.isSamllImg){
                        //设置顶部距离
                        if(img_height == 0){
                            $("#preview_img").css('margin-top','50%');
                        }else{
                            if(img_height>$rootScope.winheight){
                                $("#preview_img").css('margin-top',0);
                            }else{
                                $("#preview_img").css('margin-top',margin_top+'px');
                            }
                        }
                    }else{
                        if(img_height>$rootScope.winheight){
                            $("#preview_img").css('margin-top',0);
                        }else{
                            $("#preview_img").css('margin-top',margin_top+'px');
                        }
                    }
                },100)
            }
    }])