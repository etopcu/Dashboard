var DashboardUIManager = function () {

    var _changeLayout = function (newLayout, callback) {

        callback();
    };

    var _addWidgetInstance = function (widget, callback) {
        callback();
    };

    var _showEditorForWidget = function (widgetInstance, callback) {
        callback();
    };

    var _digestWidgets = function (viewModel) {
        $('.column').each(function () {
            var attr = $(this).attr('data-column');

            if (attr) {
                //var instances = viewModel.GetWidgetInstancesForColumn(attr);

                //instances = (instances || []);

                //ko.applyBindings({ widgets: instances }, $(this).find('.column-body')[0]);
            }
        });
    };

    return {
        addWidgetInstance: _addWidgetInstance,
        changeLayout: _changeLayout,
        showEditorForWidget: _showEditorForWidget,
        digestWidgets: _digestWidgets
    };
}();