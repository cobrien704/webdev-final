(function() {
    angular
        .module('Mooviews')
        .controller('LoginController', LoginController);

    function LoginController($location, $rootScope, UserService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            UserService
                .findUserByEmail(user.email)
                .then(function(response) {
                    var user = response.data;

                    if (user) {
                        $location.url('/home/' + user._id);
                    } else {
                        vm.error = 'User not found';
                    }
                });
        }
    }
})();