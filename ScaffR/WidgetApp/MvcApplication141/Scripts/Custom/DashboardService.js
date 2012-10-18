/// <reference path="../Framework/jquery-1.8.2.js" />
var DashboardService = function() {

    var _getDashboard = function(userId, callback) {

        var dashboard = {
            id: userId,
            layout: { "Name": "Layout1", "Id": 1, "HtmlValue": '<div class="layout layout-a"><div class="column first column-first"></div></div>', "Columns": [{ "Index": 0 }, { "Index": 1 }, { "Index": 2 }] },
            widgetInstances: []            
        };
        
        dashboard.widgetInstances.push({ "Name": "WidgetInstance1", "Id": 1, "InstanceId": 100, "Location": { "Column": 0, "Order": 0 } });
        dashboard.widgetInstances.push({ "Name": "WidgetInstance2", "Id": 2, "InstanceId": 200, "Location": { "Column": 1, "Order": 1 } });
        dashboard.widgetInstances.push({ "Name": "WidgetInstance3", "Id": 3, "InstanceId": 300, "Location": { "Column": 1, "Order": 2 } });
        callback(dashboard);        
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

        widget.InstanceId = Math.ceil(Math.random(5,100) *100);

        callback(widget);
    };

    return {
        getDashboard: _getDashboard,
        changeLayout: _changeLayout,
        getAvailableLayouts: _getAvailableLayouts,
        getAvailableWidgets: _getAvailableWidgets,
        createWidgetInstance: _createWidgetInstance
    };

}();