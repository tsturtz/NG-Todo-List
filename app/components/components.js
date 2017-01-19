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
            date: '<',
            onDelete: '&',
            onEdit: '&',
            onUpdate: '&'
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
function listCtrl () {
    var self = this;

    self.deleteTodo = function (todo) {
        self.todos.$remove(todo).then(function(ref){
            console.log('Item removed: ', ref);
        }, function(err){
            console.warn('Error removing item: ', err);
        });
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

    self.setDateTodo = function (todo, date) {
        date = date.toString();
        todo.date = date;
        console.info(todo.date);
        console.warn(todo);
        self.todos.$save(todo).then(function(ref){
            console.log('Item date set: ', ref);
            console.info('Updated list: ', self.todos);
        }, function(err){
            console.warn('Error setting date: ', err);
        });
    };
}
/****************************************************************************************
 * td-list-details controller
 ****************************************************************************************/
function detailsCtrl () {
    var self = this;

    self.todaysDate = new Date();

    self.delete = function () {
        self.onDelete({todo: self.todo});
    };

    self.edit = function (update) {
        if (update === undefined) {
            return;
        }
        self.onEdit({todo: self.todo, update: update});
    };

    self.setDate = function (date) {
        if (date === undefined) {
            return;
        }
        self.onUpdate({todo: self.todo, date: date});
    };
}
/****************************************************************************************
 * td-form controller
 ****************************************************************************************/
function formCtrl () {
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