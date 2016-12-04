/**
 * To-Do Controller
 */

angular.module('todoApp')

    .controller('rootCtrl', function ($mdSidenav, todoService) {

        var self = this;

        self.todos = [];

        //initiate preloader
        self.activated = true;

        todoService.getTodos()
            .then(
                function (snapshot) {
                    self.todos = snapshot;
                    console.log('todos array after successful data call: ', self.todos);
                    //turn off preloader
                    self.activated = false;
                },
                function (snapshot) {
                    console.warn('fail: ', snapshot);
                });

        self.addTodo = function (todo) {
            console.log('add task clicked');
            self.todos.push(self.todo);
            self.todo = {};
        };

        self.openLeftMenu = function () {
            $mdSidenav('left').toggle();
        };

    });