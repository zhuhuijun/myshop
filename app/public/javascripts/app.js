var app = angular.module('myApp', ['ngRoute', 'AllCtrl']);
app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'pages/home.html',
        controller: "HomeCtrl"
    }).when('/users/reg', {
            templateUrl: 'pages/user/reg.html',
            controller: "RegCtrl"
        }).when('/users/login', {
            templateUrl: 'pages/user/login.html',
            controller: "LoginCtrl"
        }).otherwise({
            redirectTo: '/'
        })
});
