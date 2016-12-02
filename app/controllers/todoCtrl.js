/**
 * To-Do Controller
 */

angular.module('todoApp')

    .controller('todoCtrl', function ($mdSidenav, todoService) {

        var self = this;

        self.openLeftMenu = function () {
            $mdSidenav('left').toggle();
        };

        self.addTodo = function () {
            console.log('add task clicked');
            self.todos.push(self.todo);
            self.todo = {};
        };

    });