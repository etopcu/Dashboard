/// <reference path="../Framework/jquery-1.8.2.js" />
var LayoutService = function() {

    var _getLayouts = function(callback) {

        $.ajax({
            url: '/scripts/jsonservice/installedlayouts.json',
            type: 'GET',
            success: function (data) {
                
                callback(data);
            }
        });        
    };
    
    return {
        getLayouts: _getLayouts
    };

}();