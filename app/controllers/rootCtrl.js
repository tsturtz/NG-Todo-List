angular.module('todoApp')

    .controller('rootCtrl', function ($mdSidenav, $mdToast, todoService, fbFactory) {

        var self = this;

        var auth = fbFactory;

        //Initiate spinner
        self.activated = true;

        //Watch for authenticated user changes (signing in/out)
        auth.$onAuthStateChanged(function(firebaseUser) {
            self.firebaseUser = firebaseUser;
            if (firebaseUser === null) {
                //Bind todos array to default user
                self.todos = todoService.getTodos('default');
                //Turn off spinner after data is loaded
                self.todos.$loaded(function (){
                    self.activated = false;
                });
            } else {
                //Bind todos array to currently logged in user
                self.todos = todoService.getTodos(firebaseUser.uid);

                //Turn off spinner after data is loaded
                self.todos.$loaded(function (){
                    self.activated = false;
                });
            }
        });

        //Sign out
        self.signOut = function () {
            auth.$signOut().then(function () {
                self.showToastyToast('Successfully logged out.');
            }).catch(function(error) {
                self.showToastyToast(error);
            })
        };

        //Sign In
        self.signInAnon = function() {
            self.firebaseUser = null;
            self.error = null;
            auth.$signInAnonymously().then(function(firebaseUser) {
                self.firebaseUser = firebaseUser;
                console.info('anon user id: ' + self.firebaseUser.uid);
                self.showToastyToast('Signed in anonymously.');
            }).catch(function(error) {
                self.error = error;
                self.showToastyToast(self.error);
            });
        };

        //Create New User
        self.createUser = function() {
            self.message = null;
            self.error = null;
            try {
                auth.$createUserWithEmailAndPassword(self.email, self.password).then(function(firebaseUser) {
                    self.message = firebaseUser.uid;
                    console.log(firebaseUser);
                    console.log(self.message);
                    self.showToastyToast('User created with email: ' + self.email);
                    self.email = '';
                    self.password = '';
                }).catch(function(error) {
                    self.error = error;
                    console.log(error);
                    self.showToastyToast(self.error.message);
                });
            }
            catch(err) {
                self.showToastyToast('You need to feed me your email and password.');
                console.log(err);
            }
        };

        //User Log In
        self.loginUser = function() {
            self.message = null;
            self.error = null;
            try {
                auth.$signInWithEmailAndPassword(self.email, self.password).then(function(firebaseUser) {
                    self.message = firebaseUser.uid;
                    console.log(firebaseUser);
                    console.log(self.message);
                    self.showToastyToast('User logged in with email: ' + self.email);
                    self.email = '';
                    self.password = '';
                }).catch(function(error) {
                    self.error = error;
                    console.log(error);
                    self.showToastyToast(self.error.message);
                });
            }
            catch(err) {
                self.showToastyToast('You need to feed me your email and password.');
                console.log(err);
            }
        };

        //Google User Log In
        self.googleUserLogin = function() {
            self.message = null;
            self.error = null;
            try {
                auth.$signInWithPopup('google').then(function(result) {
                    self.message = result.user.uid;
                    console.log(result);
                    console.log(self.message);
                    self.showToastyToast('You are now logged in through Google.');
                }).catch(function(error) {
                    self.error = error;
                    console.log(error);
                    self.showToastyToast(self.error.message);
                });
            }
            catch(err) {
                self.showToastyToast('Something went wrong logging in through Google.');
                console.log(err);
            }
        };

        // TOAST!
        self.toastPos = {
            bottom: false,
            top: true,
            left: true,
            right: false
        };
        self.toastPosition = angular.extend({}, self.toastPos);
        self.getToastPosition = function() {
            return Object.keys(self.toastPosition)
                .filter(function(pos) { return self.toastPosition[pos]; })
                .join(' ');
        };
        self.showToastyToast = function(paramText) {
            console.log(paramText);
            var pinTo = self.getToastPosition();
            var toast = $mdToast.simple()
                .textContent(paramText)
                .position(pinTo);
            $mdToast.show(toast)
        };
        self.closeToast = function() {
            $mdToast.hide();
        };

        /*//Initiate spinner
        self.activated = true;

        //Bind todos array to Firebase through AngularFire
        self.todos = todoService.getTodos('todos');

        //Turn off spinner after data is initially loaded
        self.todos.$loaded(function (){
            self.activated = false;
        });*/

        //Toggle the side menu
        self.openLeftMenu = function () {
            $mdSidenav('left').toggle();
        };

    });