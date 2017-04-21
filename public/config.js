(function() {
    angular
        .module('Mooviews')
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/templates/login.view.client.html',
                controller: 'LoginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: 'views/home/templates/register.view.client.html',
                controller: 'RegisterController',
                controllerAs: 'model'
            })
            .when('/user/:uid/activity', {
                templateUrl: 'views/user/templates/activity.view.client.html',
                controller: 'ActivityController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedin }
            })
            .when('/user/:uid/discover', {
                templateUrl: 'views/user/templates/discover.view.client.html',
                controller: 'DiscoverController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedin }
            })
            .when('/user/:uid/lists', {
                templateUrl: 'views/user/templates/lists.view.client.html',
                controller: 'ListsController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedin }
            })
            .when('/user/:uid/lists/:fid/', {
                templateUrl: 'views/publicViews/templates/publiclists.view.client.html',
                controller: 'PublicListsController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedin }
            })
            .when('/user/:uid/movie/:mid', {
                templateUrl: 'views/user/templates/movie-details.view.client.html',
                controller: 'MovieDetailsController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedin }
            })
            .when('/user/:uid/profile', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'ProfileController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedin }
            })
            .when('/user/:uid/admin', {
                templateUrl: 'views/user/templates/admin.view.client.html',
                controller: 'AdminController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedin }
            })
    }

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/api/loggedin').success(function(user) {
            $rootScope.errorMessage = null;
            if (user !== '0') {
                $rootScope.currentUser = user;
                deferred.resolve();
            } else {
                deferred.reject();
                $location.url('/');
            }
        });
        return deferred.promise;
    };
})();