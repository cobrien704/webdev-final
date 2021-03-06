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

            vm.user.following.forEach(function (followingId) {
                UserService
                    .findUserById(followingId)
                    .then(function (response) {
                        var followingUser = response.data;
                        vm.user.activity = vm.user.activity.concat(followingUser.activity);
                    });
            });

            // not sure how to wait for the loop and promise to be done
            // never should do this, but we are approaching a deadline...
            // fix this
            setTimeout(function(){
                showFeed();
            }, 500);
        }

        function showFeed() {
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
                                            vm.feed.push(feedItem);
                                            sortByDate(vm.feed);
                                        });
                                } else if (feedItem.type === 'ADD' || feedItem.type === 'DELETE') {
                                    MovieService
                                        .lookupMovieById(feedItem.movieId)
                                        .then(function (movie) {
                                            feedItem.movie = movie.data;

                                            MovieListService
                                                .getMovieListById(feedItem.listId)
                                                .then(function (movieList) {
                                                    feedItem.movieList = movieList.data;
                                                    vm.feed.push(feedItem);
                                                    sortByDate(vm.feed);
                                                });
                                        });
                                } else if (feedItem.type === 'FOLLOW') {
                                    UserService
                                        .findUserById(feedItem.followUserId)
                                        .then(function (user) {
                                            feedItem.followUser = user.data;
                                            vm.feed.push(feedItem);
                                            sortByDate(vm.feed);
                                        });
                                }
                            });
                    });
            });
        }

        function sortByDate(list) {
            list.sort(function (a, b) {
                a = new Date(a.dateCreated);
                b = new Date(b.dateCreated);
                return a>b ? -1 : a<b ? 1 : 0;
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