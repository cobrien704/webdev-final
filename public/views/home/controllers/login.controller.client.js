(function() {
    angular
        .module('Mooviews')
        .controller('LoginController', LoginController);

    function LoginController($location, $rootScope, UserService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            UserService
                .login(user)
                .then(function(response) {
                    var user = response.data;
                    $rootScope.currentUser = user;
                    if (user) {
                        $location.url('/user/' + user._id + '/activity');
                    } else {
                        vm.error = 'User not found';
                    }
                });
        }
    }
})();