angular.module("BB").run(["$templateCache", function($templateCache) {$templateCache.put("admin_booking_popup.html","<div class=\"modal-header\">\r\n  <button type=\"button\" class=\"close\" ng-click=\"cancel()\">&times;</button>\r\n</div>\r\n<div class=\"modal-body\" style=\"min-height: 200px\">\r\n  <div id=\"bb\" bb-admin-booking=\"{{config}}\"></div>\r\n</div>\r\n");}]);