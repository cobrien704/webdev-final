(function() {
    angular
        .module('Mooviews')
        .factory('MovieListService', MovieListService);

    function MovieListService($http) {

        var api = {
            createList: createList,
            getMovieListsForUser: getMovieListsForUser,
            deleteList: deleteList
        };
        return api;

        function createList(userId, list) {
            return $http.post('/api/user/' + userId + '/movieList', list);
        }

        function getMovieListsForUser(userId) {
            return $http.get('/api/user/' + userId + '/movieList');
        }

        function deleteList(listId) {
            return $http.delete('/api/movieList/' + listId);
        }
    }
})();
