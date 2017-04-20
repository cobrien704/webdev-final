(function() {
    angular
        .module('Mooviews')
        .controller('MovieDetailsController', MovieDetailsController);

    function MovieDetailsController($location, $scope, $routeParams, UserService, MovieService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.movieId = $routeParams['mid'];

        function init() {

            MovieService
                .lookupMovieById(vm.movieId)
                .success(function (data) {
                    vm.movie = data;
                });
        }
        init();

    }
})();