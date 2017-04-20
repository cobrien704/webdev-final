(function() {
    angular
        .module('Mooviews')
        .factory('MovieService', MovieService);

    function MovieService($http) {

        var api = {
            'createMovie': createMovie,
            'getCurrentPopularMovies': getCurrentPopularMovies,
            'searchMovies': searchMovies,
            'lookupMovieById': lookupMovieById
        };

        return api;

        function createMovie(listId, movie) {
            return $http.post('/api/movie/' + listId, movie);
        }

        function getCurrentPopularMovies() {
            return $http.get('/api/movie/getCurrentPopularMovies');
        }

        function searchMovies(query) {
            return $http.get('/api/movie/search?query=' + query);
        }

        function lookupMovieById(id) {
            return $http.get('/api/movie/' + id);
        }
    }

})();