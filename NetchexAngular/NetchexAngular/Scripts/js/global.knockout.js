/*##############################################################################
# Copyright (c) 2012 
# Ulf Björklund
# http://average-uffe.blogspot.com/
# http://twitter.com/codeplanner
# http://twitter.com/ulfbjo
#
# Permission is hereby granted, free of charge, to any person obtaining
# a copy of this software and associated documentation files (the
# "Software"), to deal in the Software without restriction, including
# without limitation the rights to use, copy, modify, merge, publish,
# distribute, sublicense, and/or sell copies of the Software, and to
# permit persons to whom the Software is furnished to do so, subject to
# the following conditions:
#
# The above copyright notice and this permission notice shall be
# included in all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
# EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
# MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
# NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
# LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
# OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
# WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
##############################################################################*/
function getQuerystring(key, default_) {
    if (default_ == null) default_ = "";
    key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
    var qs = regex.exec(window.location.href);
    if (qs == null)
        return default_;
    else
        return qs[1];
}

//ServiceProxy against generic controller
//Handles the AJAX calls to the backend...
var serviceproxy = (function () {
    /// <summary>
    /// CodePlanner ServiceProxy JavaScript API
    /// Provides a generic patterns for accessing a Restful API
    /// </summary>              
    var SaveOrUpdate = "SaveOrUpdate",
        GetAll = "GetAll",
        Delete = "Delete",
        GetById = "GetById",
        GetPage = "Page",
        entityName = null,
        type = null,
        _private = {

            Init: function (_entityName, _type) {
                /// <summary>
                /// Initializes/resets the proxy with a new entityname and object type-
                /// </summary>
                ///<param name="_entityName" type="String">
                /// The name of the entity have to match the REST name.                
                ///</param>
                ///<param name="_type" type="Object">
                /// The knockout entity that will be observed and used to to REST operations on.
                ///</param>
                entityName = _entityName;
                type = _type;
            },
            PopulateObject: function (data, callback) {
                /// <summary>
                /// Will populate an object of the type set in init.
                /// will send the populated object back in the callback.
                /// </summary>
                ///<param name="data" type="Object">
                /// The object containing all the data.
                ///</param>
                ///<param name="callback" type="function">
                /// The function/callback to be called when population is complete.                
                ///</param>
                var x = new type();
                for (n in x) {
                    if (typeof x[n] === 'function')
                        x[n](data[n]);
                    else
                        x[n] = data[n];
                }
                callback(x);
            },
            Add: function (entity, successCallback, errorCallback) {
                /// <summary>
                /// Will make a call to the controllers SaveOrUpdate.                
                /// </summary>
                ///<param name="entity" type="Object">
                /// The entity to save.
                ///</param>
                ///<param name="successCallback" type="function">
                /// The function/callback to be called when save is completed.                
                ///</param>
                ///<param name="errorCallback" type="function">
                /// The function/callback to be called if save fails.                
                ///</param>
                $.post("/" + entityName + "/" + SaveOrUpdate, entity, function (data) {
                    if (data.IsValid)
                        _private.GetById(data.Entity.Id, successCallback);
                    else
                        errorCallback(data);
                });
            },
            GetAll: function (callback) {
                /// <summary>
                /// Will make a call to the controllers GetAll.                
                /// </summary>
                ///<param name="callback" type="function">
                /// The function/callback to be called when GetAll is completed.                
                ///</param>
                $.getJSON("/" + entityName + "/" + GetAll, {}, function (data) {
                    var arr = [];
                    $.when($.each(data, function (ix, value) {
                        _private.PopulateObject(value, function (obj) { arr.push(obj); });
                    })).done(function () { callback(arr); });
                });
            },
            Delete: function (entity, callback) {
                $.post("/" + entityName + "/" + Delete, entity, function () {
                    callback();
                });
            },
            Update: function (entity, successCallback, errorCallback) {
                $.post("/" + entityName + "/" + SaveOrUpdate, entity, function (data) {
                    if (data.IsValid) {
                        $.getJSON("/" + entityName + "/" + GetById, { Id: data.Entity.Id }, function (obj) {
                            successCallback(obj);
                        });
                    }
                    else
                        errorCallback(data);
                });
            },
            GetById: function (id, callback) {
                $.getJSON("/" + entityName + "/" + GetById, { Id: id }, function (obj) {
                    _private.PopulateObject(obj, callback);
                });
            },
            GetPage: function (page, size, callback) {
                $.getJSON("/" + entityName + "/" + GetPage, { page: page, pageSize: size }, function (data) {
                    var p = {
                        info: {
                            Count: data.Count,
                            CurrentPage: data.CurrentPage,
                            PageSize: data.PageSize,
                            PagesCount: data.PagesCount
                        },
                        entities: []
                    };
                    $.when($.each(data.Entities, function (ix, value) {
                        _private.PopulateObject(value, function (obj) { p.entities.push(obj); });
                    })).done(function () { callback(p); });
                });
            }
        };

    return {
        Init: _private.Init,
        Add: _private.Add,
        GetAll: _private.GetAll,
        Delete: _private.Delete,
        Update: _private.Update,
        GetById: _private.GetById,
        GetPage: _private.GetPage,
        PopulateObject: _private.PopulateObject
    };
})();

//Viewmodel, contains serviceproxy and active entity + list of entities.
var ViewModel = {
    Debug: false,
    Proxy: serviceproxy,
    Entity: ko.observable(),
    Entities: ko.observableArray([])
};
//ViewModel methods CRUD
ViewModel.Add = function (item, successCallback, errorCallback) {
    serviceproxy.Add(item, function (entity) { ViewModel.Entities.push(entity); successCallback(entity); }, function (result) { errorCallback(result); });
};
ViewModel.Remove = function (item) { serviceproxy.Delete(item, function () { ViewModel.Entities.remove(item); }); };
ViewModel.Select = function (item) { ViewModel.Entity(item); };
ViewModel.Activate = function (id) {
    var x = ko.utils.arrayFirst(ViewModel.Entities(), function (item) {
        return item.Id == id;
    });
    ViewModel.Select(x);
};
ViewModel.Update = function (item, successCallback, errorCallback) {
    serviceproxy.Update(item, function (entity) {
        var x = ko.utils.arrayFirst(ViewModel.Entities(), function (item) {
            return item.Id == entity.Id;
        });
        for (n in x) {
            if (typeof x[n] === 'function') {
                x[n](entity[n]);
            }
            else {
                x[n] = entity[n];
            }
        }
        successCallback(entity);
    }, function (result) { errorCallback(result); });
};
ViewModel.ChangePage = function (page, size, callback) {
    serviceproxy.GetPage(page, size, function (data) {
        ViewModel.Entities(data.entities);
        callback(data.info);
    });
};
ViewModel.Setup = function (entityName, entityType, pageSize, callback) {
    serviceproxy.Init(entityName, entityType);
    var o = new entityType();
    for (n in o) {
        if (typeof (o[n]) == 'object' && (o[n] instanceof Array)) {
            ViewModel.Entity[n] = ko.observableArray([]);
        }
        else {
            ViewModel.Entity[n] = ko.observable();
        }
    }

    ViewModel.Proxy.GetPage(1, pageSize, function (data) {
        ViewModel.Entities(data.entities);
        ko.applyBindings(ViewModel);
        callback(data.info);
    });
};