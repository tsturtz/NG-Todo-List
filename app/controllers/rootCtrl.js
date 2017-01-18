angular.module('todoApp')

    .controller('rootCtrl', function ($mdSidenav, todoService) {

        var self = this;

        //Initiate spinner
        self.activated = true;

        //Bind todos array to Firebase through AngularFire
        self.todos = todoService.getTodos('todos');

        //Turn off spinner after data is initially loaded
        self.todos.$loaded(function (){
            self.activated = false;
        });

        //Toggle the side menu
        self.openLeftMenu = function () {
            $mdSidenav('left').toggle();
        };

    });