/// <reference path="../Scripts/lib/underscore/underscore-1.4.2.js" />

Dashboard.Directives.directive('preventdefault', function ($dashboard) {
    var prevent = {
        link: function ($scope, element, attrs) {
            element.bind('click', function(e) {
                e.preventDefault();
            });
        }
    };
    return prevent;
});

Dashboard.Directives.directive('opendialog', function ($dashboard) {
    var openDialog = {
        link: function ($scope, element, attrs) {
            element.bind('click', function (data) {

                $('#catalog').dialog({
                    height: 500,
                    width: 500
                });

            });
        }
    };
    return openDialog;
});

Dashboard.Directives.directive('widget', function ($compile, $rootScope, $http) {

    var _link = function(scope, element, attrs) {

        scope.$watch('instance.State', function(state) {

            var layoutUrl = '/dashboard/views/' + state + '.html';

            $http.get(layoutUrl).success(function(response) {
                element.html($compile(response)(scope));
            });
                        
        });
    };

    return {
        scope: '=instance',
        link: _link
    };
});