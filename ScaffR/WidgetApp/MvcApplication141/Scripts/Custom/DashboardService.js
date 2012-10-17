/// <reference path="../Framework/jquery-1.8.2.js" />
var DashboardService = function() {

    var _getDashboard = function(userId, callback) {

        var dashboard = {
            id: userId,
            layout: { "Name": "Layout1", "Id": 1, "HtmlValue": '<div class="layout layout-a"><div class="column first column-first"></div></div>' },
            widgetInstances: []            
        };
        
        dashboard.widgetInstances.push({ "Name": "WidgetInstance1", "Id": 1, "Location": { "Column": 0, "Order": 0 } });
        dashboard.widgetInstances.push({ "Name": "WidgetInstance2", "Id": 2, "Location": { "Column": 1, "Order": 1 } });

        callback(dashboard);        
    };

    var _getInstalledLayouts = function (callback) {
        $.ajax({
            url: '/scripts/jsonservice/installedlayouts.json',
            type: 'GET',
            success: function (data) {
                callback(data);
            }
        });
    };

    var _getInstalledWidgets = function(callback) {

        $.ajax({
            url: '/scripts/jsonservice/installedwidgets.json',
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
            column: 0,
            order: 0
        };

        callback(widget);
    };

    return {
        getDashboard: _getDashboard,
        changeLayout: _changeLayout,
        getInstalledLayouts: _getInstalledLayouts,
        getInstalledWidgets: _getInstalledWidgets,
        createWidgetInstance: _createWidgetInstance
    };

}();