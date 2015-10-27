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

resources.factory('Developer', function () {
    return function (name, nickname, eMailAddress, password) {
        this.name = name;
        this.nickname = nickname;
        this.eMailAddress = eMailAddress;
        this.password = password;
    };
});

resources.factory('Commentary', function(){
   return function(ticket_id, text, creator, date){
       this.ticket_id = ticket_id;
       this.text = text;
       this.creator = creator;
       this.date = date;
   };
});
