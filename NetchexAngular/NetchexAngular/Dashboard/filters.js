Dashboard.Filters.filter('widgetFilter', function() {
    return function (input, column) {
        input.sort(function(a, b) {

            var orderA = a.Order;
            var orderB = b.Order;
            
            if (orderA < orderB) return -1;
            if (orderA > orderB) return 1;
            
            return 0;
        });
        var arr = [];
        for (var i = 0; i < input.length; i++) {
            if (input[i].Column == column) {                
                arr.push(input[i]);
            }
        }
        return arr;
    };
});

Dashboard.Filters.filter('categoryFilter', function () {
    return function (input, categoryName) {
        var arr = [];
        for (var i = 0; i < input.length; i++) {
            var categories = input.Categories;
            var found = _.find(categories, function(obj) {
                return obj.Name = categoryName;
            });
            if (found) {
                arr.push(input);
            }
        }
        return arr;
    };
});


