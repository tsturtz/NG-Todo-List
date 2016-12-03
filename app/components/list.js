function listCtrl (todoService) {
    var self = this;

    self.todos = [];

    todoService.getTodos()
        .then(
            function (snapshot) {
                self.todos = snapshot;
                console.log('todos array after successful data call: ', self.todos);
            },
            function (snapshot) {
                console.warn('fail: ', snapshot);
            });

    self.deleteTodo = function (todo) {
        console.log('delete task clicked');
        var idx = self.todos.indexOf(todo);
        self.todos.splice(idx, 1);
        console.log(self.todos.indexOf(todo));
    };

    self.editTodo = function () {
        console.log('edit task clicked');
    };

    self.setDateTodo = function () {
        console.log('date edit clicked');
    };

}

angular.module('todoApp')

    .component('tdList', {
        templateUrl: './app/components/list.html',
        controller: listCtrl
    });