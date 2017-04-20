(function() {
    angular
        .module('Mooviews')
        .controller('DiscoverController', DiscoverController);

    function DiscoverController($location, $routeParams, UserService, ActivityService, MovieService, MovieListService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.searchMovies = searchMovies;
        vm.addMovieToList = addMovieToList;

        function init() {
            $('#successAlert').hide();
            $('#dangerAlert').hide();

            UserService
                .findUserById(vm.userId)
                .then(function(response) {
                    var user = response.data;

                    if (user) {
                        vm.user = user
                    } else {
                        vm.user = 'ERROR';
                        $location.url('/');
                    }
                });

            MovieListService
                .getMovieListsForUser(vm.userId)
                .success(function (data) {
                    vm.movieLists = data;
                });
        }
        init();

        function searchMovies(query) {
            MovieService
                .searchMovies(query)
                .then(function (response) {
                    vm.movies = response.data.results;
                });
        }

        function addMovieToList(movie) {
            var listId = $('#selectListForm-' + movie.id).val();

            MovieService
                .addMovieToList(listId, movie)
                .success(function (response) {
                    var activity = {
                        type: 'ADD',
                        listId: listId,
                        movieId: movie.id
                    };

                    ActivityService
                        .createActivity(vm.userId, activity)
                        .then(function (response) {
                            var successAlert = $('#successAlert');
                            successAlert.html("<strong>Success!</strong> " + movie.title + " has been added");
                            successAlert.show();
                            $('html,body').animate({ scrollTop: 0 }, 'slow');

                            setTimeout(function(){
                                $('#successAlert').hide();
                            }, 10000);
                        });
                })
                .error(function (response) {
                    var dangerAlert = $('#dangerAlert');
                    dangerAlert.html("<strong>Error!</strong> " + movie.title + " is already in that list!");
                    dangerAlert.show();
                    $('html,body').animate({ scrollTop: 0 }, 'slow');

                    setTimeout(function(){
                        $('#dangerAlert').hide();
                    }, 10000);
                });
        }
    }
})();
