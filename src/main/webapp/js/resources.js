/**
 * The resources.
 */
'use strict';

var resources = angular.module('resources', []);

resources.factory('Ticket', function () {
    return function (id, titel, status, description, creator, currentWorker,createDateTimestamp, changeDateTimestamp, commentaryList) {
        this.id = id;
        this.titel = titel;
        this.status = status;
        this.description = description;
        this.creator = creator;
        this.currentWorker = currentWorker;
        this.createDateTimestamp = createDateTimestamp;
        this.changeDateTimestamp = changeDateTimestamp;
        this.commentaryList = commentaryList;
    };
});
