angular.module('todoApp')
    //td-list
    .component('tdList', {
        templateUrl: './app/components/list.html',
        controller: listCtrl,
        bindings: {
            todos: '<',
            user: '<',
            toggleMenu: '&'
        }
    })
    //td-list-details
    .component('tdListDetails', {
        templateUrl: './app/components/list-details.html',
        controller: detailsCtrl,
        bindings: {
            todo: '<',
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
            user: '<',
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
        if (update !== undefined) {
            todo.task = update;
        }
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
    //Call sidenav toggle function in root controller
    self.menu = function () {
        self.toggleMenu();
    };
}
/****************************************************************************************
 * td-list-details controller
 ****************************************************************************************/
function detailsCtrl ($timeout) {
    var self = this;
    //Get todays date for min attribute on datepicker input (can't set a past due date)
    self.todaysDate = new Date();
    //Send parameters up to listCtrl
    self.delete = function () {
        self.onDelete({todo: self.todo});
    };
    //Send parameters up to listCtrl
    self.edit = function (update) {
        self.onEdit({todo: self.todo, update: update});
    };
    //Send parameters up to listCtrl
    self.setDate = function (date) {
        if (date === undefined) {
            return;
        }
        console.log(date);
        self.onUpdate({todo: self.todo, date: date});
    };
}
/****************************************************************************************
 * td-form controller
 ****************************************************************************************/
function formCtrl () {
    var self = this;
    self.addItem = function (todo) {
        console.log(todo);
        console.info(self.todos);
        if (todo === undefined) {
            return;
        }
        self.todos.$add(todo).then(function(){
            self.todo = {};
            console.info('Todo added!');
        });
        console.info(self.todos);
    };
}