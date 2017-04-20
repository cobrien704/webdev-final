(function() {
    angular
        .module('Mooviews')
        .controller('ListsController', ListsController);

    function ListsController($location, $scope, $routeParams, UserService, MovieService, MovieListService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.setSelected = setSelected;
        vm.searchMovies = searchMovies;
        vm.createList = createList;
        vm.addMovieToList = addMovieToList;
        vm.removeMovieFromList = removeMovieFromList;
        vm.deleteList = deleteList;

        $("#addForm").hide();
        $("#addFormButton").click(function(){
            $("#addForm").toggle();
        });

        function init() {
            $('#addForm').trigger('reset');

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

        function searchMovies(query) {
            MovieService
                .searchMovies(query)
                .then(function (response) {
                    vm.movies = response.data.results;
                });
        }

        function addMovieToList(listId, movie) {
            MovieService
                .addMovieToList(listId, movie)
                .then(function (response) {
                   init();
                });
        }

        function removeMovieFromList(listId, movieId) {
            MovieService
                .removeMovieFromList(listId, movieId)
                .then(function (response) {
                    init();
                });
        }

        function createList(list) {
            MovieListService
                .createList(vm.userId, list)
                .then(function (response) {
                    $("#addForm").hide();
                    init();
                });
        }

        function deleteList(listId) {
            MovieListService
                .deleteList(listId)
                .then(function (response) {
                    $("#addForm").hide();
                    init();
                });
        }
    }
})();