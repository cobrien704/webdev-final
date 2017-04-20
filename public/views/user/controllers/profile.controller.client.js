(function() {
    angular
        .module('Mooviews')
        .controller('ProfileController', ProfileController);

    function ProfileController($location, $scope, $rootScope, $routeParams, UserService, ActivityService, MovieListService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.searchForUsers = searchForUsers;
        vm.followUser = followUser;
        vm.logout = logout;


        function init() {
            $("#showFollowing").hide();
            $("#showFollowingButton").click(function(){
                $("#showFollowing").toggle();
            });

            $("#showLists").hide();
            $("#showListsButton").click(function(){
                $("#showLists").toggle();
            });

            $('#successAlert').hide();
            $('#dangerAlert').hide();

            UserService
                .findUserById(vm.userId)
                .then(function(response) {
                    var user = response.data;

                    if (user) {
                        vm.user = user;
                        vm.followingUsers = [];
                        vm.userMovieLists = [];

                        vm.user.following.forEach(function(followId) {
                            UserService
                                .findUserById(followId)
                                .then(function (response) {
                                    vm.followingUsers.push(response.data);
                                });
                        });

                        vm.user.movieLists.forEach(function(listId) {
                            MovieListService
                                .getMovieListById(listId)
                                .then(function (response) {
                                    vm.userMovieLists.push(response.data);
                                });
                        })

                    } else {
                        vm.user = 'ERROR';
                        $location.url('/');
                    }
                });


        }
        init();

        function logout(user) {
            UserService
                .logout(user)
                .then(function (response) {
                    $rootScope.currentUser = null;
                    $location.url('/');
                });
        }

        function searchForUsers(query) {
            UserService
                .findUserByQuery(query)
                .then(function (response) {
                    vm.friendsSearchResults = response.data;
                })
        }

        function followUser(followUser) {
            UserService
                .followUser(vm.userId, followUser._id)
                .success(function (response) {
                    var activity = {
                        type: 'FOLLOW',
                        followUserId: followUser._id
                    };

                    ActivityService
                        .createActivity(vm.userId, activity)
                        .then(function (response) {
                            var successAlert = $('#successAlert');
                            successAlert.html("<strong>Success!</strong> You are now following " + followUser.firstName + "!");
                            successAlert.show();
                            $('html,body').animate({scrollTop: 0}, 'slow');

                            setTimeout(function () {
                                $('#successAlert').hide();
                            }, 10000);
                        });
                })
                .error(function (response) {
                    var dangerAlert = $('#dangerAlert');
                    dangerAlert.html("<strong>Error!</strong> You already follow " + followUser.firstName + "!");
                    dangerAlert.show();
                    $('html,body').animate({ scrollTop: 0 }, 'slow');

                    setTimeout(function(){
                        $('#dangerAlert').hide();
                    }, 10000);
                });
        }
    }
})();
