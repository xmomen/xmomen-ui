angular.module('ug.dialog', [

])
.constant("$ugDialogConfig", {
    errorElement: "div",
    errorClass:"error"
})
.factory("$ugDialog", ["$q", function ($q) {
    return {
        alert : function(option){
            var defaultConfig = {
                title : "提示",
                color : "#5384AF",
                timeout: 3000,
                icon : "fa fa-bell"
            };
            if(!angular.isObject(option)){
                option = {
                    content:option
                }
            }
            angular.extend(defaultConfig, option);
            $.smallBox(defaultConfig);
        },
        warn : function(option){
            var defaultConfig = {
                title:"警告",
                color : "#C46A69",
                icon : "fa fa-warning shake animated",
                timeout : 6000
            };
            if(!angular.isObject(option)){
                option = {
                    content:option
                }
            }
            angular.extend(defaultConfig, option);
            $.bigBox(defaultConfig);
        },
        confirm: function (option) {
            var ok = "确认";
            var cancel = "取消";
            if(option.okText){
                ok = option.okText;
            }
            if(option.cancelText){
                cancel = option.cancelText;
            }
            var defaultConfig = {
                title : "确认框",
                color : "#5384AF",
                icon : "fa fa-bell",
                buttons : '[' +cancel + '][' + ok + ']'
            };
            if(!angular.isObject(option)){
                option = {
                    content:option
                }
            }
            angular.extend(defaultConfig, option);
            var deferred = $q.defer();
            $.SmartMessageBox(defaultConfig, function(ButtonPressed) {
                if (ButtonPressed === ok) {
                    deferred.resolve();
                }
                if (ButtonPressed === cancel) {
                    deferred.reject();
                }
            });
            return deferred.promise;
        }
    }
}]);