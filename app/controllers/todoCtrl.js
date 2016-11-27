/**
 * To-Do Controller
 */

angular.module('todoApp')

    .controller('todoCtrl', function ($mdSidenav, todoService) {

        // Create a reference to this service
        var self = this;

        self.todos = [];

        console.log('todos array before data call: ', self.todos);
        todoService.getTodos()
            .then(
                function (snapshot) {
                    console.log('snapshot in controller: ', snapshot);
                    self.todos = snapshot;
                    console.log('todos array after successful data call: ', self.todos);
                },
                function (snapshot) {
                    console.warn('fail: ', snapshot);
                });

        self.addTodo = function () {
            console.log('add task clicked');
            self.todos.push(self.todo);
            self.todo = {};
        };

        self.deleteTodo = function (todo) {
            console.log('delete task clicked');
            // Before deleting, get the index of the todo associated with the delete button that has been clicked.
            self.todos.splice(self.todos.indexOf(todo), 1);
        };

        self.editTodo = function () {
            console.log('edit task clicked');
        };

        self.setDateTodo = function () {
            console.log('date edit clicked')
        };

        self.openLeftMenu = function () {
            $mdSidenav('left').toggle();
        };

        /*self.todos = [
         {
         task: 'walk the carpet',
         date: '11/23/16'
         },
         {
         task: 'clean the trash',
         date: '11/24/16'
         },
         {
         task: 'vacuum the dog',
         date: '11/25/16'
         },
         {
         task: 'walk the lawn',
         date: '11/29/16'
         },
         {
         task: 'clean the cat',
         date: '11/23/16'
         },
         {
         task: 'vacuum the porch',
         date: '11/21/16'
         },
         {
         task: 'take out the house',
         date: '11/12/16'
         }
         ];*/
    });