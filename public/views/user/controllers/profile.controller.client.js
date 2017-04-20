(function() {
    angular
        .module('Mooviews')
        .controller('ProfileController', ProfileController);

    function ProfileController($location, $scope, $routeParams, UserService, ActivityService, MovieListService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.searchForUsers = searchForUsers;
        vm.followUser = followUser;


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
        }
        init();


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
        $("#showFollowing").hide();
        $("#showFollowingButton").click(function(){
            $("#showFollowing").toggle();
        });

        function findUserById(id) {
            return $http.get('/api/user?id=' + id);
        }

    }
})();
