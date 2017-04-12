(function() {
    angular
        .module('Mooviews')
        .factory('UserService', UserService);

    function UserService($http) {

        var api = {
            'createUser'      : createUser,
            'findUserByEmail' : findUserByEmail,
            'findUserById'    : findUserById
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
    }
})();