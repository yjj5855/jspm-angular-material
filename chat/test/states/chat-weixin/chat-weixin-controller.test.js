/**
 * Created by yangjiajun on 15/11/3.
 */
import 'test/helper'

describe('ChatWeiXinCtrl', function() {
    var scope;
    //我们会在测试中使用这个scope
    var ctrl;

    //模拟我们的Application模块并注入我们自己的依赖
    beforeEach(angular.mock.module('myApp'));

    //模拟Controller，并且包含 $rootScope 和 $controller
    beforeEach(angular.mock.inject(function($rootScope, $controller){

    //创建一个空的 scope
        scope = $rootScope.$new();

    //声明 Controller并且注入已创建的空的 scope
        ctrl = $controller('ChatWeiXinCtrl', {$scope: scope});
    }))

    // 测试从这里开始
    it('初始化 聊天页面的页码 为 1', function(){
        expect(scope).to.have.property('page').equal(1);
    });

});