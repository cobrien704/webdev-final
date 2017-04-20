(function() {
    angular
        .module('Mooviews')
        .factory('UserService', UserService);

    function UserService($http) {

        var api = {
            'createUser'      : createUser,
            'findUserByEmail' : findUserByEmail,
            'findUserById'    : findUserById,
            'findUserByQuery' : findUserByQuery,
            'followUser'      : followUser
        };
        return api;

        function createUser(newUser) {
            return $http.post('/api/user', newUser);
        }

        function findUserByEmail(email) {
            return $http.get('/api/user?email=' + email);
        }

        function findUserById(id) {
            return $http.get('/api/user?id=' + id);
        }

        function findUserByQuery(query) {
            return $http.get('/api/user?query=' + query);
        }

        function followUser(userId, followUserId) {
            return $http.post('/api/'+ userId + '/follow/' + followUserId);
        }
    }
})();
