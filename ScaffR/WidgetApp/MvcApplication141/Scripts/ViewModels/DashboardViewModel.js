function DashboardViewModel(data) {
    var self = this;

    self.currentLayout = ko.observable(new LayoutViewModel(data.layout));

    self.currentLayoutName = ko.computed(function () {
        return self.currentLayout().Name();
    });

    self.currentLayoutHtml = ko.computed(function () {
        return self.currentLayout().HtmlValue();
    });

    self.availableLayouts = ko.observableArray();
    self.changeLayout = function (layout) {

        console.log('changing layout', layout);

        self.currentLayout(layout);

        DashboardService.setLayout(1, layout.Id(), function () {           
            LayoutManager.changeLayout(layout, function () {
                console.log('saving layout', layout);
                $('#edit-dialog').dialog('close');
            });
        });

    };

    self.EditLayout = function () {
        LayoutService.getLayouts(function (layouts) {
            var arr = [];
            $.each(layouts, function (idx, value) {
                arr.push(new LayoutViewModel(value));
            });
            self.availableLayouts(arr);

            $('#edit-dialog').dialog();
        });
    };

    // widget stuff
    self.widgetInstances = ko.observableArray();
    self.AddWidgets = function () {
        $('#dialog').dialog();
    };

    self.changeLayout(this.currentLayout(), true);
}

function LayoutViewModel(data) {
    var self = this;
    self.Id = ko.observable(data.Id);
    self.Name = ko.observable(data.Name);
    self.HtmlValue = ko.observable(data.HtmlValue);
    self.Thumbnail = ko.computed(function () {
        return "/models/layouts/" + self.Name() + "/" + self.Name() + ".png";
    });

}

function WidgetViewModel() {
    var self = this;
}