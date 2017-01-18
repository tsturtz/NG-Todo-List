angular.module('todoApp')
    //td-list
    .component('tdList', {
        templateUrl: './app/components/list.html',
        controller: listCtrl,
        bindings: {
            todos: '<'
        }
    })
    //td-list-details
    .component('tdListDetails', {
        templateUrl: './app/components/list-details.html',
        controller: detailsCtrl,
        bindings: {
            todo: '<',
            update: '<',
            onDelete: '&',
            onEdit: '&',
            setDate: '&'
        }
    })
    //td-form
    .component('tdForm', {
        templateUrl: './app/components/add-form.html',
        controller: formCtrl,
        bindings: {
            todos: '<',
            todo: '<',
            onAdd: '&'
        }
    });

/****************************************************************************************
 * td-list controller
 * @param todoService
 ****************************************************************************************/
function listCtrl (todoService) {
    var self = this;

    self.setDateTodo = function () {
        console.log('date edit clicked');
    };

    self.editTodo = function (todo, update) {
        todo.task = update;
        self.todos.$save(todo).then(function(ref){
            console.log('Item edited: ', ref);
            console.info('Updated list: ', self.todos);
        }, function(err){
            console.warn('Error editing item: ', err);
        });
    };

    self.deleteTodo = function (todo) {
        self.todos.$remove(todo).then(function(ref){
            console.log('Item removed: ', ref);
        }, function(err){
            console.warn('Error removing item: ', err);
        });
    };

}
/****************************************************************************************
 * td-list-details controller
 ****************************************************************************************/
function detailsCtrl () {
    var self = this;

    self.delete = function () {
        self.onDelete({todo: self.todo});
    };

    self.edit = function (update) {
        if (update === undefined) {
            return;
        }
        self.onEdit({todo: self.todo, update: update});
    };
}
/****************************************************************************************
 * td-form controller
 ****************************************************************************************/
function formCtrl (todoService) {
    var self = this;

    self.addItem = function (todo) {
        todo.checked = false;
        todo.date = null;
        console.log(todo);
        console.info(self.todos);
        self.todos.$add(todo).then(function(){
            self.todo = {};
            console.info('Todo added!');
        });
        console.info(self.todos);
    };
}