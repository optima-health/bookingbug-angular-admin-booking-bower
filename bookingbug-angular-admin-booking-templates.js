angular.module("BB").run(["$templateCache", function($templateCache) {$templateCache.put("admin_booking_popup.html","<div class=\"modal-header\">\n  <button type=\"button\" class=\"close\" ng-click=\"cancel()\">&times;</button>\n</div>\n<div class=\"modal-body\" style=\"min-height: 200px\">\n  <div id=\"bb\" bb-admin-booking=\"{{config}}\"></div>\n</div>\n");}]);