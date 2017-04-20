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
                        $location.url('/user/' + user._id + '/activity');
                    } else {
                        vm.error = 'User not found';
                    }
                });
        }
    }
})();