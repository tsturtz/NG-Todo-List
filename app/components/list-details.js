function detailsCtrl () {
    var self = this;

    self.delete = function () {
        self.onDelete({todo: self.todo});
    };

    self.edit = function () {
        self.onEdit({todo: self.todo});
    };
}

angular.module('todoApp')

    .component('tdListDetails', {
        templateUrl: './app/components/list-details.html',
        controller: detailsCtrl,
        bindings: {
            todo: '<',
            onDelete: '&',
            onEdit: '&',
            setDate: '&'
        }
    });