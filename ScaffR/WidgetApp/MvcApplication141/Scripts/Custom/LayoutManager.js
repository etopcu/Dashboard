var LayoutManager = function() {

    var _changeLayout = function(newLayout, callback) {

        $('#layout').html(newLayout.HtmlValue());

        console.log('layout applied');
    };

    return {
      
      changeLayout: _changeLayout  

    };


}();