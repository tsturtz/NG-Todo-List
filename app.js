angular.module('todoApp', ['ngMaterial'])

    //configs

    .config(function($mdAriaProvider) {
        $mdAriaProvider.disableWarnings();
    })

    .config(function ($mdThemingProvider) {
        $mdThemingProvider.definePalette('white', {
            '50': '#fff',
            '100': '#fff',
            '200': '#fff',
            '300': '#fff',
            '400': '#fff',
            '500': '#fff',
            '600': '#fff',
            '700': '#fff',
            '800': '#fff',
            '900': '#fff',
            'A100': '#fff',
            'A200': '#fff',
            'A400': '#fff',
            'A700': '#fff',
            'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                                // on this palette should be dark or light
            'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
                '200', '300', '400', 'A100'],
            'contrastLightColors': undefined    // could also specify this if default was 'dark'
        });
        $mdThemingProvider.theme('default')
            .primaryPalette('indigo', {'default': '400'})
            .accentPalette('teal', {'default': '500'})
            .warnPalette('red', {'default': 'A200'})
            .dark();
        $mdThemingProvider.theme('add')
            .primaryPalette('white')
    })

    //controllers

    .controller('todoCtrl', function ($mdSidenav) {
        var self = this;

        self.todos = [];

        self.editTask = function () {
            console.log('edit task clicked');
        };

        self.addTask = function () {
            console.log('add task clicked');
            self.todos.push(self.todo);
            self.todo = {};
        };

        self.deleteTask = function (index) {
            console.log('delete task clicked');
            self.todos.splice(index,1);
        };

        self.openLeftMenu = function() {
            $mdSidenav('left').toggle();
        };

        self.todos = [
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
                task: 'walk the lawn',
                date: '11/29/16'
            },
            {
                task: 'clean the cat',
                date: '11/23/16'
            },
            {
                task: 'vacuum the porch',
                date: '11/21/16'
            },
            {
                task: 'take out the house',
                date: '11/12/16'
            }
        ];
    });