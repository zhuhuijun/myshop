var app = angular.module('AllCtrl', []);
/***
 * 导航控制器
 */
app.controller('NavCtrl', function ($scope) {

});
/***
 * 主页的控制器
 */
app.controller('HomeCtrl', function ($scope) {

});
/***
 * 注册的控制器
 */
app.controller('RegCtrl', function ($scope, $http, $location) {
    $scope.save = function () {
        console.log($scope.user);
        $http({
            url: '/users/reg',
            method: 'POST',
            data: $scope.user
        }).success(function (userff) {
                console.log(userff);
                $location.path('/users/login');

            }).error(function (data) {
                console.log(data);
                $location.path('/users/reg');
            });
        return false;
    };
});
/**
 * 登录的控制器
 */
app.controller('LoginCtrl', function ($rootScope, $scope, $http, $location) {
    $scope.save = function () {
        $http({
            url: '/users/login',
            method: 'POST',
            data: $scope.user
        }).success(function (usertt) {
                $rootScope.me = usertt;//根上的用户
                $location.path('/home');
            }).error(function (data) {
                $location.path('/users/login');
            });
        return false;
    };
});