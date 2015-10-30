var app = angular.module('AllCtrl', []);
/***
 * 导航控制器
 */
app.controller('NavCtrl', function ($scope, $http, $location, $rootScope) {
    $scope.isActive = function (path) {
        return path == $location.path();
    };
    $scope.logout = function () {
        $http({
            url: '/users/logout',
            method: 'POST'
        }).success(function (msg) {
                $rootScope.me = null;
                $location.path('/users/login');
            }).error(function (data) {
                $location.path('/users/login');
            });
    };
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
/**
 * 购物车控制器
 */
app.controller('CartsCtrl', function ($scope, WareService) {
    $scope.carts = [];
    var options = {url: '/carts/list', method: 'GET'};
    WareService.WareData.GetCartList($scope, options).then(function (resuvv) {
        $scope.carts = resuvv;
    }, function (dd) {
        console.info(dd);
    });
    $scope.total = function () {
        var total = 0;

        $scope.carts.forEach(function (cart) {
            total += cart.num * cart.ware.price;
        });
        return total;
    };
    $scope.delete = function () {
        $scope.carts = $scope.carts.filter(function (carr) {
            return carr._id != $scope.cart._id;
        });
    };
});
app.controller('AdminCtrl', function ($scope, WareService) {
    $scope.save = function () {
        var options = {
            url: '/wares/add',
            method: 'POST',
            data: $scope.lware
        };
        WareService.WareData.AddData($scope, options).then(function (dree) {
            $scope.wares.push(dree);
        }, function (dd) {
            console.info(dd);
        });
    }
    var options = {url: '/wares/list', method: 'GET'};
    WareService.WareData.GetData($scope, options).then(function (resuvv) {
        $scope.wares = resuvv;
    }, function (dd) {
        console.info(dd);
    });

});
/***
 * 商品浏览的控制器
 */
app.controller('WaresCtrl', function ($scope, WareService) {
    var options = {url: '/wares/list', method: 'GET'};
    WareService.WareData.GetData($scope, options).then(function (resuvv) {
        $scope.wares = resuvv;
    }, function (dd) {
        console.info(dd);
    });
    /**
     * 添加购物车
     */
    $scope.addCart = function (wareid) {
        var options = {url: '/wares/addcart/' + wareid, method: 'GET'};
        WareService.WareData.AddCart($scope, options).then(function (resuvv) {

        }, function (dd) {
            console.info(dd);
        });
    };
});