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
}

angular.module('todoApp')

    .component('list', {
        templateUrl: './app/components/list.html',
        controller: listCtrl
    });