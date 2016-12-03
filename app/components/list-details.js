function detailsCtrl (todoService) {
    var self = this;

    self.deleteTodo = function (todo) {
        console.log('delete task clicked');
        // Before deleting, get the index of the to-do associated with the delete button that has been clicked.
        self.todos.splice(self.todos.indexOf(todo), 1);
    };

    self.editTodo = function () {
        console.log('edit task clicked');
    };

    self.setDateTodo = function () {
        console.log('date edit clicked');
    };
}

angular.module('todoApp')

    .component('listDetails', {
        templateUrl: './app/components/list-details.html',
        controller: detailsCtrl,
        bindings: {
            listDetails: '<'
        }
    });