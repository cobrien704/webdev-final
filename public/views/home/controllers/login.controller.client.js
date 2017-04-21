(function() {
    angular
        .module('Mooviews')
        .controller('LoginController', LoginController);

    function LoginController($location, $rootScope, UserService) {
        var vm = this;
        vm.login = login;

        $('#dangerAlert').hide();

        function login(user) {
            UserService
                .login(user)
                .success(function(response) {
                    var user = response.data;

                    $rootScope.currentUser = user;
                    if (user) {
                        $location.url('/user/' + user._id + '/activity');
                    }
                }).error(function() {
                    var dangerAlert = $('#dangerAlert');
                    dangerAlert.html("<strong>Error!</strong> Invalid credentials!");
                    dangerAlert.show();
                    $('html,body').animate({ scrollTop: 0 }, 'slow');

                    setTimeout(function(){
                        $('#dangerAlert').hide();
                    }, 10000);
                });
        }
    }
})();