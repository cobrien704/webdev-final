(function() {
    angular
        .module('Mooviews')
        .controller('LoginController', LoginController);

    function LoginController(MovieService) {
        var vm = this;
        vm.getCurrentPopularMovies = getCurrentPopularMovies;

        function init() {
            getCurrentPopularMovies();
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