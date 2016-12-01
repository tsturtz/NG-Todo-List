/**
 * To-Do Controller
 */

angular.module('todoApp')

    .controller('todoCtrl', function ($mdSidenav, todoService) {

        var self = this;

        self.openLeftMenu = function () {
            $mdSidenav('left').toggle();
        };

    });