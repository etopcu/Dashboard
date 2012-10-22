Dashboard.Directives.directive('opendialog', function ($dashboard) {
    var openDialog = {
        link: function ($scope, element, attrs) {
            element.bind('click', function (data) {

                $dashboard.getCatalog(function (result) {
                    console.log(result);
                    $scope.catalog = result;
                    $('#catalog').dialog({
                        height: 500,
                        width: 500
                    });
                });

            });
        }
    };
    return openDialog;
});