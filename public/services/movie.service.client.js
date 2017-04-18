(function() {
    angular
        .module('Mooviews')
        .factory('MovieService', MovieService);

    function MovieService($http) {

        var api = {
            'getCurrentPopularMovies': getCurrentPopularMovies,
            'searchMovies': searchMovies
        };

        return api;

        function getCurrentPopularMovies() {
            return $http.get('/api/movie/getCurrentPopularMovies');
        }

        function searchMovies(query) {
            return $http.get('/api/movie/search?query=' + query);
        }
    }

})();