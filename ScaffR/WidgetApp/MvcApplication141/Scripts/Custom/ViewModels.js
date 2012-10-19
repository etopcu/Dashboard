/// <reference path="DashboardUIManager.js" />
/// <reference path="DashboardService.js" />
/// <reference path="../Framework/knockout-2.1.0.js" />
function DashboardViewModel(data) {

    var self = this;

    self.Columns = ko.observableArray();

    self.AddColumn = function() {
        self.Columns.push(new ColumnViewModel({
            Title: 'New List',
            Order: self.Columns().length
        }, self));
    };

    self.WidgetInstances = ko.observableArray();

    // these show up in the dialog list
    self.AvailableWidgets = ko.observableArray();   
    
    // when user chooses a widget to add...
    self.AddWidget = function (widget) {
        
        DashboardService.createWidgetInstance(widget.Data, 1, function (widgetInstanceData) {

            var widgetInstance = new WidgetInstanceViewModel(widgetInstanceData);

            self.AddWidgetInstance(widgetInstance);         

            $('#add-widget-dialog').dialog('close');
        });
    };

    // when user clicks Add Widget..
    self.ShowAddWidgetDialog = function () {
        DashboardService.getAvailableWidgets(function (widgets) {
            var arr = [];
            $.each(widgets, function (idx, value) {
                arr.push(new AvailableWidgetViewModel(value));
            });
            self.AvailableWidgets(arr);
        });
        $('#add-widget-dialog').dialog({
            width: 500,
            height: 500
        });
    };

    self.AddWidgetInstance = function(instance) {
        self.WidgetInstances().push(instance);
        self.WidgetInstances.notifySubscribers(instance);
        console.log('widget instances', self.WidgetInstances());
    };


    // when user clicks on edit widget
    self.EditWidget = function(widgetInstance) {
        self.CurrentWidgetInstance = widgetInstance;
    };
    
    // category stuff
    self.Categories = ko.observableArray(["Category1", "Category2"]);
    self.SelectedCategory = ko.observable();
    self.ChangeCategory = function(category) {
        self.SelectedCategory(category);
    };
    var startColumn = 0;
    self.Sortable = function (e) {
        $('.column-body').sortable({
            connectWith: $(".column-body"),
            placeholder: "selected-column",
            opacity: "0.2",
            distance: "20",
            receive: function (event, ui) {
                
                var id = ui.item.attr('data-instanceId');
                var newColumnId = $(this).closest('[data-column]').attr('data-column');

                console.log('instance', id, 'from', startColumn, 'to', newColumnId);

                ui.item.find('[name=Column]').val(newColumnId);
            },
            start: function (event, ui) {
                ui.placeholder.height(ui.helper.height());
                startColumn = $(this).closest('[data-column]').attr('data-column');
                //console.log('start column', startColumn);
            },
            stop: function (event, ui) {

            },
            revert: 'invalid'
        });
    };

    self.ChangeCategory(self.Categories()[0]);

    var warr = [];
    $.each(data.WidgetInstances, function (idx, value) {
        warr.push(new WidgetInstanceViewModel(value));
    });
    self.WidgetInstances(warr);    

    var arr = [];
    $.each(data.Columns, function (idx, value) {
        arr.push(new ColumnViewModel(value, self));
    });
    self.Columns(arr);
}

function ColumnViewModel(data, dashboard) {
    var self = this;
    self.Dashboard = dashboard;
    self.Title = ko.observable(data.Title);
    self.Order = ko.observable(data.Order);

    self.WidgetInstances = ko.computed(function () {
        var arr = ko.utils.arrayFilter(self.Dashboard.WidgetInstances(), function (widgetInstance) {
            
            var column = widgetInstance.Location().Column;
            var order = self.Order();

            return (column == order);
        });
        return arr;
    }, self.Dashboard);


}
ColumnViewModel.prototype.Map = function (columns) {
    var arr = [];
    $.each(data, function(idx, value) {
        arr.push(new ColumnViewModel(value));
    });
    return arr;
};

function LayoutViewModel(data) {
    var self = this;
    self.Id = ko.observable(data.Id);    
    self.Columns = ko.observableArray();
    var arr = [];
    $.each(data.Columns, function(idx, value) {
        arr.push(new ColumnViewModel(value));
    });
    self.Columns(arr);
}

function WidgetViewModel(data) {
    var self = this;
    self.WidgetId = data.WidgetId;
    self.Name = ko.observable(data.Name);
    self.Data = data;
}

function AvailableWidgetViewModel(data) {
    var self = this;
    self.Categories = ko.observableArray();
    self.Thumbnail = ko.observable();
    $.extend(self, new WidgetViewModel(data));
}

function WidgetInstanceViewModel(data) {
    var self = this;    
    $.extend(self, new WidgetViewModel(data));    
    self.Location = ko.observable(data.Location);
    self.InstanceId = data.InstanceId;
    self.State = ko.observable('Maximized');
    self.Fullscreen = function() {
        self.State('Fullscreen');
    };

    self.Maximize = function() {
        self.State('Maximized');
    };

    self.Minimize = function () {
        
        console.log('minimize', self.InstanceId);
        self.State('Minimized');
        
    };

    self.Edit = function() {
        console.log('edit');
    };

    self.Delete = function() {
        console.log('delete');
    };

    self.Refresh = function() {
        console.log('refresh');
    };
}