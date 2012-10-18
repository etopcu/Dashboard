/// <reference path="DashboardUIManager.js" />
/// <reference path="DashboardService.js" />
/// <reference path="../Framework/knockout-2.1.0.js" />
function DashboardViewModel(data) {
    var self = this;

    // layout stuff
    self.CurrentLayout = ko.observable(new LayoutViewModel(data.layout));
   
    self.InstalledLayouts = ko.observableArray();
    
    self.ChangeLayout = function (layout) {
        self.CurrentLayout(layout);
        DashboardService.changeLayout(1, layout.Id(), function () {           
            DashboardUIManager.changeLayout(layout, function () {
                $('#edit-dialog').dialog('close');
            });
        });
    };
    
    self.ShowEditLayoutDialog = function () {
        DashboardService.getInstalledLayouts(function (layouts) {
            var arr = [];
            $.each(layouts, function (idx, value) {
                arr.push(new InstalledLayoutViewModel(value));
            });
            self.InstalledLayouts(arr);
            $('#edit-dialog').dialog({
                width: 500,
                height: 500
            });
        });
    };

    // these show up in the dialog list
    self.InstalledWidgets = ko.observableArray();
    
    // widget that you are are currently editing..
    self.CurrentWidgetInstance = ko.observable();
    
    // when user clicks Add Widget..
    self.ShowAddWidgetDialog = function () {
        DashboardService.getInstalledWidgets(function(widgets) {
            var arr = [];
            $.each(widgets, function(idx, value) {
                arr.push(new InstalledWidgetViewModel(value));
            });
            self.InstalledWidgets(arr);
        });
        $('#add-widget-dialog').dialog({
            width: 500,
            height: 500
        });
    };

    self.AddWidgetInstance = function (instance) {
        var column = instance.Location().Column;
        self.CurrentLayout().Columns()[column].WidgetInstances().push(instance);
    };

    // when user chooses a widget to add...
    self.AddWidget = function (widget) {
        DashboardService.createWidgetInstance(widget.Data, 1, function (widgetInstanceData) {

            var widgetInstance = new WidgetInstanceViewModel(widgetInstanceData);

            self.AddWidgetInstance(widgetInstance);

            $('#add-widget-dialog').dialog('close');
        });
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

    // initialization stuff
    self.ChangeLayout(this.CurrentLayout(), true);

    $.each(data.widgetInstances, function(idx, value) {
        var widgetInstance = new WidgetInstanceViewModel(value);
        self.AddWidgetInstance(widgetInstance);
    });

    self.ChangeCategory(self.Categories()[0]);  
}

function ColumnViewModel(data) {

    var self = this;
    self.Index = ko.observable(data.Index);
    self.WidgetInstances = ko.observableArray();
    self.ColumnName = ko.computed(function () {
        return "Column " + (self.Index() + 1);
    });

}

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
    self.Id = ko.observable(data.Id);
    self.Name = ko.observable(data.Name);
    self.HtmlValue = ko.observable(data.HtmlValue);
    self.Data = data;
}

function InstalledLayoutViewModel(data) {
    var self = this;
    $.extend(self, new LayoutViewModel(data));
    self.Name = ko.observable(data.Name);
    self.Thumbnail = ko.computed(function () {
        return "/models/layouts/" + self.Name() + "/" + self.Name() + ".png";
    });
}

function InstalledWidgetViewModel(data) {
    var self = this;
    self.Categories = ko.observableArray();
    self.Thumbnail = ko.observable();
    $.extend(self, new WidgetViewModel(data));
}

function WidgetInstanceViewModel(data) {
    var self = this;

    $.extend(self, new WidgetViewModel(data));    
    self.ExtraData = ko.observableArray();
    self.Location = ko.observable(data.Location);
    self.InstanceId = data.InstanceId;
    self.State = ko.observable('Maximized');

    self.Fullscreen = function() {
        self.State('Fullscreen');
    };

    self.Maximize = function() {
        self.State('Maximized');
    };

    self.Minimize = function() {
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