(function() {
    angular
        .module("Mooviews")
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/home/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/home/:uid", {
                templateUrl: "views/home/templates/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
    }
})();