angular.module('todoApp')
    .service('todoService', function ($firebaseArray) {
        //Initialize Firebase
        var config = {
            apiKey: "AIzaSyCEGQoW8RUnkoTiyFFkzOmdTIk54GpTup8",
            authDomain: "todoappdb.firebaseapp.com",
            databaseURL: "https://todoappdb.firebaseio.com",
            storageBucket: "todoappdb.appspot.com",
            messagingSenderId: "569684857503"
        };
        firebase.initializeApp(config);
        var svc = this;
        //Create a firebaseArray from the currently authenticated user id
        svc.getTodos = function(uid){
            var ref = firebase.database().ref().child('users/' + uid);
            return $firebaseArray(ref);
        };

    });