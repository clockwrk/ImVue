app.directive('navbar', function( $rootScope, AuthService, AUTH_EVENTS, $state, CanvasFactory) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

        //     scope.items = [
        //         { label: 'Home', state: 'home' },
        //         { label: 'About', state: 'about' },
        //         { label: 'Documentation', state: 'docs' },
        //         { label: 'Members Only', state: 'membersOnly', auth: true },
        //         { label: 'Profile', state: 'profile'}
        //     ];

            scope.user = null;

            scope.saveCanvas = CanvasFactory.saveCanvasContent();

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.logout = function () {

                AuthService.logout().then(function () {

                   $state.go('login');
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});
