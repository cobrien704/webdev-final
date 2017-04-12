(function() {
    angular
        .module('Mooviews')
        .controller('HomeController', HomeController);

    function HomeController($routeParams, UserService, MovieService) {
        var vm = this;
        vm.getCurrentPopularMovies = getCurrentPopularMovies;

        var uid = $routeParams['uid'];

        function init() {
            getCurrentPopularMovies();
            UserService
                .findUserById(uid)
                .then(function(response) {
                    var user = response.data;

                    if (user) {
                        vm.user = user
                    } else {
                        vm.user = 'ERROR';
                    }
            });
        }
        init();

        function getCurrentPopularMovies() {
            MovieService
                .getCurrentPopularMovies()
                .then(function(response) {
                    vm.popularMovies = response.data.results;
            });
        }
    }
})();