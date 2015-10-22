/**
 * The application.
 */
'use strict';

var application = angular.module('ticketsystem', ['controllers']);


/*
application.controller('mainController', ['$scope', 'ticketService', function ($scope, ticketService) {

    // Setup scope model
    $scope.model = {
        rooms: []
    };

}]);

application.service('ticketService', ['$http', function ($http) {

    /!**
     * Return all rooms.
     * @returns {HttpPromise}
     *!/
    this.listTickets = function () {
        return $http.get('rest/tickets');
    }

}]);
*/
