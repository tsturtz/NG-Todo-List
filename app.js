angular.module('todoApp', ['ngMaterial'])

    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('amber')
            .accentPalette('grey')
            .warnPalette('red')
            .dark();
    })

    .controller('loginCtrl', function () {

    })

    .controller('taskCtrl', function () {
        var taskSelf = this;

        taskSelf.editTaask = function () {
            console.log('edit task clicked');
        };

        taskSelf.addTask = function () {
            console.log('add task clicked');
        };

        taskSelf.deleteTask = function () {
            console.log('delete task clicked');
        };

        taskSelf.todos = [
            {
                task: 'walk the carpet',
                date: '11/23/16'
            },
            {
                task: 'clean the trash',
                date: '11/24/16'
            },
            {
                task: 'vacuum the dog',
                date: '11/25/16'
            },
            {
                task: 'take out the house',
                date: '11/26/16'
            }
        ];
    });