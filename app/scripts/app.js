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
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
