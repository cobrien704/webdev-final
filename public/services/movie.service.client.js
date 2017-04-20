(function() {
    angular
        .module('Mooviews')
        .factory('MovieService', MovieService);

    function MovieService($http) {

        var api = {
            'addMovieToList': addMovieToList,
            'removeMovieFromList': removeMovieFromList,
            'getCurrentPopularMovies': getCurrentPopularMovies,
            'searchMovies': searchMovies,
            'lookupMovieById': lookupMovieById
        };

        return api;

        function addMovieToList(listId, movie) {
            return $http.post('/api/movie/' + listId, movie);
        }

        function removeMovieFromList(listId, movieId) {
            return $http.delete('/api/movie/' + listId, movieId);
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