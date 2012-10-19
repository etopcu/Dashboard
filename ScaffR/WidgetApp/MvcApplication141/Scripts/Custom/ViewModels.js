/// <reference path="DashboardService.js" />
/// <reference path="ViewModels.WidgetInstance.js" />
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
    
    self.FindColumnById = function (id) {
        return ko.utils.arrayFirst(self.Columns(), function (value) {
            return value.Order() == id;
        });
    };

    // these show up in the dialog list
    self.AvailableWidgets = ko.observableArray();
    
    // these are the widgets that user has installed
    self.WidgetInstances = ko.observableArray();
     
    // starts the process of installing widget
    self.InstallWidget = function (widget) {
        
        DashboardService.createWidgetInstance(widget.Data, 1, function (widgetInstanceData) {

            var widgetInstance = new WidgetInstanceViewModel(widgetInstanceData, self);

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
        self.ChangeCategory(self.Categories()[0]);
        $('#add-widget-dialog').dialog({
            width: 500,
            height: 500
        });
    };

    self.FindWidgetInstanceById = function(id) {
        return ko.utils.arrayFirst(self.WidgetInstances(), function (item) {
            return item.InstanceId == id;
        });
    };

    self.AddWidgetInstanceToColumn = function(instance, column) {
        column.WidgetInstances.push(instance);
    };

    self.AddWidgetInstance = function(instance) {
        self.WidgetInstances().push(instance);        
        self.WidgetInstances.notifySubscribers(instance);
    };

    self.DeleteWidgetInstance = function (instance) {
        self.WidgetInstances.destroy(instance);
        self.RebuildIndex();
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
            
    self.Sortable = function (e) {
        var startColumn = 0;
        $('.column-body').sortable({
            connectWith: $(".column-body"),
            placeholder: "selected-column",
            opacity: "0.2",
            distance: "20",
            receive: function (event, ui) {
                
                // get the instance id and new column information
                var id = ui.item.attr('data-instanceId'),
                    newColumnId = $(this).closest('[data-column]').attr('data-column');

                // update model with new column information
                self.FindWidgetInstanceById(id).Location().Column = newColumnId;
                
                // this items throws off knockoutjs... we just remove it and rebuild the index
                ui.item.detach();
                self.RebuildIndex();
            },
            start: function (event, ui) {
                ui.placeholder.height(ui.helper.height());
                startColumn = $(this).closest('[data-column]').attr('data-column');
            },
            revert: 'invalid'
        });
    };

    // rebuilds the entire layout of widgets
    self.RebuildIndex = function () {
        $.each(self.Columns(), function (idx, value) {
            var widgets = ko.utils.arrayFilter(self.WidgetInstances(), function (widgetInstance) {
                var column = widgetInstance.Location().Column;
                return (value.Order() == column);
            });
            value.WidgetInstances(widgets);
        });
    };

    // these are ugly, possible refactor in the future...    
    var warr = [];
    $.each(data.WidgetInstances, function (idx, value) {
        warr.push(new WidgetInstanceViewModel(value, self));
    });
    self.WidgetInstances(warr);    

    var arr = [];
    $.each(data.Columns, function (idx, value) {
        arr.push(new ColumnViewModel(value, self));
    });
    self.Columns(arr);
    self.RebuildIndex();
}

function ColumnViewModel(data) {

    var self = this;
    
    self.Title = ko.observable(data.Title);
    self.Order = ko.observable(data.Order);
    
    // this keeps a copy of the user's widgets for this column.  The original values
    // for this come from the master DashboardViewModel.WidgetInstances[] property.
    self.WidgetInstances = ko.observableArray([]);    
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

