Dashboard.Controllers.controller('profile', function($scope, $user) {

    $user.get(function(data) {
        $scope.user = data;
    });

});