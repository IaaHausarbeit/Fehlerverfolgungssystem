/**
 * The services.
 */
'use strict';

var services = angular.module('services', ['resources']);

// Set up the ticket service.
services.service('ticketService', ['$http', function ($http) {
    /**
     * Return all tickets using an asynchronous REST call with promise.
     * @returns {HttpPromise}.
     */
    this.listTicketsWithPromise = function () {
        return $http.get('../rest/ticketlist');
    };

    /**
     * Saves a given ticket using an asynchronous REST call with promise.
     * @param ticket The ticket to be saved.
     * @returns {HttpPromise}.
     */
    this.saveTicketWithPromise = function (ticket) {
        return $http.put('../rest/saveTicket', ticket);
    };

}]);

// Set up the developer service.
services.service('developerService', ['$http', function ($http) {
    /**
     * Saves the developer (registration)
     * @param developer
     * @returns {HttpPromise}.
     */
    this.saveDeveloperWithPromise = function (developer) {
        return $http.put('../rest/saveDeveloper', developer);
    };
}]);
