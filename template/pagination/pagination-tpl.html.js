angular.module("template/pagination/pagination-tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/pagination/pagination-tpl.html",
    "<div class=\"dataTables_paginate paging_simple_numbers\">\n" +
    "    <ul class=\"pagination pagination-sm\">\n" +
    "        <li class=\"paginate_button previous\" ng-class=\"{disabled:curPage==1}\" aria-controls=\"dt_basic\">\n" +
    "            <a ng-if=\"curPage==1\">上一页</a>\n" +
    "            <a ng-if=\"curPage!=1\" ng-click=\"skipPage(curPage-1)\">上一页</a>\n" +
    "        </li>\n" +
    "        <li ng-repeat=\"page in pageList\"\n" +
    "            ng-class=\"{active:curPage==page.num,disabled:page.isOmit}\"\n" +
    "            class=\"paginate_button\" aria-controls=\"dt_basic\" tabindex=\"0\">\n" +
    "            <a ng-click=\"skipPage(page.num)\"  ng-show=\"!page.isOmit\">{{page.num}}</a>\n" +
    "            <a href=\"#\" ng-show=\"page.isOmit\">{{page.text}}</a>\n" +
    "        </li>\n" +
    "        <li class=\"paginate_button\" ng-class=\"{next:curPage!=pages,disabled:curPage==pages}\">\n" +
    "            <a ng-if=\"curPage!=pages\" ng-click=\"skipPage(curPage+1)\">下一页</a>\n" +
    "            <a ng-if=\"curPage==pages\" href=\"#\">下一页</a>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "    <div style=\"line-height: 34px; float: right; margin-right: 6px;font-size: 13px;\">\n" +
    "        共有 <span class=\"text-primary\">{{total}}</span> 条，当前页 <span class=\"txt-color-darken\">{{curPage}}</span> / <span class=\"txt-color-darken\">{{pages}}</span> 总页数</div>\n" +
    "</div>");
}]);
