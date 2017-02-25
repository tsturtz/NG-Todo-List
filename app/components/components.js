angular.module('todoApp')
    //td-list / main list content
    .component('tdList', {
        templateUrl: './app/components/list.html',
        controller: listCtrl,
        bindings: {
            todos: '<',
            user: '<',
            toggleMenu: '&',
            demo: '&'
        }
    })
    //td-list-details / list items
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
    //td-form / add form
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
 * td-list controller // main list content
 ****************************************************************************************/
function listCtrl () {
    var self = this;
    //Deletes this item and removes it from $firebaseArray (which is synced with local array)
    self.deleteTodo = function (todo) {
        self.todos.$remove(todo).then(function(ref){
            //console.log('Item removed: ', ref);
        }, function(err){
            //console.warn('Error removing item: ', err);
        });
    };
    //Updates this item's task property and saves it as a string to $firebaseArray (which is synced with local array)
    self.editTodo = function (todo, update) {
        if (update !== undefined) {
            todo.task = update;
        }
        self.todos.$save(todo).then(function(ref){
            //console.log('Item edited: ', ref);
            //console.info('Updated list: ', self.todos);
        }, function(err){
            //console.warn('Error editing item: ', err);
        });
    };
    //Updates this item's date property and saves it as a string to $firebaseArray (which is synced with local array)
    self.setDateTodo = function (todo, date) {
        date = date.toString();
        todo.date = date;
        self.todos.$save(todo).then(function(ref){
            //console.log('Item date set: ', ref);
            //console.info('Updated list: ', self.todos);
        }, function(err){
            //console.warn('Error setting date: ', err);
        });
    };
    //Call sidenav toggle function in root controller
    self.menu = function () {
        self.toggleMenu();
    };
    //Call sign in demo function in root controller
    self.loginDemo = function() {
        self.demo();
        self.toggleMenu();
    };
}
/****************************************************************************************
 * td-list-details controller // list items
 ****************************************************************************************/
function detailsCtrl ($timeout, $mdDialog, $scope) {
    var self = this;
    $scope.escape = true;
    //Get todays date for min attribute on datepicker input (can't set a past due date)
    self.todaysDate = new Date();
    //Set a half-second delay to give the ng-hide elements a chance to hide before showing the confirm edit button
    self.setDelay = function() {
        self.delay = false;
        $timeout(function(){
            self.delayed = true;
        }, 500);
    };
    //Show confirm dialog to confirm task delete.
    self.delete = function (e) {
        self.showConfirm(e);
    };
    //Set up the confirm dialog
    self.showConfirm = function(e) {
        var confirm = $mdDialog.confirm()
            .title('Are you sure?')
            .textContent('Do you really want to delete this task?')
            .ariaLabel('Confirm delete task')
            .targetEvent(e)
            .ok('Yup.')
            .cancel('Oops, no!');
        //Show dialog and then proceed to delete if confirmed. Do nothing if unconfirmed.
        $mdDialog.show(confirm).then(function() {
            //Send parameters up to listCtrl
            self.onDelete({todo: self.todo});
        });
    };
    //Send parameters up to listCtrl
    self.edit = function (update) {
        if (update === null || update === '') {
            return;
        }
        self.onEdit({todo: self.todo, update: update});
    };
    //Detect keyup while editing input, apply the edit if enter key, and set editing and focus to false if enter or escape
    self.detectKey = function (e) {
        if (e.which === 13) {
            self.edit($scope.update);
            $scope.editing = false;
            $scope.focus = false;
        } else if (e.which === 27) {
            $scope.editing = false;
            $scope.focus = false;
        }
    };
    //Send parameters up to listCtrl
    self.setDate = function (date) {
        if (date === undefined) {
            return;
        }
        self.onUpdate({todo: self.todo, date: date});
    };
}
/****************************************************************************************
 * td-form controller // add form
 ****************************************************************************************/
function formCtrl () {
    var self = this;
    self.addItem = function (todo) {
        if (todo === undefined || todo.task === '') {
            return;
        }
        //Adds this item to $firebaseArray (which is synced with local array)
        self.todos.$add(todo).then(function(){
            self.todo = {};
            //console.info('Todo added.');
        });
    };
}
