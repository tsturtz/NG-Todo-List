function testCtrl (todoService) {
    this.whatever = [0,1,2];
}

angular.module('todoApp')
    .component('test', {
        templateUrl: './app/components/test.html',
        controller: testCtrl,
        controllerAs: 'cc'
    });