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
        return "/areas/dashboard/widgets/" + widget.Name + "/" + widget.State + ".html";
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
        for (var i = 0; i < $scope.WidgetInstances.length; i++) {
            var instance = $scope.WidgetInstances[i];
            if (instance.InstanceId == instanceId) {
                return instance;
            }
        }
        return false;
    };
});