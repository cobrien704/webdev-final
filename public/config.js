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
                controllerAs: 'model'
            })
            .when('/user/:uid/discover', {
                templateUrl: 'views/user/templates/discover.view.client.html',
                controller: 'DiscoverController',
                controllerAs: 'model'
            })
            .when('/user/:uid/lists', {
                templateUrl: 'views/user/templates/lists.view.client.html',
                controller: 'ListsController',
                controllerAs: 'model'
            })
            .when('/user/:uid/movie/:mid', {
                templateUrl: 'views/user/templates/movie-details.view.client.html',
                controller: 'MovieDetailsController',
                controllerAs: 'model'
            })
    }
})();