'use strict';

/**
 * @ngdoc overview
 * @name dateTimePickerApp
 * @description
 * # dateTimePickerApp
 *
 * Main module of the application.
 */
angular
  .module('dateTimePicker', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ngMaterial'
  ])
  .config(function ($stateProvider, $urlRouterProvider,$mdThemingProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider.state('home', {
            url: '/home',  
            templateUrl: 'views/home.html',
            controller: 'MainCtrl',
            controllerAs : 'vm',
            data: {
                title: 'Dashboard',
            }            
    }).state('date-time-picker', {
            url: '/date-time-picker-demo',  
            templateUrl: 'views/date-time-picker-demo.html',
            controller: 'MainCtrl',
            controllerAs : 'vm',
            data: {
                title: 'Date Time Picker Demo',
            }            
    }).state('date-time-picker-api', {
            url: '/date-time-picker-api',  
            templateUrl: 'views/date-time-picker-api.html',
            controller: 'MainCtrl',
            controllerAs : 'vm',
            data: {
                title: 'Date Time Picker API',
            }            
    }).state('range-picker-demo', {
            url: '/range-picker-demo',  
            templateUrl: 'views/range-picker-demo.html',
            controller: 'MainCtrl',
            controllerAs : 'vm',
            data: {
                title: 'Range Picker Demo',
            }            
    });
   
    $mdThemingProvider.theme('default')
        .primaryPalette('red');
  });