/**
 * The controllers.
 */
'use strict';

var controllers = angular.module('controllers', ['resources', 'services']);

//Controller, um zwischen den Seiten hin und her zu springen!
//Set up main controller.
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
     * Returns the file name of the current screen.
     * @returns a string.
     */
    this.getCurrentScreenSource = function () {
        return $scope.model.screen[1];
    };
}]);

//mainScreenController
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
    this.registration = function () {
        $scope.switchToScreen($scope.screens.registrationScreen);
    };
    this.login = function () {
        $scope.switchToScreen($scope.screens.ticketlistScreen);
    }

}]);


//TODO: ListController anlegen mit den n�tigen Methoden
// Set up the list controller.
controllers.controller('listController', ['$scope', 'Ticket', 'ticketService', function ($scope, Ticket, ticketService) {
    $scope.sortType     = 'number'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order

    /**
     * Starts the editing of the ticket.
     * @param selected The ticket to be edited.
     */
    this.editTicket = function (selected) {
        $scope.model.selectedTicket = selected;
        $scope.switchToScreen($scope.screens.editScreen);
    };

    /**
     * Starts the creation of a new ticket.
     */
    this.newTicket = function () {
        $scope.model.selectedTicket = new Ticket();
        $scope.switchToScreen($scope.screens.editScreen);
    };

    // List the current tickets.
    ticketService.listTicketsWithPromise()
        .success(function (data, status, headers, config) {
            $scope.model.tickets = data;
        })
        .error(function (data, status, headers, config) {
            alert("an error occured while loading");
        });
}]);


//Set up the registration controller.
controllers.controller('regController', ['$scope', 'Developer', 'developerService', function ($scope, Developer, developerService) {
    var messages = {
        errors: {
            required: 'Please enter a value!',
            unknown: 'Please enter a valid value!'
        }
    };
    /**
     * cancel
     */
    this.start = function () {
        $scope.switchToScreen($scope.screens.startScreen);
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
            } else {
                message = messages.errors.unknown;
            }
        }
        return message;
    };

}]);


//TODO!! F�r Edit / Create
// Set up the form controller.
controllers.controller('formController', ['$scope', 'Ticket', 'ticketService', 'Commentary', function ($scope, Ticket, ticketService, Commentary, $http) {
    // Object containing the error messages.
    var messages = {
        errors: {
            required: 'Pflichtfeld!'
        }
    };

    //TODO
       // Auswahlfelder für den Ticketstatus
    /* if ($scope.model.selectedTicket.status == null) {
     $scope.stateOptions = [{name: "Angelegt", id: 1}];
     } else if ($scope.model.selectedTicket.status == 1) {
     $scope.stateOptions = [{name: "In Bearbeitung", id: 2}];
     } else if ($scope.model.selectedTicket.status == 2) {
     $scope.stateOptions = [{name: "Behoben", id: 3}, {name: "Abgelehnt", id: 4}];
     } else if ($scope.model.selectedTicket.status == 3 || $scope.mocel.selectedTicket.status == 4) {
     $scope.stateOptions = [{name: "Geschlossen", id: 6}, {name: "Wiedereroeffnet", id: 5}];
     } else if ($scope.model.selectedTicket.status == 5) {
     $scope.stateOptions = [{name: "In Bearbeitung", id: 2}];
     }
     $scope.selectedOption = $scope.stateOptions[0];*/
    $scope.stateOptions = [{name: "Angelegt", id: 1}, {name: "In Bearbeitung", id: 2}, {
        name: "Behoben",
        id: 3
    }, {name: "Abgelehnt", id: 4}, {name: "Wiedereroeffnet", id: 5}, {name: "Geschlossen", id: 6}];
    $scope.selectedOption = $scope.stateOptions[0];

    // Set up the form model. //TODO angucken
    $scope.formModel = {
        isEdit: $scope.model.selectedTicket.titel && $scope.model.selectedTicket.description,
        formTicket: new Ticket($scope.model.selectedTicket.id, $scope.model.selectedTicket.titel, $scope.model.selectedTicket.status,
            $scope.model.selectedTicket.description, $scope.model.selectedTicket.creator, $scope.model.selectedTicket.currentWorker,
            $scope.model.selectedTicket.createDateTimestamp, $scope.model.selectedTicket.changeDateTimestamp, $scope.model.selectedTicket.commentaryList
        )
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
            selected.status = $scope.selectedOption.id - 1;
            selected.creator = edited.currentWorker ? edited.currentWorker : getLoginName();
            selected.currentWorker = selected.status == $scope.selectedOption.id - 1 ? "": getLoginName(); //TODO Status hier mit reinziehen
            selected.changeDateTimestamp = (new Date()).toJSON().slice(0, 10);
            selected.titel = edited.titel;
            selected.description = edited.description;
            var commentary = new Commentary(null, edited.id, document.getElementById("commentaryID").value, getLoginName(), (new Date()).toJSON().slice(0, 10));
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
        }
        return message;
    };

}]);