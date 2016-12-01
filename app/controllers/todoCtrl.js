/**
 * To-Do Controller
 */

angular.module('todoApp')

    .controller('todoCtrl', function ($mdSidenav) {

        self.openLeftMenu = function () {
            $mdSidenav('left').toggle();
        };

        /*self.todos = [
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
         ];*/
    });