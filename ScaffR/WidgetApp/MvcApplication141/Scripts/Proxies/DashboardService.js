/// <reference path="../Framework/jquery-1.8.2.js" />
var DashboardService = function() {

    var _getDashboard = function(userId, callback) {

        var dashboard = {
          id: userId
        };

        dashboard.layout = { "Name": "Layout1", "Id": 1, "HtmlValue": '<div class="layout layout-a"><div class="column first column-first"></div></div>' };

        callback(dashboard);        
    };

    var _setLayout = function(userId, layoutId, callback) {

        $.ajax({
            url: '/api/dashboards',
            type: 'POST',
            data: {
                userId: userId,
                layoutId: layoutId                
            },
            success: function (data) {

                data.layout = { "Name": "Layout1", "Id": 1, "HtmlValue": '<div class="layout layout-a"><div class="column first column-first"></div></div>' };

                callback(data);
            }
        });

    };

    return {
        getByUserId: _getDashboard,
        setLayout: _setLayout
    };

}();