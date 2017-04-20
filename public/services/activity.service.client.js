(function() {
    angular
        .module('Mooviews')
        .factory('ActivityService', ActivityService);

    function ActivityService($http) {

        var api = {
            'createActivity'     : createActivity,
            'getActivityForUser' : getActivityForUser,
            'getActivityById'    : getActivityById
        };
        return api;

        function createActivity(userId, activity) {
            return $http.post('/api/user/' + userId + '/activity', activity);
        }

        function getActivityForUser(userId) {
            return $http.get('/api/user/' + userId + '/activity');
        }

        function getActivityById(activityId) {
            return $http.get('/api/activity/' + activityId);
        }
    }
})();