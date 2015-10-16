/**
 * The application.
 * Created by Stephan on 18.12.2014.
 */
'use strict';

var application = angular.module('ticketsystem', []);

application.controller('mainController', ['$scope', 'ticketService', function ($scope, ticketService) {

    // Setup scope model
    $scope.model = {
        rooms: []
    };

    // Load rooms from REST API
    //roomService.listRooms()
    //    .success(function (data) {
    //        $scope.model.rooms = data;
    //    })
    //    .error(function () {
    //        alert('Error occured while loading');
    //    });

}]);

application.service('ticketService', ['$http', function ($http) {

    /**
     * Return all rooms.
     * @returns {HttpPromise}
     */
    this.listRooms = function () {
        return $http.get('rest/tickets');
    }

}]);
