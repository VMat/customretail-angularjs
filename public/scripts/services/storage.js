/*global angular */

/**
 * Services that persists and retrieves hotels from localStorage or a backend API
 * if available.
 *
 * They both follow the same API, returning promises for all changes to the
 * model.
 */
angular.module('almundoexam')

	.factory('storage', function ($http) {
		'use strict';

		var store = {
			
		    hotels: [],

		    get: function () {
			return $http.get('/api/hotels')
			    .then(function (resp) {
				angular.copy(resp.data, store.hotels);
				return store.hotels;
			    });
		    }
		};

		return store;
	});
