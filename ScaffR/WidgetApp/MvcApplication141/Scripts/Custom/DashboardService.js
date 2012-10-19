/// <reference path="../Framework/jquery-1.8.2.js" />
var DashboardService = function() {

    var _getDashboard = function(userId, callback) {

        var data = {
            Columns: [],
            WidgetInstances: []
        };

        DashboardService.getDefaultLayout(function(layout) {
            data.Columns = layout.Columns;
            DashboardService.getWidgetInstances(userId, function (instances) {
                data.WidgetInstances = instances.WidgetInstances;
                callback(data);
            });
        });
    };

    var _getWidgetInstances = function(userId, callback) {

        var dashboard = {
            WidgetInstances: []
        };
        dashboard.WidgetInstances.push({ "Name": "Widget1", "WidgetId": 1, "InstanceId": 100, "Location": { "Column": 1, "Order": 0 } });
        dashboard.WidgetInstances.push({ "Name": "Widget1", "WidgetId": 2, "InstanceId": 200, "Location": { "Column": 1, "Order": 1 } });
        dashboard.WidgetInstances.push({ "Name": "Widget1", "WidgetId": 3, "InstanceId": 300, "Location": { "Column": 0, "Order": 2 } });
        
        callback(dashboard);        
    };

    var _getDefaultLayout = function (callback) {
       
        $.ajax({
            url: '/scripts/jsonservice/defaultLayout.json',
            type: 'GET',
            success: function (data) {
                callback(data);
            }
        });
    };

    var _getAvailableLayouts = function (callback) {
        $.ajax({
            url: '/scripts/jsonservice/availablelayouts.json',
            type: 'GET',
            success: function (data) {                
                callback(data);
            }
        });
    };

    var _getAvailableWidgets = function(callback) {

        $.ajax({
            url: '/scripts/jsonservice/availablewidgets.json',
            type: 'GET',
            success: function (data) {
                callback(data);
            }
        });

    };

    var _changeLayout = function(userId, layoutId, callback) {

        $.ajax({
            url: '/api/dashboards',
            type: 'POST',
            data: {
                userId: userId,
                layoutId: layoutId                
            },
            success: function () {
                callback();
            }
        });

    };

    var _createWidgetInstance = function(widget, userId, callback) {

        widget.Location = {            
            Column: 0,
            Order: 0
        };

        widget.InstanceId = Math.ceil(Math.random(5,100) * 100);
        callback(widget);
    };

    return {
        getDashboard: _getDashboard,
        getWidgetInstances: _getWidgetInstances,
        changeLayout: _changeLayout,
        getAvailableLayouts: _getAvailableLayouts,
        getAvailableWidgets: _getAvailableWidgets,
        createWidgetInstance: _createWidgetInstance,
        getDefaultLayout: _getDefaultLayout
    };

}();