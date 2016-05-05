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
/**
 * 分页插件
 */
angular.module('ug.pagination', [
    "template/pagination/pagination-tpl.html"
]).directive('ugPagination', function() {
    return {
        restrict: 'E',
        replace: true ,
        transclude : true, //嵌入
        scope:{
            pageInfo:"="
        },
        templateUrl : function(element, attrs) {
            return attrs.templateUrl || 'template/pagination/pagination-tpl.html';
        },
        controller : ['$scope',function($scope){
            $scope.pageConfig = {
                showSkip:true,
                showTotal:true,
                total:0,
                showPageNum:true,
                pageSize:10,
                pageNum:1,
                styleCss:1
            };
            $scope.pageInfo = $scope.pageInfo||{};
            $scope.pageConfig = angular.extend($scope.pageConfig,$scope.pageInfo.pageConfig);
            $scope.$watch('pageInfo',function(newVal,oldVal){
                if(newVal && newVal !== oldVal){
                    $scope.load();
                }
            });
            $scope.load = function(){
                $scope.curPage = $scope.pageInfo.pageNum;//当前页
                $scope.pageSize = $scope.pageInfo.pageSize;//每页总条数
                $scope.total = $scope.pageInfo.total;//总条数
                if($scope.pageInfo.pages){
                    $scope.pages = $scope.pageInfo.pages
                }else{
                    $scope.pages = 1
                }
                $scope.pageList = [];
                for(var i=1;i<=$scope.pages;i++){
                    var page = {
                        isDisabled:false,
                        num:i,
                        isOmit:false,
                        text:"",
                        isShow:true
                    };
                    //如果页码等于当前页禁用点击
                    if(page.num == $scope.curPage){
                        page.isDisabled = true;
                    }
                    //总页数小于7，显示所有分页
                    if($scope.pages < 7){
                        $scope.pageList.push(page);
                    }else{
                        //小于3
                        if(i == 1){
                            $scope.pageList.push(page);
                            continue;
                        }
                        //大于最后2页
                        if(i == $scope.pages){
                            $scope.pageList.push(page);
                            continue;
                        }
                        if($scope.curPage >= 1 && $scope.curPage <= $scope.pages){
                            if(($scope.curPage-1)==i || ($scope.curPage+1)==i || i==$scope.curPage){
                                if(($scope.curPage-1)==i &&  i!=$scope.curPage){
                                    var page2 = angular.copy(page);
                                    page2.isOmit = true;
                                    page2.text = "...";
                                    page2.num=null;
                                    if(i!=2){
                                        $scope.pageList.push(page2);
                                    }
                                    $scope.pageList.push(page);
                                }else if(($scope.curPage+1)==i && i!=$scope.curPage){
                                    $scope.pageList.push(page);
                                    var page2 = angular.copy(page);
                                    page2.isOmit = true;
                                    page2.text = "...";
                                    page2.num=null;
                                    if(i!=($scope.pages-1)){
                                        $scope.pageList.push(page2);
                                    }
                                }
                                if(i==$scope.curPage){
                                    $scope.pageList.push(page);
                                }
                            }
                        }
                    }
                }
            };
            $scope.skipPage = function(num){
                num = parseInt(num);
                if(num<=$scope.pages && num>=1){
                    $scope.pageInfo.pageNum = num;
                }else if(num > $scope.pages){
                    $scope.pageInfo.pageNum = angular.copy($scope.pages);
                    $scope.inPageNo = angular.copy($scope.pages);
                }else if(num<1){
                    $scope.pageInfo.pageNum = 1;
                    $scope.inPageNo = 1;
                }
                $scope.pageInfo.loadData();
            };
            $scope.load();
        }]
    };
});

/**
 * Created by Jeng on 2015/12/17.
 */
/*jshint globalstrict:true*/
/*global angular:false*/
/**
 * 校验框架
 */
angular.module('ug.validate', [

]).constant("Regex_Rules", {
    // 正数字
    positiveIntegerRegex: /^[0-9]+$/,
    // 整数
    integerRegex : /^\-?[0-9]+$/,
    // 正浮点数字
    positiveDecimalRegex : /^[0-9]*\.?[0-9]+$/,
    // 浮点数字
    decimalRegex : /^\-?[0-9]*\.?[0-9]+$/,
    // email
    emailRegex : /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    // 大小写字母或数字
    notSpecialCharacterRegex : /^[A-Za-z0-9]+$/i,
    // 非汉字
    notChineseRegex : /^[\u4E00-\u9FA5]+$/i,
    // 中国身份证
    chinaIdRegex : /^[1-9]\d{5}[1-9]\d{3}(((0[13578]|1[02])(0[1-9]|[12]\d|3[0-1]))|((0[469]|11)(0[1-9]|[12]\d|30))|(02(0[1-9]|[12]\d)))(\d{4}|\d{3}[xX])$/,
    // 中国邮政编码
    chinaZipRegex : /^\d{6}$/,
    // 手机号码
    telephoneRegex : /^(1)[0-9]{10}$/,
    // IP
    ipRegex : /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/
}).constant("$ugValidateDefault", {
    errorElement: "div",
    errorClass:"error"
}).factory("$ugValidateProvider", function () {
    return {
        setDefaults: function (options) {
            $.validator.setDefaults(options);
        },
        addMethod: function (name, func, errorText) {
            $.validator.addMethod(name, func, errorText);


        }
    }
}).directive('ugValidate', ["$ugValidateDefault", function( $ugValidateDefault) {
    return {
        restrict: 'A',
        scope:{
            ugValidate:"="
        },
        require:"form",
        link: function(scope, element, attr) {
            var option = angular.extend($ugValidateDefault, scope.ugValidate);
            scope.ugValidate.validator = $(element).validate(option);
            angular.extend(scope.ugValidate, option);
        }
    };
}]);
