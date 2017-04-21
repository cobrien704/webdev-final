(function() {
    angular
        .module('Mooviews')
        .controller('AdminController', AdminController);

    function AdminController($location, $scope, $rootScope, $routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.deleteUser = deleteUser;

        function init() {
            $('#successAlert').hide();
            $('#dangerAlert').hide();

            UserService
                .findUserById(vm.userId)
                .then(function(response) {
                    var user = response.data;

                    if (user) {
                        vm.user = user;
                    } else {
                        vm.user = 'ERROR';
                        $location.url('/');
                    }
                });

            UserService
                .findAllUsers()
                .then(function(response) {
                    var users = response.data;

                    if (users) {
                        vm.users = users
                    } else {
                        vm.user = 'ERROR';
                        $location.url('/');
                    }
                });
        }
        init();

        function deleteUser(userId) {
            UserService
                .deleteUser(userId)
                .success(function () {
                    var successAlert = $('#successAlert');
                    successAlert.html("<strong>Success!</strong> User(" + userId + ") deleted.");
                    successAlert.show();
                    $('html,body').animate({scrollTop: 0}, 'slow');

                    setTimeout(function () {
                        $('#successAlert').hide();
                    }, 10000);
                })
                .error(function () {
                    var dangerAlert = $('#dangerAlert');
                    dangerAlert.html("<strong>Error!</strong> whoops.... something went wrong");
                    dangerAlert.show();
                    $('html,body').animate({ scrollTop: 0 }, 'slow');

                    setTimeout(function(){
                        $('#dangerAlert').hide();
                    }, 10000);
                });
        }
    }
})();
