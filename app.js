angular.module('todoApp', ['ngMaterial'])

.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('amber')
        .accentPalette('indigo')
        .warnPalette('red')
        .dark();
})

.controller('loginCtrl', function() {

})

.controller('taskCtrl', function () {
    var taskSelf = this;

    taskSelf.addTask = function () {
        console.log ('add task clicked')
    };

/*    taskSelf.tasks = [
        item: {
        task: 'kill kevin'
        }
    ];*/
});