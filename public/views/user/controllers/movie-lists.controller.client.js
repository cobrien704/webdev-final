(function() {
    angular
        .module('Mooviews')
        .controller('ListsController', ListsController);

    function ListsController($location, $routeParams, MovieService, MovieListService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.searchMovies = searchMovies;
        vm.createList = createList;
        vm.addMovieToList = addMovieToList;
        vm.deleteList = deleteList;

        $("#addForm").hide();
        $("#addFormButton").click(function(){
            $("#addForm").toggle();
        });

        function init() {
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

        function addMovieToList() {

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