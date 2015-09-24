/**
 * Created by yangjiajun on 15/9/24.
 */
class HomeController {
    constructor($filter,$scope){
        this.$filter = $filter;
        this.$scope = $scope;
        this.now = new Date();

        $scope.isOpen = false;
        $scope.demo = {
            isOpen: false,
            count: 0,
            selectedDirection: 'left'
        };
    }

    time(){
        return this.$filter('date')(this.now);
    }
}

HomeController.$inject = ['$filter','$scope'];

export default HomeController;