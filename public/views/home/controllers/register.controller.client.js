(function() {
    angular
        .module('Mooviews')
        .controller('RegisterController', RegisterController);

    function RegisterController($location, $rootScope, UserService) {
        var vm = this;
        vm.register = register;

        function register(user) {
            UserService
                .createUser(user)
                .then(function(response) {
                    $location.url('/');
                });
        }

        $('.datepicker').datepicker({
            format: 'mm/dd/yyyy',
            startDate: '-3d'
        })
    }
})();