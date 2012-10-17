var DashboardUIManager = function() {

    var _changeLayout = function(newLayout, callback) {

        $('#layout').html(newLayout.HtmlValue());


        console.log('layout applied');

        callback();
    };

    var _addWidgetInstance = function (widget, callback) {        
        callback();
    };

    var _showEditorForWidget = function(widgetInstance, callback) {
        callback();
    };

    var _digestWidgets = function() {

    };

    return {      
        addWidgetInstance: _addWidgetInstance,
        changeLayout: _changeLayout,
        showEditorForWidget: _showEditorForWidget
    };
}();