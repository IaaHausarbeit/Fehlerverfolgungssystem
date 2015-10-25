/**
 * The controllers.
 */
'use strict';

var controllers = angular.module('controllers', ['resources', 'services']);

/*TODO: regController!! Im Moment ruft der nur die Ticketlist auf, ohne Benutzername, E-Mail Adresse und PW
abzugleichen und zu speichern.*/


//Controller, um zwischen den Seiten hin und her zu springen!
//TODO: Set up main controller.
controllers.controller('mainController', ['$scope', function ($scope) {
    // Set up the screens object
    $scope.screens = {
        startScreen: ['startScreen', 'start.html'],
        ticketlistScreen: ['ticketlistScreen', 'ticket/ticketlist.html'],
        editScreen: ['editScreen', 'ticket/editScreen.html'],
        registrationScreen: ['registrationScreen', 'registration.html']
    };

    // Set up the scope model
    $scope.model = {
        tickets: [],
        selectedTicket: null,
        screen: $scope.screens.startScreen
    };

    /**
     * Switches to a specific screen.
     * @param newScreen The current screen (an array).
     */
    $scope.switchToScreen = function (newScreen) {
        if (angular.isArray(newScreen) && newScreen.length === 2) {
            $scope.model.screen = newScreen;
        }
    };

    /**
     * Returns the current screen.
     * @returns the corresponding array.
     */
    $scope.getCurrentScreen = function () {
        return $scope.model.screen;
    };

    /**
     * Returns the file name of the current screen.
     * @returns a string.
     */
    this.getCurrentScreenSource = function () {
        return $scope.model.screen[1];
    };
}]);

//TODO mainScreen contoller
controllers.controller('mainScreenController', ['$scope', function ($scope) {
    // Set up the screens object
    $scope.screens = {
        ticketlistScreen: ['ticketlistScreen', 'ticketlist.html'],
        editScreen: ['editScreen', 'editScreen.html']
    };

    // Set up the scope model
    $scope.model = {
        tickets: [],
        selectedTicket: null,
        screen: $scope.screens.ticketlistScreen
    };

    /**
     * Switches to a specific screen.
     * @param newScreen The current screen (an array).
     */
    $scope.switchToScreen = function (newScreen) {
        if (angular.isArray(newScreen) && newScreen.length === 2) {
            $scope.model.screen = newScreen;
        }
    };

    /**
     * Returns the current screen.
     * @returns the corresponding array.
     */
    $scope.getCurrentScreen = function () {
        return $scope.model.screen;
    };

    /**
     * Returns the file name of the current screen.
     * @returns a string.
     */
    this.getCurrentScreenSource = function () {
        return $scope.model.screen[1];
    };
}]);


//TODO STARTSEITE!
//Set up the start controller.
controllers.controller('startController', ['$scope', function ($scope) {
    this.registration = function (){
        $scope.switchToScreen($scope.screens.registrationScreen);
    }
    this.login = function (){
        $scope.switchToScreen($scope.screens.ticketlistScreen);
    }

}]);



//TODO REGISTRIERUNGSSEITE
//TODO: Hier fehlt noch die Registrierung an sich, also Abgleich mit DB und Speicherung
//Set up the start controller.
controllers.controller('regController', ['$scope', function ($scope) {
    this.start = function (){
        $scope.switchToScreen($scope.screens.startScreen);
    }
    this.registration = function(){
        //hier muss eine Funktion zum Speichern der Daten rein + Pr�fung, ob PW = PW & Benutzername und E-Mail noch nicht vergeben
        //Pr�fung, ob PW = PW auch direkt mit Angular?
        $scope.switchToScreen($scope.screens.ticketlistScreen);
    }
}]);



//TODO: ListController anlegen mit den n�tigen Methoden
// Set up the list controller.
controllers.controller('listController', ['$scope', 'Ticket', 'ticketService', function ($scope, Ticket, ticketService) {
    /**
     * Selects a ticket.
     * @param selected The ticket to be selected.
     */
    this.selectTicket = function (selected) {
        $scope.model.selectedTicket = selected;
    };

    /**
     * Starts the editing of the ticket.
     * @param selected The ticket to be edited.
     */
    this.editTicket = function (selected) {
        this.selectTicket(selected);
        $scope.switchToScreen($scope.screens.editScreen);
    };

    /**
     * Starts the creation of a new ticket.
     */
    this.newTicket = function () {
        //TODO
        $scope.model.selectedTicket = new Ticket();
        $scope.switchToScreen($scope.screens.editScreen);
    };

    // List the current tickets.
    ticketService.listTicketsWithPromise()
        .success(function (data) {
            $scope.model.tickets = data;
        })
        .error(function () {
            alert("an error occured while loading");
        });
}]);


//TODO!! F�r Edit / Create
// Set up the form controller.
controllers.controller('formController', ['$scope', 'Ticket', 'ticketService', function ($scope, Ticket, ticketService) {
    // Object containing the error messages.
    var messages = {
        errors: {
            required: 'Please enter a value!'
            /*number: 'Please enter a number!',
            min: 'The number is smaller than the minimum allowed!',
            unknown: 'Please enter a valid value!'*/
        }
    };

    // Set up the form model. //TODO angucken
    $scope.formModel = {
        isEdit: $scope.model.selectedTicket.titel && $scope.model.selectedTicket.description,
        formTicket: new Ticket($scope.model.selectedTicket.id, $scope.model.selectedTicket.status,
                    $scope.model.selectedTicket.creator, $scope.model.selectedTicket.currentWorker,
                    $scope.model.selectedTicket.createDateTimestamp, $scope.model.selectedTicket.changeDateTimestamp,
                    $scope.model.selectedTicket.titel, $scope.model.selectedTicket.description)
    };

    /**
     * Cancels the editing.
     */
    this.cancel = function () {
        $scope.switchToScreen($scope.screens.ticketlistScreen);
    };

    /**
     * Saves the changes.
     * @param editForm The form object of the ticket.
     */
    this.saveTicket = function (editForm) {
        var selected = $scope.model.selectedTicket;
        var edited = $scope.formModel.formTicket;
        if (editForm.$valid && selected && edited) {
            selected.id = edited.id;
            selected.status = edited.status;
            selected.creator = edited.creator;
            selected.currentWorker = edited.currentWorker;
            selected.createDateTimestamp = edited.createDateTimestamp;
            selected.changeDateTimestamp = edited.changeDateTimestamp;
            selected.titel = edited.titel;
            selected.description = edited.description;

            // do save data
            ticketService.saveTicketWithPromise(selected)
                .success(function (data, status, headers, config) {
                    if ($scope.model.tickets.indexOf(selected) === -1) {
                        $scope.model.tickets.push(data);
                    }
                    $scope.switchToScreen($scope.screens.ticketlistScreen);
                }).error(function (data, status, headers, config) {
                    alert("an error occured while saving");
                });
        }
    };

    /**
     * Returns the error message for the given element.
     * @param element The element.
     * @returns a string.
     */
    this.getErrorMessage = function (element) {
        var message = null;
        if (element.$error) {
            if (element.$error.required) {
                message = messages.errors.required;
            }
            /*else if (element.$error.number) {
                message = messages.errors.number;
            }
            else if (element.$error.min) {
                message = messages.errors.min;
            }
            else {
                message = messages.errors.unknown;
            }*/
        }
        return message;
    };

}]);