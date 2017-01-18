/**
 * To-Do Service
 */

angular.module('todoApp')

    .service('todoService', function ($firebaseArray, $q) {

        /**
         * Initialize Firebase
         * @type {{apiKey: string, authDomain: string, databaseURL: string, storageBucket: string, messagingSenderId: string}}
         */

        var config = {
            apiKey: "AIzaSyCEGQoW8RUnkoTiyFFkzOmdTIk54GpTup8",
            authDomain: "todoappdb.firebaseapp.com",
            databaseURL: "https://todoappdb.firebaseio.com",
            storageBucket: "todoappdb.appspot.com",
            messagingSenderId: "569684857503"
        };
        firebase.initializeApp(config);

        // Create a reference to Firebase Database
        var fb = firebase.database();

        // Create a reference to this service
        var self = this;

        self.getTodos = function(where){
            var ref = firebase.database().ref().child(where);
            return $firebaseArray(ref);
        };

        self.addTodo = function (todo) {
            var defer = $q.defer();
            console.log('todo passed into service: ', todo);
            fb.ref('todos').once('value', function(snapshot) {
                console.log('snapshot from service: ', snapshot.val());
                fb.ref('todos/' + snapshot.val().length).set(todo);
                defer.resolve(snapshot.val());
            });
            return defer.promise;
        };

    });