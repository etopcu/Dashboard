/// <reference path="DashboardUIManager.js" />
/// <reference path="DashboardService.js" />
/// <reference path="../Framework/knockout-2.1.0.js" />
function DashboardViewModel(data) {
    var self = this;

    // layout stuff
    self.CurrentLayout = ko.observable(new LayoutViewModel(data.layout));
    self.CurrentLayoutName = ko.computed(function () {
        return self.CurrentLayout().Name();
    });
    self.CurrentLayoutHtml = ko.computed(function () {
        return self.CurrentLayout().HtmlValue();
    });
    self.InstalledLayouts = ko.observableArray();
    
    self.ChangeLayout = function (layout) {
        console.log('changing layout', layout);
        self.CurrentLayout(layout);
        DashboardService.changeLayout(1, layout.Id(), function () {           
            DashboardUIManager.changeLayout(layout, function () {
                console.log('saving layout', layout);
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

    // widget stuff
    self.WidgetInstances = ko.observableArray();
    
    self.GetWidgetInstancesForColumn = function (column) {
        return ko.utils.arrayFilter(self.WidgetInstances(), function (item) {

            if (item.Location()) {
                return item.Location().Column == column;
            }
            return false;
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

    // when user chooses a widget to add...
    self.AddWidget = function (widget) {
        DashboardService.createWidgetInstance(widget, 1, function(widgetInstance) {
            var instance = new WidgetInstanceViewModel(widgetInstance);
            self.WidgetInstances.push(instance);
            DashboardUIManager.addWidgetInstance(instance, function () {
                self.EditWidget(instance);
                $('#add-widget-dialog').dialog('close');
            });
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

    var arr = [];
    $.each(data.widgetInstances, function(idx, value) {
        arr.push(new WidgetInstanceViewModel(value));
    });
    self.WidgetInstances(arr);

    self.ChangeCategory(self.Categories()[0]);
}

function LayoutViewModel(data) {
    var self = this;
    self.Id = ko.observable(data.Id);
    self.Name = ko.observable(data.Name);
    self.HtmlValue = ko.observable(data.HtmlValue);
}

function WidgetViewModel(data) {
    var self = this;
    self.Id = ko.observable(data.Id);
    self.Name = ko.observable(data.Name);
    self.HtmlValue = ko.observable(data.HtmlValue);
}

function InstalledLayoutViewModel(data) {
    var self = this;
    $.extend(self, new LayoutViewModel(data));
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
}