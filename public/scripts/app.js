/*global angular */

/**
 * The main app module
 *
 * @type {angular.Module}
 */

	angular.module('almundoexam', ['ngRoute'])
	.config(function ($routeProvider) {
		'use strict';

		var routeConfig = {
			controller: 'mainCtrl',
			templateUrl: '../views/main.ejs'
		};

		$routeProvider
			.when('/', routeConfig)
			.otherwise({
				redirectTo: '/'
		});
	});
