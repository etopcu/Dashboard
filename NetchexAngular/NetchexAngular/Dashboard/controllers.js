/// <reference path="../Scripts/lib/underscore/underscore-1.4.2.js" />

Dashboard.Controllers.controller('home', function ($scope, $dashboard) {

    var handled = false;

    $dashboard.get(function (data) {
        $scope.Columns = data.Columns;
        $scope.WidgetInstances = data.WidgetInstances;
    });

    $scope.InstallWidget = function(catalogItem) {
        $dashboard.install(catalogItem, 1, function(result) {
            $scope.WidgetInstances.push(result);
            $('#catalog').dialog('close');
        });
    };

    $scope.SetState = function(instance, state) {
        instance.State = state;
    };    

    $scope.GetWidgetPath = function(widget) {
        return "/dashboard/widgets/" + widget.Name + "/" + widget.State + ".html";
    };

    $scope.AddColumn = function () {
        $scope.Columns.push({
            Title: 'New Column',
            Order: $scope.Columns.length
        });
    };

    // behavior with moving widgets around
    $scope.receive = function (event, ui) {
        var instance = indexColumnFromItem(ui.item),
            newColumnId = $(this).closest('[data-column]').data('column');                
        $scope.$apply(instance.Column = newColumnId);
    };
    
    $scope.stop = function (event, ui) {
        (!handled && indexColumnFromItem(ui.item));
    };

    $scope.start = function (event, ui) {
        ui.placeholder.height(ui.helper.height());
        handled = false;
    };

    $scope.ChangeCategory = function(cat) {
        $scope.category = cat;
    };

    $dashboard.getCatalog(function (result) {

        $scope.AvailableWidgets = [];
        $scope.Categories = [];

        $.each(result, function (idx, value) {

            $scope.AvailableWidgets.push(value);

            $.each(value.Categories, function (idx2, cat) {

                var found = _.find($scope.Categories, function (x) {
                    return (x.Name == cat.Name);
                });

                if (!found) {
                    $scope.Categories.push(cat);
                }
            });                        
        });

        $scope.ChangeCategory($scope.Categories[0]);
    });
    
    function indexColumnFromItem(item) {

        handled = true;

        var instance = findInstanceFromItem(item),
            newIndex = item.prevUntil('[data-column]').length;

        item.nextUntil('[data-column]').each(function (idx) {
            
            var current = findInstanceFromItem($(this));
            $scope.$apply(current.Order = newIndex + idx + 1);

        }).end().prevUntil('[data-column]').each(function (idx) {

            var current = findInstanceFromItem($(this));
            $scope.$apply(current.Order = newIndex - idx - 1);            
        });

        $scope.$apply(instance.Order = newIndex);
        return instance;
    }
    
    var findInstanceFromItem = function (item) {
        return findInstance(item.attr('data-instanceId'));
    };

    var findInstance = function (instanceId) {
        return _.find($scope.WidgetInstances, function(item) {
            return item.InstanceId == instanceId;
        });        
    };
});

Dashboard.Controllers.controller('widget', function($scope) {

    $scope.save = function() {
        $scope.instance.State = 'Maximized';
    };

});