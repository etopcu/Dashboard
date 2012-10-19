function WidgetInstanceViewModel(data, dashboard) {
    var self = this;
    self.Dashboard = dashboard;
    $.extend(self, new WidgetViewModel(data));
    self.Location = ko.observable(data.Location);
    self.InstanceId = data.InstanceId;
    
    self.State = ko.observable('Maximized');

    self.Fullscreen = function () {
        self.State('Fullscreen');
    };

    self.Maximize = function () {
        self.State('Maximized');
    };

    self.Delete = function (instance) {
        dashboard.DeleteWidgetInstance(instance);
    };

    self.Minimize = function () {
        console.log('minimize', self.InstanceId);
        self.State('Minimized');
    };

    self.Edit = function () {
        self.State("Edit");
        console.log('edit');
    };

    self.Refresh = function () {
        console.log('refresh');
    };

    self.RootAssetPath = ko.computed(function() {
        return "/Models/Widgets/" + self.Name() + "/";
    });
    
    self.View =function () {
        return self.RootAssetPath() + "Views/" + self.State() + ".html";        
    };
}