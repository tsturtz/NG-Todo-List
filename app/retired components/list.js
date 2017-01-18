/*
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

    self.addTodo = function (todo) {
        console.log('add task clicked');
        self.todos.push(self.todo);
        self.todo = {};
    };

    self.setDateTodo = function () {
        console.log('date edit clicked');
    };

    self.editTodo = function () {
        console.log('edit task clicked');
    };

    self.deleteTodo = function (todo) {
        console.log(todo);
        console.log(self.todos.indexOf(todo));
        var idx = self.todos.indexOf(todo);
        self.todos.splice(idx, 1);
    };

}

angular.module('todoApp')

    .component('tdList', {
        templateUrl: './app/components/list.html',
        controller: listCtrl
    });*/
