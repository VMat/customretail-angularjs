/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */

angular.module('almundoexam')
.controller('mainCtrl', function($scope, $filter, storage){

    'use strict';

    $scope.hotels = storage.hotels;

    // NAME FILTER
    $scope.inputName = null;

    // PRICE RANGE FILTER
    $scope.stepPrice = 1;
    $scope.minPrice = 0;
    $scope.maxPrice = 99999999;
    $scope.priceRange = {
        min: $scope.minPrice,
        max: $scope.maxPrice
    };

    // STARS FILTER
    $scope.STARS = {ALL:0, ONE:1, TWO:2, THREE:3, FOUR:4, FIVE:5};
    $scope.inputStars = {0: true, 1: false, 2: false, 3: false, 4: false, 5: false};

    storage.get().then(function (hotels) {
        $scope.hotels = hotels;
        $scope.maxPrice = $scope.hotels.reduce(function(max,item){
            return max > item.price ? max : item.price;
        },0);
        $scope.minPrice = $scope.hotels.reduce(function(min,item){
            return min < item.price ? min : item.price;
        },$scope.maxPrice);
    });

    $scope.noStarsSelected = function(){

        var noStarsSelected = true;

        for(var i in $scope.inputStars){
            noStarsSelected = noStarsSelected && (!$scope.inputStars[i] || i == $scope.STARS.ALL);
        }

        return noStarsSelected;
    };

    $scope.setAllStars = function(){
        $scope.inputStars[$scope.STARS.ONE] = false;
        $scope.inputStars[$scope.STARS.TWO] = false;
        $scope.inputStars[$scope.STARS.THREE] = false;
        $scope.inputStars[$scope.STARS.FOUR] = false;
        $scope.inputStars[$scope.STARS.FIVE] = false;
    };

    $scope.testHotel = function(hotel){
        return nameFilter(hotel) && priceFilter(hotel) && starsFilter(hotel);
    };

    function nameFilter(hotel){
        return Boolean($scope.inputName) ? hotel.name.toLowerCase().includes($scope.inputName.toLowerCase()) : true;
    }

    function priceFilter(hotel){
        return hotel.price >= $scope.priceRange.min && hotel.price <= $scope.priceRange.max;
    }

    function starsFilter(hotel){
        return !$scope.noStarsSelected() ? $scope.inputStars[hotel.stars] : true;
    }
});
