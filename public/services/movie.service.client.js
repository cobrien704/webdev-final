(function() {
    angular
        .module('Mooviews')
        .factory('MovieService', MovieService);

    function MovieService($http) {
        var api = {
            'getCurrentPopularMovies': getCurrentPopularMovies
        };

        return api;

        function getCurrentPopularMovies() {
            return $http.get('/api/movie/getCurrentPopularMovies');
        }
    }

})();