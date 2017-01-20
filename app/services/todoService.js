angular.module('todoApp')

    .service('todoService', function ($firebaseArray) {

        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyCEGQoW8RUnkoTiyFFkzOmdTIk54GpTup8",
            authDomain: "todoappdb.firebaseapp.com",
            databaseURL: "https://todoappdb.firebaseio.com",
            storageBucket: "todoappdb.appspot.com",
            messagingSenderId: "569684857503"
        };
        firebase.initializeApp(config);

        // Create a reference to this service
        var svc = this;

        svc.getTodos = function(uid){
            console.log(uid);
            var ref = firebase.database().ref().child('users/' + uid);
            console.log(ref);
            return $firebaseArray(ref);
        };

    });