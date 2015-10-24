/**
 * The services.
 */
'use strict';

var services = angular.module('services', ['resources']);

// Set up the room service.
services.service('ticketService', ['$http', function ($http) {
    /**
     * Return all tickets using an asynchronous REST call with promise.
     * @returns {HttpPromise}.
     */
    this.listTicketsWithPromise = function () {
        return $http.get('rest/ticket/ticketlist');
    };

    /**
     * Saves a given ticket using an asynchronous REST call with promise.
     * @param ticket The ticket to be saved.
     * @returns {HttpPromise}.
     */
    this.saveTicketWithPromise = function (ticket) {
        return $http.put('rest/ticket/editScreen', ticket);
    };

/*  eventuell sp�ter einf�gen!
    /!**
     * Deletes the given ticket using an asynchronous REST call with promise.
     * @param ticket The ticket to be deleted.
     * @returns {HttpPromise}.
     *!/
    this.deleteRoomWithPromise = function (ticket) {
        return $http.delete('rest/ticets/' + ticket.id);
    }*/
}]);