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
            unknown: 'Please enter a valid value!'
            //brauchen wir die?
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
     * Speichern
     * @param editForm
     */
    this.saveTicket = function (editForm) {
        var selected = $scope.model.selectedTicket;
        var edited = $scope.formModel.formTicket;
        if (editForm.$valid && selected && edited) {
            selected.id = edited.id;
            selected.status = $scope.selectedOption.id - 1;
            if($scope.selectedOption.id == 1) {selected.creator = getLoginName();}
            //nur beim 1. Anlegen (also status = angelegt), soll der creator gesetzt werden
            selected.currentWorker = $scope.selectedOption.id == 2 ? getLoginName(): null;
            //wenn das Ticket in den Status "in Bearbeitung" überführt wird, ist der Bearbeiter = LoginName und sonst null
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