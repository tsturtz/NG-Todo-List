function listCtrl (todoService) {
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
}

angular.module('todoApp')

.component('list', {
    templateUrl: './app/components/list.html',
    controllerAs: lc
});