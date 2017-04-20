(function() {
    angular
        .module('Mooviews')
        .controller('MovieDetailsController', MovieDetailsController);

    function MovieDetailsController($location, $scope, $routeParams, UserService, MovieService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.movieId = $routeParams['mid'];

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

            MovieService
                .lookupMovieById(vm.movieId)
                .success(function (data) {
                    vm.movie = data;
                });
        }
        init();

    }
})();