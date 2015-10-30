var app = angular.module('myApp', ['ngRoute', 'AllCtrl']);
app.config(function ($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'pages/home.html',
        controller: "HomeCtrl"
    }).when('/users/reg', {
            templateUrl: 'pages/user/reg.html',
            controller: "RegCtrl"
        }).when('/users/login', {
            templateUrl: 'pages/user/login.html',
            controller: "LoginCtrl"
        }).when('/carts/list', {
            templateUrl: 'pages/carts/list.html',
            controller: "CartsCtrl"
        }).when('/wares/admin/list', {
            templateUrl: 'pages/wares/admin/list.html',
            controller: "AdminCtrl"
        }).when('/wares/list', {
            templateUrl: 'pages/wares/list.html',
            controller: "WaresCtrl"
        }).otherwise({
            redirectTo: '/home'
        })
});
//所有模块加载完的第一个方法
app.run(function ($http, $rootScope, $location) {
    //判断是否登陆的方法
    $http({
        url: '/users/validate',
        method: 'POST'
    }).success(function (usertt) {
            $rootScope.me = usertt;//根上的用户
            $location.path('/');
        }).error(function (data) {
            $location.path('/users/login');
        });
});
app.directive('addWares', function () {
    return{
        link: function (scope, element, attrs) {
            element.click(function () {
                $("#addDialog").modal(true);
            });
        }
    };
});
/**
 * 删除购物车
 */
app.directive('deleteCart', function () {
    return{
        link: function (scope, element, attrs) {
            element.click(function () {
                var t = element.attr('data-index');
                scope.$apply(function(){
                    scope.$parent.cart = scope.carts[t];
                });
                $("#deleteDialog").modal(true);
            });
        }
    };
});