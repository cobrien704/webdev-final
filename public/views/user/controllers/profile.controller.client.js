(function() {
    angular
        .module('Mooviews')
        .controller('ProfileController', ProfileController);

    function ProfileController($location, $scope, $routeParams, UserService, MovieListService) {
        var vm = this;
        vm.userId = $routeParams['uid'];

        function init() {
            UserService
                .findUserById(vm.userId)
                .then(function(response) {
                    var user = response.data;

                    if (user) {
                        vm.user = user
                    } else {
                        vm.user = 'ERROR';
                        $location.url('/');
                    }
                });
        }
        init();

    }
})();