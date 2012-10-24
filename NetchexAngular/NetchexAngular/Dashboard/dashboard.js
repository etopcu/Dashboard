'use strict';

var Dashboard = Dashboard || {};

Dashboard.Constants = angular.module('dashboard.constants', []);
Dashboard.Services = angular.module('dashboard.services', []);
Dashboard.Controllers = angular.module('dashboard.controllers', []);
Dashboard.Filters = angular.module('dashboard.filters', []);
Dashboard.Directives = angular.module('dashboard.directives', []);

// Declare app level module which depends on filters, and services
angular.module('dashboard', ['dashboard.filters', 'dashboard.services', 'dashboard.directives', 'dashboard.constants', 'dashboard.controllers', 'ui']).
  config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/', { templateUrl: 'views/home.html'});
      $routeProvider.otherwise({ redirectTo: '/' });
  }]);

Dashboard.Constants.constant('$config', {
    JSON_URL: '/dashboard/json/'
});