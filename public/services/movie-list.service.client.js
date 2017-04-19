(function() {
    angular
        .module('Mooviews')
        .factory('MovieListService', MovieListService);

    function MovieListService($http) {

        var api = {
            createList: createList,
            getMovieListsForUser: getMovieListsForUser,
            getMovieListById: getMovieListById,
            addMovieToList: addMovieToList,
            deleteList: deleteList
        };
        return api;

        function createList(userId, list) {
            return $http.post('/api/user/' + userId + '/movieList', list);
        }

        function getMovieListsForUser(userId) {
            return $http.get('/api/user/' + userId + '/movieList');
        }

        function getMovieListById(listId) {
            return $http.get('/api/movieList/' + listId);
        }

        function addMovieToList(listId, movie) {
            return $http.post('/api/movieList/' + listId, movie);
        }

        function deleteList(listId) {
            return $http.delete('/api/movieList/' + listId);
        }
    }
})();
