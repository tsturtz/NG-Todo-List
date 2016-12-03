function detailsCtrl () {
    var self = this;

    self.deleteTodo = function () {
        self.onDelete({todo: self.todo});
    };
}

angular.module('todoApp')

    .component('tdListDetails', {
        templateUrl: './app/components/list-details.html',
        controller: detailsCtrl,
        bindings: {
            todo: '<',
            onDelete: '&'
        }
    });