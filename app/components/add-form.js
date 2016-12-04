function formCtrl () {
    var self = this;

    //self.tdList.addTodo(this);
    console.log(todo.tdList);
}

angular.module('todoApp')

    .component('tdForm', {
        templateUrl: './app/components/add-form.html',
        controller: formCtrl,
        require: {
            tdList: '?tdList'
        },
        bindings: {
            todo: '<'
        }
    });