/**
 * Controller
 */
'use strict';

var controllers = angular.module('controllers', ['resources', 'services']);

//Controller, um zwischen den Seiten hin und her zu springen!
//mainScreenController
controllers.controller('mainScreenController', ['$scope', function ($scope) {
    // Die Screens
    $scope.screens = {
        ticketlistScreen: ['ticketlistScreen', 'ticketlist.html'],
        editScreen: ['editScreen', 'editScreen.html']
    };

    // Das model
    $scope.model = {
        tickets: [],
        selectedTicket: null,
        screen: $scope.screens.ticketlistScreen
    };

    /**
     * zum neuen Screen wechseln
     * @param newScreen
     */
    $scope.switchToScreen = function (newScreen) {
        if (angular.isArray(newScreen) && newScreen.length === 2) {
            $scope.model.screen = newScreen;
        }
    };

    /**
     * Gibt den ab´ktuellen Screen zurück
     * @returns a string.
     */
    this.getCurrentScreenSource = function () {
        return $scope.model.screen[1];
    };
}]);


// listController
controllers.controller('listController', ['$scope', 'Ticket', 'ticketService', function ($scope, Ticket, ticketService) {
    $scope.sortType     = 'number'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order

    /**
     * Startet die Bearbeitung
     * @param selected
     */
    this.editTicket = function (selected) {
        $scope.model.selectedTicket = selected;
        $scope.switchToScreen($scope.screens.editScreen);
    };

    /**
     * Startet die Erstellung eines neuen Tickets
     */
    this.newTicket = function () {
        $scope.model.selectedTicket = new Ticket();
        $scope.switchToScreen($scope.screens.editScreen);
    };

    // Listet alle Tickets auf
    ticketService.listTicketsWithPromise()
        .success(function (data, status, headers, config) {
            $scope.model.tickets = data;
        })
        .error(function (data, status, headers, config) {
            alert("Fehler beim Laden!");
        });
}]);


//regController für die Registrierung
controllers.controller('regController', ['$scope', 'Developer', 'developerService', function ($scope, Developer, developerService) {
    var messages = {
        errors: {
            required: 'Pflichtfeld!',
            unknown: 'ungültiger Wert!'
        }
    };

    /**
     * Saves the Developer
     * @param regForm The form object of the ticket.
     */
    this.saveDeveloper = function (regForm) {
        var dev = new Developer(document.getElementById("nameId").value, document.getElementById("nicknameId").value, document.getElementById("eMailId").value, document.getElementById("passwordId").value);

        if (regForm.$valid) {
            // do save data
            developerService.saveDeveloperWithPromise(dev)
                .success(function (data, status, headers, config) {
                    if ($scope.model.developer.indexOf(selected) === -1) {
                        $scope.model.developer.push(data);
                    }
                    $scope.switchToScreen($scope.screens.ticketlistScreen);
                }).error(function (data, status, headers, config) {
                    alert("Fehler beim Speichern!");
                });
        }
    };


    /**
     * Stimmen die Passwörter überein?
     */
    this.checkPassword = function (){
        console.log(document.getElementById("passwordConfirmId").value);
        console.log(document.getElementById("passwordId").value);
        if(document.getElementById("passwordConfirmId").value != document.getElementById("passwordId").value){
            return true;
        }
    };

    /**
     * Gibt die Fehlermeldung zurück
     * @param element
     * @returns a string.
     */
    this.getErrorMessage = function (element) {
        var message = null;
        if (element.$error) {
            if (element.$error.required) {
                message = messages.errors.required;
            } else {
                message = messages.errors.unknown;
            }
        }
        return message;
    };

}]);

// formController
controllers.controller('formController', ['$scope', 'Ticket', 'ticketService', 'Commentary', function ($scope, Ticket, ticketService, Commentary, $http) {
    var messages = {
        errors: {
            required: 'Pflichtfeld!'
        }
    };

    // Auswahlfelder für den Ticketstatus
    $scope.stateOptions = [{name: "Angelegt", id: 1}, {name: "In Bearbeitung", id: 2}, {name: "Behoben", id: 3},
        {name: "Abgelehnt", id: 4}, {name: "Wiedereroeffnet", id: 5}, {name: "Geschlossen", id: 6}];
    $scope.selectedOption = $scope.stateOptions[0];


    // das model
    $scope.formModel = {
        isEdit: $scope.model.selectedTicket.titel && $scope.model.selectedTicket.description,
        formTicket: new Ticket($scope.model.selectedTicket.id, $scope.model.selectedTicket.titel, $scope.model.selectedTicket.status,
            $scope.model.selectedTicket.description, $scope.model.selectedTicket.creator, $scope.model.selectedTicket.currentWorker,
            $scope.model.selectedTicket.createDateTimestamp, $scope.model.selectedTicket.changeDateTimestamp, $scope.model.selectedTicket.commentaryList
        )
    };

    /**
     * Abbrechen
     */
    this.cancel = function () {
        $scope.switchToScreen($scope.screens.ticketlistScreen);
    };

    /**
     * Nur die richtige Rolle darf bearbeiten, sonst ist der Button disabled.
     */
    this.checkRole = function() {
        var selected = $scope.model.selectedTicket;
        var loginName = getLoginName();
        //wenn Ticket in Bearbeitung und angemeldeter User nicht Bearbeiter
        if(selected.status == "IN_BEARBEITUNG" && selected.currentWorker != loginName){
            return true;
        }
        //wenn Ticket behoben oder abgelehnt und angemeldeter User nicht Autor
        if((selected.status == "BEHOBEN" || selected.status == "ABGELEHNT") && selected.creator != loginName){
            return true;
        }
    };

    /**
     * Nur die richtige Rolle darf bearbeiten, sonst ist der Button disabled.
     */
    this.checkStatus = function() {
        var selected = $scope.model.selectedTicket;
       // Beim Anlegen ist er null.
        if(selected.status == null && $scope.selectedOption.id != 1){
           return true;
        }
        if(selected.status == "ANGELEGT" && $scope.selectedOption.id != 2){
            return true;
        }

        if(selected.status == "IN_BEARBEITUNG" && ($scope.selectedOption.id != 3 && $scope.selectedOption.id != 4)){
            return true;
        }
        if((selected.status == "BEHOBEN" || selected.status == "ABGELEHNT") && ($scope.selectedOption.id != 5 && $scope.selectedOption.id != 6) ){
            return true;
        }
        if(selected.status == "WIEDEREROEFFNET" && $scope.selectedOption.id != 2){
            return true;
        }
        if(selected.status == "GESCHLOSSEN"){
            return true;
        }
    };


    /**
     * Speichern
     * @param editForm
     */
    this.saveTicket = function (editForm) {
        var selected = $scope.model.selectedTicket;
        var edited = $scope.formModel.formTicket;
        if (editForm.$valid && selected && edited) {
            selected.id = edited.id;
            //nicht von der selectedOption, sondern vom Button...der noch zu implementieren ist!
            //Button dann je nach status show/hide
            selected.status = $scope.selectedOption.id - 1;
            var loginName = getLoginName();
            if($scope.selectedOption.id == 1) {selected.creator = loginName;}
            //nur beim 1. Anlegen (also status = angelegt), soll der creator gesetzt werden
            selected.currentWorker = $scope.selectedOption.id == 2 ? loginName: null;
            //wenn das Ticket in den Status "in Bearbeitung" überführt wird, ist der Bearbeiter = LoginName und sonst null
            selected.changeDateTimestamp = (new Date()).toJSON().slice(0, 10);
            selected.titel = edited.titel;
            selected.description = edited.description;
            selected.commentaryList = edited.commentaryList;
            var commentary = new Commentary(edited.id, document.getElementById("commentaryID").value, loginName, (new Date()).toJSON().slice(0, 10));
            if(edited.commentaryList === undefined) {
                edited.commentaryList = [];
            }
            edited.commentaryList.push(commentary);

            // do save data
            ticketService.saveTicketWithPromise(selected)
                .success(function (data, status, headers, config) {
                    if ($scope.model.tickets.indexOf(selected) === -1) {
                        $scope.model.tickets.push(data);
                    }
                    $scope.switchToScreen($scope.screens.ticketlistScreen);
                }).error(function (data, status, headers, config) {
                    alert("Fehler beim Speichern.");
                });
        }
    };

    function getLoginName() {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", "../rest/getUserName", false);
        xmlHttp.send(null);
        return xmlHttp.responseText;
    }

    /**
     * Fehlermeldung
     * @param element
     * @returns a string.
     */
    this.getErrorMessage = function (element) {
        var message = null;
        if (element.$error) {
            if (element.$error.required) {
                message = messages.errors.required;
            }
        }
        return message;
    };

}]);