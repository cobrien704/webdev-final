(function() {
    angular
        .module('Mooviews')
        .controller('ListsController', ListsController);

    function ListsController($location, $rootScope, MovieService) {
        var vm = this;
        vm.searchMovies = searchMovies;

        function searchMovies(query) {
            MovieService
                .searchMovies(query)
                .then(function (response) {
                    vm.movies = response.data.results;
                });
        }

    }
})();