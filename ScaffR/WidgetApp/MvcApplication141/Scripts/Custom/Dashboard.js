/// <reference path="../ViewModels/DashboardViewModel.js" />
/// <reference path="../Proxies/DashboardService.js" />

$(function () {

    DashboardService.getByUserId(1, function (data) {
        ko.applyBindings(new DashboardViewModel(data));
    });
    
});