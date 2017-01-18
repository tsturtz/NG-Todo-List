/**
 * To-Do Controller
 */

angular.module('todoApp')

    .controller('rootCtrl', function ($mdSidenav, todoService) {

        var self = this;

        //Initiate spinner
        self.activated = true;

        //Bind todos array to Firebase through AngularFire
        self.todos = todoService.getTodos('todos');

        //Turn off spinner after data is initially loaded
        self.todos.$loaded(function (){
            self.activated = false;
        });

/*        self.addTodo = function (todo) {
            console.log('add task clicked');
            self.todos.push(self.todo);
            self.todo = {};
        };*/

        self.openLeftMenu = function () {
            $mdSidenav('left').toggle();
        };

    });