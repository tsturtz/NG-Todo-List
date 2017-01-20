angular.module('todoApp')

    .factory('fbFactory', ['$firebaseAuth',
        function ($firebaseAuth) {
            return $firebaseAuth();
        }
    ]);