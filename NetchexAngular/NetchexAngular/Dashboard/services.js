Dashboard.Services.factory('$dashboard', function($config, $http, $q, $rootScope) {

    var _getDashboard = function (callback) {
        $http.get($config.JSON_URL + 'dashboard.json').success(function(data, status, headers, config) {
            callback(data);
        });
    };

    var _getAvaiableWidgets = function(callback) {
        $http.get($config.JSON_URL + 'availableWidgets.json').success(function (data, status, headers, config) {
            callback(data);
        });
    };

    var _installWidget = function(widget, userId, callback) {
        widget.Column = 0,
        widget.Order = -1;
        widget.Title = widget.Name;
        widget.InstanceId = Math.ceil(Math.random(5, 100) * 100);
        widget.State = "Maximized";
        callback(widget);
    };
    
    return {
        get: _getDashboard,
        getCatalog: _getAvaiableWidgets,
        install: _installWidget
    };

});

Dashboard.Services.factory('$user', function($config, $http) {
    return {
        get: function(callback) {
            $http.get($config.JSON_URL + 'user.json').success(function (data, status, headers, config) {
                callback(data);
            });
        }
    };
});