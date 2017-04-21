(function() {
    angular
        .module('Mooviews')
        .controller('PublicListsController', PublicListsController);

    function PublicListsController($location, $scope, $routeParams, UserService, ActivityService, MovieService, MovieListService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.followingUserId = $routeParams['fid'];
        vm.setSelected = setSelected;

        function init() {

            UserService
                .findUserById(vm.userId)
                .then(function(response) {
                    var user = response.data;

                    if (user) {
                        vm.user = user;

                        UserService
                            .findUserById(vm.followingUserId)
                            .then(function(response) {
                                var followingUser = response.data;

                                if (followingUser) {
                                    vm.followingUser = followingUser;
                                } else {
                                    $location.url('/');
                                }
                            });
                    } else {
                        vm.user = 'ERROR';
                        $location.url('/');
                    }
                });

            MovieListService
                .getMovieListsForUser(vm.followingUserId)
                .success(function (data) {
                    vm.movieLists = data;
                });
        }
        init();

        function setSelected(list) {
            $scope.selected = list;

            MovieListService
                .getMovieListById(list._id)
                .success(function (data) {
                    var movieData = [];

                    data.movies.forEach(function (movieId) {
                        MovieService
                            .lookupMovieById(movieId)
                            .then(function (movie) {
                                movieData.push(movie.data);
                            });
                    });

                    vm.selectedMovieListMovies = movieData;
                });
        }
    }
})();