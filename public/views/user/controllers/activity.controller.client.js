(function() {
    angular
        .module('Mooviews')
        .controller('ActivityController', ActivityController);

    function ActivityController($routeParams, UserService, MovieService, MovieListService, ActivityService) {
        var vm = this;
        vm.getCurrentPopularMovies = getCurrentPopularMovies;

        var uid = $routeParams['uid'];

        function init() {
            getCurrentPopularMovies();
            UserService
                .findUserById(uid)
                .then(function(response) {
                    var user = response.data;

                    if (user) {
                        vm.user = user;
                        generateFeed();
                    } else {
                        vm.user = 'ERROR';
                        $location.url('/');
                    }
            });


        }
        init();

        function generateFeed() {
            vm.feed = [];

            vm.user.activity.forEach(function (activityId) {
                ActivityService
                    .getActivityById(activityId)
                    .then(function (activity) {
                        var feedItem = activity.data;
                        UserService
                            .findUserById(feedItem._user)
                            .then(function (user) {
                                feedItem.user = user.data;

                                if (feedItem.type === 'CREATE') {
                                    MovieListService
                                        .getMovieListById(feedItem.listId)
                                        .then(function (movieList) {
                                            feedItem.movieList = movieList.data;
                                        });
                                } else if (feedItem.type === 'ADD' || feedItem.type === 'DELETE') {
                                    MovieService
                                        .lookupMovieById(feedItem.movieId)
                                        .then(function (movie) {
                                            feedItem.movie = movie.data;
                                        });
                                } else if (feedItem.type === 'FOLLOW') {
                                    UserService
                                        .findUserById(feedItem.followUserId)
                                        .then(function (user) {
                                            feedItem.followUser = user.data;
                                        });
                                }

                                vm.feed.push(feedItem);
                            })

                    });
            });
        }

        function getCurrentPopularMovies() {
            MovieService
                .getCurrentPopularMovies()
                .then(function(response) {
                    vm.popularMovies = response.data.results;
            });
        }
    }
})();