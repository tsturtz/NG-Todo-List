angular.module('todoApp')
    .controller('rootCtrl', function ($mdSidenav, $mdToast, todoService, fbFactory) {
        var self = this;
        //Initialize local array
        self.todos = [];
        //Toggle the side menu
        self.openLeftMenu = function () {
            $mdSidenav('left').toggle();
        };

        /****************************************************************************************
         * firebaseAuth // AngularFire user authentication
         ****************************************************************************************/

        //$firebaseAuth reference
        var auth = fbFactory;

        //Sync local array with user and watch for authenticated user changes (signing in/out)
        auth.$onAuthStateChanged(function(firebaseUser) {
            self.firebaseUser = firebaseUser;
            //Initiate spinner
            self.activated = true;
            if (firebaseUser === null) {
                //Empty local todos array to reveal card content
                self.todos = [];
                //Resolve spinner
                self.activated = false;
            } else {
                //Bind todos array to currently logged in user
                self.todos = todoService.getTodos(firebaseUser.uid);
                //Resolve spinner after data is loaded
                self.todos.$loaded(function (){
                    self.activated = false;
                });
            }
        });

        //Sign In as Demo
        self.signInDemo = function() {
            self.message = null;
            self.error = null;
            //Initiate spinner
            self.loginSpinner = true;
            try {
                auth.$signInWithEmailAndPassword('demo@demo.com', 'pass123').then(function(firebaseUser) {
                    self.message = firebaseUser.uid;
                    //console.log(firebaseUser);
                    //console.log(self.message);
                    //Resolve spinner
                    self.loginSpinner = false;
                    //Show success message in a md-toast
                    self.showToastyToast('Logged in with email: demo@demo.com');
                    //Clear form inputs
                    self.email = '';
                    self.password = '';
                }).catch(function(error) {
                    self.error = error;
                    //console.log(error);
                    //Resolve spinner
                    self.loginSpinner = false;
                    //Show error message in a md-toast
                    self.showToastyToast(self.error.message);
                });
            }
            catch(err) {
                //Resolve spinner
                self.loginSpinner = false;
                //Show error message in a md-toast
                self.showToastyToast('There was a problem logging in with the demo account.');
                //console.log(err);
            }
        };

        //Create New User
        self.createUser = function() {
            self.message = null;
            self.error = null;
            self.loginSpinner = true;
            try {
                auth.$createUserWithEmailAndPassword(self.email, self.password).then(function(firebaseUser) {
                    self.message = firebaseUser.uid;
                    self.loginSpinner = false;
                    self.showToastyToast('User created with email: ' + self.email);
                    self.email = '';
                    self.password = '';
                }).catch(function(error) {
                    self.error = error;
                    //console.log(error);
                    self.loginSpinner = false;
                    self.showToastyToast(self.error.message);
                });
            }
            catch(err) {
                self.loginSpinner = false;
                self.showToastyToast('You need to feed me your email and password.');
                //console.log(err);
            }
        };

        //User Log In
        self.loginUser = function() {
            self.message = null;
            self.error = null;
            self.loginSpinner = true;
            try {
                auth.$signInWithEmailAndPassword(self.email, self.password).then(function(firebaseUser) {
                    self.message = firebaseUser.uid;
                    self.loginSpinner = false;
                    self.showToastyToast('User logged in with email: ' + self.email);
                    self.email = '';
                    self.password = '';
                }).catch(function(error) {
                    //self.error = error;
                    //console.log(error);
                    self.loginSpinner = false;
                    self.showToastyToast('Invalid email or password');
                });
            }
            catch(err) {
                self.loginSpinner = false;
                self.showToastyToast('You need to feed me your email and password.');
                //console.log(err);
            }
        };

        //Google User Log In
        self.googleUserLogin = function() {
            self.message = null;
            self.error = null;
            self.loginSpinner = true;
            try {
                auth.$signInWithPopup('google').then(function(result) {
                    self.message = result.user.uid;
                    self.loginSpinner = false;
                    self.showToastyToast('You are now logged in through Google.');
                }).catch(function(error) {
                    self.error = error;
                    //console.log(error);
                    self.loginSpinner = false;
                    self.showToastyToast(self.error.message);
                });
            }
            catch(err) {
                self.loginSpinner = false;
                self.showToastyToast('Something went wrong logging in through Google.');
                //console.log(err);
            }
        };

        //Sign out currently logged in user
        self.signOut = function () {
            auth.$signOut().then(function () {
                self.loginSpinner = false;
                self.showToastyToast('Successfully logged out.');
            }).catch(function(error) {
                self.loginSpinner = false;
                self.showToastyToast(error);
            });
        };

        //Reset password - send user an email to reset their password
        self.resetPassword = function () {
            self.loginSpinner = true;
            try {
                auth.$sendPasswordResetEmail(self.emailForReset).then(function() {
                    self.loginSpinner = false;
                    self.showToastyToast('Reset password email has been sent.');
                }).catch(function(error) {
                    self.error = error;
                    //console.log(error);
                    self.loginSpinner = false;
                    self.showToastyToast(self.error.message);
                });
            }
            catch(err) {
                self.loginSpinner = false;
                self.showToastyToast('Something went wrong sending the reset password email.');
                //console.log(err);
            }
        };

        // CURRENTLY DISABLED //
        //Delete account of currently logged in user (also logs them out)
        self.deleteAcct = function () {
            self.loginSpinner = true;
            try {
                auth.$deleteUser().then(function() {
                    self.loginSpinner = false;
                    self.showToastyToast('Account successfully deleted.');
                }).catch(function(error) {
                    self.error = error;
                    //console.log(error);
                    self.loginSpinner = false;
                    self.showToastyToast(self.error.message);
                });
            }
            catch(err) {
                self.loginSpinner = false;
                self.showToastyToast('Something went wrong sending the reset password email.');
                //console.log(err);
            }
        };

        /****************************************************************************************
         * md-toast // toast message configuration
         ****************************************************************************************/

        //Define toast position
        self.toastPos = {
            bottom: false,
            top: true,
            left: true,
            right: false
        };
        self.toastPosition = angular.extend({}, self.toastPos);
        //Get toast position
        self.getToastPosition = function() {
            return Object.keys(self.toastPosition)
                .filter(function(pos) { return self.toastPosition[pos]; })
                .join(' ');
        };
        //Show toast
        self.showToastyToast = function(toastyText) {
            var pinTo = self.getToastPosition();
            var toast = $mdToast.simple()
                .textContent(toastyText)
                .position(pinTo)
                .action('OK')
                .highlightAction(true)
                .highlightClass('md-primary');
            $mdToast.show(toast);
        };
        //Close toast
        self.closeToast = function() {
            $mdToast.hide();
        };
    });
