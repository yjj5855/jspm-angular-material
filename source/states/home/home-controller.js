/**
 * Created by yangjiajun on 15/9/24.
 */


import 'source/service/QaService'
import './home-value'


class HomeController{
    static QaService;
    static $scope;
    static $value;
    constructor($filter,$scope,Qa,value,$rootScope){
        HomeController.QaService = Qa;
        HomeController.$scope = $scope;
        HomeController.$value = value;
        $scope.demo = value.demo;
        $scope.qa_list = value.qa_list;

        HomeController.firstLoadQaList()


        setTimeout(()=>{
            /**
             * 这里$scope.qa_list = value.qa_list; $scope.qa_list指向了value.qa_list地址
             * value.qa_list的值改变后，$scope.qa_list指向的地址还是value.qa_list地址
             */
            value.qa_list.list = [];

            /**
             * ng监测不到$scope引用的值已经改变了,所以要通知他去检查
             */
            $rootScope.$apply('qa_list');

        },3000);
    }

    static firstLoadQaList(){
        if(HomeController.$value.qa_list.first_load){
            HomeController.loadQaList(1);
        }
        HomeController.$value.qa_list.first_load = false;
    }

    static loadQaList(page){
        HomeController.$value.qa_list = HomeController.$scope.qa_list = {
            first_load  :false,
            list        :[{id:1,name:'name1'},{id:2,name:'name2'}],
            current_page:2,
            last_page   :10
        };
        //HomeController.QaService.query({user_id:599,page:page}).$promise.then(
        //    function(data){
        //        HomeController.$value.qa_list = HomeController.$scope.qa_list = {
        //            first_load  :false,
        //            list        :data.data.data,
        //            current_page:data.data.current_page,
        //            last_page   :data.data.last_page
        //        };
        //    }
        //)
    }

}

HomeController.$inject = ['$filter','$scope','Qa','home.value','$rootScope'];

export default HomeController;