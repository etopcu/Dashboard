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