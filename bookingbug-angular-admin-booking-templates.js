angular.module("BBAdminBooking").run(["$templateCache", function($templateCache) {$templateCache.put("admin_booking_popup.html","<div class=\"modal-body\">\r\n	<button type=\"button\" class=\"close\" ng-click=\"cancel()\">&times;</button>\r\n  <div id=\"bb\" bb-admin-booking=\"{{config}}\" class=\"container-fluid\"></div>\r\n</div>\r\n");
$templateCache.put("calendar.html","<div bb-page>\r\n\r\n  <div bb-admin-calendar class=\"bb-admin-calendar\">\r\n\r\n    <div class=\"page-header\">\r\n      <h1 ng-show=\"availability_conflict\">Availability Conflict</h1>\r\n      <h1 ng-show=\"!availability_conflict\">Select a time</h1>\r\n    </div>\r\n\r\n    <div class=\"page-summary\" ng-show=\"availability_conflict\">\r\n\r\n      <p>\r\n        There\'s an availability conflict <span ng-show=\"person_name\">with {{person_name}}</span><span ng-show=\"resource_name\">in {{resource_name}}</span>.\r\n           <!--at {{bb.current_item.defaults.datetime | datetime: \'time\'}} -->  This can be the result of: <!-- either the person or resouce requried already be booked/unavailable or that there\'s not enough to complete the service. You can r -->\r\n      </p>\r\n\r\n      <div class=\"row\">\r\n        <ul class=\"bb-bullet-list\">\r\n          <div class=\"col-sm-6 col-md-4\">\r\n            <li>The Staff/Resource being booked or blocked already</li>\r\n          </div>\r\n          <div class=\"col-sm-6 col-md-4\">\r\n            <li>Not enough available time to complete the booking before an existing one starts</li>\r\n          </div>\r\n          <div class=\"col-sm-6 col-md-4\">\r\n            <li>The selected time being outside of the {{bb.current_item.service.booking_time_step | time_period}} booking time step for {{bb.current_item.service.name}}.</li>\r\n          </div>\r\n        </ul>\r\n      </div>\r\n\r\n      <p>You can either use the calendar to choose another time or overbook.</p>\r\n\r\n    </div>\r\n\r\n    <div class=\"page-summary\" ng-show=\"!availability_conflict\">\r\n      Select a time for the booking.\r\n    </div>\r\n\r\n    <!-- CALENDAR (with First available/Day/Week view)-->\r\n    <div class=\"panel panel-default\">\r\n      <div class=\"panel-heading\"><strong>Calendar</strong></div>\r\n      <div class=\"panel-body\">\r\n\r\n\r\n        <div class=\"row\">\r\n          <div class=\"col-sm-8\">\r\n\r\n            <div class=\"form-inline\">\r\n\r\n              <div class=\"bb-label\">\r\n                <span class=\"glyphicon glyphicon-filter\" aria-hidden=\"true\"></span>\r\n                Filter by:\r\n              </div>\r\n\r\n              <div class=\"form-group\" ng-if=\"bb.company.$has(\'people\')\">\r\n                <select bb-people class=\" form-control\" id=\"person\" ng-model=\"person\" ng-options=\"p.name for p in bookable_people | orderBy: \'name\'\">\r\n                  <option value=\"\">Any person</option>\r\n                </select>\r\n              </div>\r\n\r\n              <div class=\"form-group\" ng-if=\"bb.company.$has(\'resources\')\">\r\n                <select bb-resources=\"{allow_single_pick: true}\" class=\"form-control\"  id=\"resource\" ng-model=\"resource\" ng-options=\"r.name for r in bookable_resources | orderBy: \'name\'\">\r\n                  <option value=\"\">Any resource</option>\r\n                </select>\r\n              </div>\r\n\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"col-sm-4\">\r\n            <div class=\"bb-view-switcher hidden-xs\">\r\n              <div class=\"btn-group pull-right\">\r\n                <button class=\"btn btn-sm btn-default\" ng-class=\"{active: calendar_view.next_available}\" ng-click=\"switchView(\'next_available\')\" ng-if=\"bb.item_defaults.pick_first_time\">\r\n                  <i class=\"fa fa-calendar-check-o\"></i> First available\r\n                </button>\r\n                <button class=\"btn btn-sm btn-default\" ng-class=\"{active: calendar_view.day}\" ng-click=\"switchView(\'day\')\">\r\n                  <i class=\"fa fa-calendar-times-o\"></i> Day\r\n                </button>\r\n                <button class=\"btn btn-sm btn-default\" ng-class=\"{active: calendar_view.multi_day}\" ng-click=\"switchView(\'multi_day\')\">\r\n                  <i class=\"fa fa-calendar-o\"></i>\r\n                  <span class=\"visible-sm-inline\">3 day</span>\r\n                  <span class=\"visible-md-inline\">5 day</span>\r\n                  <span class=\"visible-lg-inline\">7 day</span>\r\n                </button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n        </div>\r\n\r\n        <div ng-if=\"calendar_view.next_available\">\r\n\r\n          <div class=\"bb-day-nav\">\r\n\r\n            <h2 class=\"hidden-xs bb-day-nav-heading\">{{selected_date | datetime: \'Do MMMM YYYY\'}}</h2>\r\n            <h2 class=\"hidden-sm hidden-md hidden-lg bb-day-nav-heading\">{{selected_date | datetime: \'Do MMMM\'}}</h2>\r\n\r\n          </div>\r\n\r\n          <div class=\"bb-calendar\">\r\n\r\n            <div class=\"panel-group\">\r\n              <div class=\"accordion-group\">\r\n                <div class=\"panel panel-default\">\r\n\r\n                  <ul class=\"time-slots\" ng-if=\"slots.length > 0\">\r\n\r\n                    <li class=\"time-slot\" ng-class=\"{\'selected\': slot.selected, \'disabled\': slot.disabled}\" ng-disabled=\"slot.disabled\" ng-click=\"highlightSlot(slot, selected_day)\" ng-repeat=\"slot in slots | in_the_future | limitTo: 10\">\r\n                      <span>{{slot.time_moment | datetime: \'time\'}} (in {{slot.time | tod_from_now }})</span>\r\n                    </li>\r\n\r\n                  </ul>\r\n\r\n                  <p class=\"text-center\" ng-if=\"slots.length == 0\">No availability found, try a different time-range</p>\r\n\r\n                </div>\r\n              </div>\r\n\r\n            </div>\r\n\r\n          </div>\r\n\r\n        </div>\r\n\r\n        <div ng-if=\"calendar_view.day\">\r\n\r\n          <div class=\"bb-day-nav\">\r\n\r\n            <button type=\"button\" class=\"btn btn-icon btn-lg\" ng-click=\"subtract(\'days\', 1)\">\r\n              <span class=\"glyphicon glyphicon-chevron-left\"></span>\r\n              <!-- <span class=\"hidden-xs\">Previous</span> -->\r\n            </button>\r\n\r\n            <h2 class=\"hidden-xs bb-day-nav-heading\">{{selected_date | datetime: \'Do MMMM YYYY\'}}</h2>\r\n            <h2 class=\"hidden-sm hidden-md hidden-lg bb-day-nav-heading\">{{selected_date | datetime: \'Do MMMM\'}}</h2>\r\n\r\n            <button type=\"button\" class=\"btn btn-icon btn-lg\" ng-click=\"add(\'days\', 1)\">\r\n              <span class=\"glyphicon glyphicon-chevron-right\"></span>\r\n              <!-- <span class=\"hidden-xs\">Next</span> -->\r\n            </button>\r\n\r\n          </div>\r\n\r\n          <div class=\"bb-calendar\">\r\n\r\n            <div ng-show=\"!slots || (slots && slots.length == 0)\">\r\n              <p class=\"text-center\">No availability found</p>\r\n            </div>\r\n\r\n            <div ng-if=\"slots\">\r\n\r\n              <div accordion close-others=\"false\">\r\n\r\n                <div bb-accordion-range-group=\"{heading: \'Morning\', range: [0, 720], collaspe_when_time_selected: true}\" day=\"selected_day\" slots=\"slots\" select-slot=\"highlightSlot\" ng-init=\"setFormDataStoreId($index)\" class=\"accordion-group\">\r\n                </div>\r\n\r\n                <div bb-accordion-range-group=\"{heading: \'Afternoon\', range: [720, 1020], collaspe_when_time_selected: true}\" day=\"selected_day\" slots=\"slots\" select-slot=\"highlightSlot\" ng-init=\"setFormDataStoreId($index)\" class=\"accordion-group\">\r\n                </div>\r\n\r\n                <div bb-accordion-range-group=\"{heading: \'Evening\', range: [1020, 1440], collaspe_when_time_selected: true}\" day=\"selected_day\" slots=\"slots\" select-slot=\"highlightSlot\" ng-init=\"setFormDataStoreId($index)\" class=\"accordion-group\">\r\n                </div>\r\n\r\n              </div>\r\n\r\n            </div>\r\n\r\n          </div>\r\n\r\n        </div>\r\n\r\n        <div ng-if=\"calendar_view.multi_day\">\r\n          <div bb-time-ranges=\"{selected_day: today}\"></div>\r\n        </div>\r\n\r\n        <button type=\"button\" class=\"btn btn-primary pull-right\" ng-click=\"checkReady() && routeReady()\" bb-debounce ng-disabled=\"!bb.current_item.time\">Book</button>\r\n\r\n      </div>\r\n\r\n    </div>\r\n\r\n    <!-- OVERBOOK (when availability conflict detected) -->\r\n    <div class=\"panel panel-danger\" ng-show=\"availability_conflict\">\r\n      <div class=\"panel-heading\"><strong>Overbook</strong></div>\r\n      <div class=\"panel-body\">\r\n\r\n        <p>Overbooking ignores booking time step and availability constraints to make a booking.</p>\r\n\r\n        <ul class=\"bb-list bb-list-horizontal bb-bordered bb-block bb-block-sm\">\r\n          <li>\r\n            <i class=\"fa fa-calendar\" aria-hidden=\"true\"></i>\r\n            {{bb.current_item.defaults.datetime | datetime: \'date\'}}\r\n          </li>\r\n          <li>\r\n            <i class=\"fa fa-clock-o\" aria-hidden=\"true\"></i>\r\n            {{bb.current_item.defaults.datetime | datetime: \'time\'}}\r\n          </li>\r\n          <li ng-show=\"bb.current_item.defaults.person\">\r\n            <i class=\"fa fa-user\" aria-hidden=\"true\"></i>\r\n            {{bb.current_item.defaults.person.name}}\r\n          </li>\r\n          <li ng-show=\"bb.current_item.defaults.resource\">\r\n            <i class=\"fa fa-home\" aria-hidden=\"true\"></i>\r\n            {{bb.current_item.defaults.resource.name}}\r\n          </li>\r\n        </ul>\r\n\r\n        <button type=\"button\" class=\"btn btn-danger pull-right\" ng-click=\"overBook()\" bb-debounce>Overbook</button>\r\n\r\n      </div>\r\n\r\n    </div>\r\n\r\n  </div>\r\n\r\n  <div class=\"bb-step-navigation\">\r\n    <div class=\"row\">\r\n      <div class=\"col-sm-9 col-sm-push-3 text-right\"></div>\r\n      <div class=\"col-sm-3 col-sm-pull-9\">\r\n        <button type=\"button\" class=\"btn btn-default\" bb-debounce ng-click=\"loadPreviousStep()\" ng-show=\"bb.current_step > 1\">Back</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n");
$templateCache.put("check_items.html","<div bb-item-details ng-init=\"checkStepTitle(\'Booking Summary\')\">\r\n\r\n  <div bb-include=\"_basket_item_summary\">\r\n  </div>\r\n\r\n  <form name=\"booking_form\" class=\"form-horizontal\" role=\"form\" bb-form>\r\n\r\n    <div class=\"bb-subcontent\">\r\n\r\n      <div bb-custom-booking-text class=\"bb-message-node\">\r\n        <div ng-repeat=\"msg in messages\" ng-bind-html=\"msg\"></div>\r\n      </div>\r\n\r\n      <div ng-show=\"item_details.hasQuestions\" class=\"question-node\">\r\n        <div ng-form=\"booking_questions_form\" role=\"form\" novalidate>\r\n          <h3 class=\"booking-form-header\">Questions</h3>\r\n\r\n          <div ng-repeat=\"question in item_details.questions\" bb-question-line ng-show=\"question.currentlyShown\">\r\n            <div class=\"form-group\" ng-class=\"{\'has-error\': booking_questions_form[\'q\' + question.id].$invalid && (booking_questions_form[\'q\' + question.id].dirty || booking_form.submitted)}\">\r\n              <label bb-question-label=\"question\" class=\"control-label col-sm-offset-1 col-sm-3\" ng-show=\"question.name\" for=\"{{question.id}}\"\r\n              >{{question.name}}<span ng-show=\"question.required\">*</span>:\r\n              </label>\r\n              <div class=\"col-sm-5\">\r\n                <input bb-question=\"question\"/>\r\n                <br/>\r\n                <small ng-show=\"question.help_text\">{{question.help_text}}<hr/></small>\r\n              </div>\r\n              <div class=\"col-sm-offset-4 messages\">\r\n                <div class=\"error-message\" ng-show=\"question.required.$invalid && booking_form.submitted\">\r\n                  This field is required\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n      </div>\r\n\r\n      <div class=\"question-node\">\r\n        <label for=\"notes\">Booking Notes (optional):</label>\r\n        <span>\r\n          <textarea ng-model=\"item.private_note\" name=\"note\" id=\"note\" rows=\"3\" class=\"form-question form-control\"></textarea><br>\r\n         </span>\r\n      </div>\r\n      \r\n    \r\n\r\n    </div>\r\n\r\n    <div class=\"bb-step-navigation\">\r\n      <div class=\"row\">\r\n        <div class=\"col-sm-9 col-sm-push-3 text-right\">\r\n          <button type=\"submit\" class=\"btn btn-primary pull-right\" ng-click=\"confirm(booking_form)\">Book</button>\r\n        </div>\r\n        <div class=\"col-sm-3 col-sm-pull-9\">\r\n          <button type=\"button\" class=\"btn btn-default pull-left\" ng-click=\"loadPreviousStep()\" ng-show=\"bb.current_step > 1\">Back</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n  </form>\r\n\r\n\r\n</div>");
$templateCache.put("client.html","<div bb-admin-booking-clients>\r\n\r\n  <div class=\"page-header\">\r\n    <h1>Select a customer</h1>\r\n  </div>\r\n\r\n  <div class=\"admin-typehead-wrapper\" ng-form bb-form name=\"client_search_form\">\r\n    <div class=\"form-group\" ng-class=\"{\'has-error\': client_search_form.result.$invalid && (client_search_form.result.$dirty || client_search_form.submitted)}\">\r\n      <div class=\"input-group\" ng-class=\"{\'animated shake\': !typehead_result && search_triggered}\">\r\n        <input class=\"input-lg form-control\" name=\"result\" ng-model=\"typehead_result\" placeholder=\"Search by email or name\" required typeahead=\"item.name for item in searchClients($viewValue)\" typeahead-template-url=\"_typehead.html\" typeahead-loading=\"customer_typeahead_loading\" typeahead-no-results=\"no_results\" class=\"form-control\" typeahead-on-select=\"typeHeadResults($item, $modal, $label)\" typeahead-focus-first=\"false\" typeahead-min-length=\"2\">\r\n        <span class=\"input-group-btn\">\r\n          <button type=\"button\" class=\"btn btn-primary btn-lg\" ng-click=\"submitForm(); getClients({filter_by: typehead_result})\"><i class=\"fa fa-search\"></i></button>\r\n        </span>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <script type=\"text/ng-template\" id=\"_typehead.html\">\r\n\r\n    <div class=\"bb-typehead-results-wrapper\">\r\n\r\n      <ul class=\"bb-list bb-list-sm\">\r\n        <li class=\"bb-typh-header\">\r\n          {{match.model.name}}\r\n        </li>\r\n        <li ng-show=\"match.model.email\">\r\n          <i class=\"fa fa-envelope-o fa-fw\"></i>\r\n          {{match.model.email}}\r\n        </li>\r\n        <li ng-show=\"match.model.mobile && !match.model.email\">\r\n          <i class=\"fa fa-mobile fa-lg fa-fw\"></i>\r\n          {{match.model.mobile | local_phone_number}}\r\n        </li>\r\n        <li ng-show=\"match.model.phone && !match.model.email\">\r\n          <i class=\"fa fa-phone fa-fw\"></i>\r\n          {{match.model.phone | local_phone_number}}\r\n        </li>\r\n      </ul>\r\n\r\n    </div>\r\n\r\n  </script>\r\n\r\n  <div ng-if=\"search_complete\" class=\"search-results\">\r\n\r\n    <div class=\"bb-block\" ng-show=\"clients.num_items > 0\">\r\n\r\n      <div class=\"row\">\r\n\r\n        <div class=\"col-sm-6\">\r\n          <div class=\"bb-search-summary\">{{clients.num_items}} customer<span ng-show=\"clients.num_items > 1\">s</span> found</div>\r\n\r\n          <button class=\"btn btn-link\" ng-click=\"clearSearch()\">Clear</button>\r\n\r\n        </div>\r\n\r\n        <div class=\"col-sm-6\">\r\n\r\n          <div class=\"form-inline bb-search-options\">\r\n\r\n            <div class=\"form-group\">\r\n              <label class=\"bb-label\" for=\"sort_by\">Sort by: </label>\r\n              <select ng-model=\"sort_by\" id=\"sort_by\" class=\"form-control\" ng-options=\"option.key as option.name for option in sort_by_options\" ng-change=\"sortChanged(sort_by)\">\r\n              </select>\r\n            </div>\r\n\r\n          </div>\r\n\r\n        </div>\r\n      </div>\r\n\r\n    </div>\r\n\r\n    <div class=\"bb-block text-center\" ng-show=\"clients.num_items == 0\">\r\n      <p>\r\n        No customers matching <strong>{{typehead_result}}</strong> found\r\n      </p>\r\n      <p>\r\n        <button class=\"btn btn-link\" ng-click=\"clearSearch()\">Create one instead?</button>\r\n      </p>\r\n    </div>\r\n\r\n    <div class=\"clearfix\"></div>\r\n\r\n    <ul class=\"bb-list bb-list-bordered bb-list-fade-in\">\r\n\r\n      <li ng-repeat=\"client in clients.items | startFrom: (clients.current_page - 1) * clients.page_size | limitTo: clients.page_size track by $index\">\r\n\r\n        <div class=\"typehead-item-wrapper\">\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-sm-10\">\r\n\r\n              <h3>\r\n                <span ng-show=\"sort_by != \'last_name\'\">\r\n                  {{client.name}}\r\n                </span>\r\n                <span ng-show=\"sort_by == \'last_name\'\">\r\n                  {{client.last_name}}, {{client.first_name}}\r\n                </span>\r\n              </h3>\r\n\r\n              <ul class=\"bb-list bb-list-horizontal\">\r\n                <li ng-show=\"client.email\">\r\n                  <i class=\"fa fa-envelope-o fa-fw\"></i>\r\n                  {{client.email}}\r\n                </li>\r\n                <li ng-show=\"client.mobile\">\r\n                  <i class=\"fa fa-mobile fa-lg fa-fw\"></i>\r\n                  {{client.mobile | local_phone_number}}\r\n                </li>\r\n                <li ng-show=\"client.phone\">\r\n                  <i class=\"fa fa-phone fa-fw\"></i> {{client.phone | local_phone_number}}\r\n                </li>\r\n              </ul>\r\n\r\n            </div>\r\n            <div class=\"col-sm-2\">\r\n              <button class=\"btn btn-primary btn-block btn-select-client\" ng-click=\"selectClient(client);\">Select</button>\r\n            </div>\r\n          </div>\r\n\r\n        </div>\r\n\r\n      </li>\r\n\r\n    </ul>\r\n\r\n    <pagination total-items=\"clients.num_items\"\r\n      ng-model=\"clients.current_page\" items-per-page=\"clients.page_size\"\r\n      max-size=\"clients.max_size\" boundary-links=\"true\" rotate=\"false\"\r\n      num-pages=\"clients.num_pages\" ng-show=\"clients.num_items > clients.page_size\" ng-change=\"pageChanged()\"></pagination>\r\n\r\n  </div>\r\n\r\n  <div ng-hide=\"search_complete\" class=\"admin-create-client\">\r\n\r\n    <hr />\r\n\r\n    <div class=\"panel panel-default\">\r\n      <div class=\"panel-heading\"><strong>Create Customer</strong></div>\r\n      <div class=\"panel-body\">\r\n\r\n        <div ng-form name=\"client_form\" bb-form>\r\n\r\n          <div class=\"form-group\" ng-class=\"{\'has-error\': client_form.first_name.$invalid && client_form.submitted}\">\r\n            <label for=\"first_name\" class=\"control-label\">First Name:</label><br />\r\n            <input type=\"text\" name=\"first_name\" id=\"first_name\" required ng-model=\"client.first_name\" class=\"form-control\"/>\r\n          </div>\r\n\r\n          <div class=\"form-group\" ng-class=\"{\'has-error\': client_form.last_name.$invalid && client_form.submitted}\">\r\n            <label for=\"last_name\" class=\"control-label\">Last Name:</label><br />\r\n            <input type=\"text\" name=\"last_name\" id=\"last_name\" required ng-model=\"client.last_name\" class=\"form-control\"/>\r\n          </div>\r\n\r\n          <div class=\"form-group\" ng-class=\"{\'has-error\': client_form.email.$invalid && client_form.submitted}\">\r\n            <label for=\"email\" class=\"control-label\">E-mail:</label>\r\n            <input type=\"email\" name=\"email\" id=\"email\" ng-required=\"!client.mobile\" ng-model=\"client.email\" class=\"form-control\"/>\r\n          </div>\r\n\r\n          <div class=\"form-group\" ng-class=\"{\'has-error\': client_form.mobile.$invalid && client_form.submitted}\">\r\n            <label for=\"mobile\" class=\"control-label\">Mobile:</label>\r\n            <input type=\"text\" name=\"mobile\" id=\"mobile\" ng-model=\"client.mobile\" class=\"form-control\" ng-required=\"!client.email || bb.company.settings.ask_mobile_phone\"/>\r\n          </div>\r\n\r\n          <div ng-show=\"bb.company_settings.ask_address\">\r\n\r\n            <div class=\"form-group\" ng-class=\"{\'has-error\': client_form.address1.$invalid && ((client_form.address1.$dirty && !client_form.address1.$focused) || booking_form.submitted)}\">\r\n              <label for=\"address1\" class=\"control-label\">Address:</label>\r\n              <div>\r\n                <input type=\"text\" name=\"address1\" id=\"address1\" ng-model=\"client.address1\" class=\"form-control\"/>\r\n              </div>\r\n              <div class=\"col-sm-3 messages\">\r\n                <div class=\"error-message\" ng-show=\"client_form.address1.$invalid && booking_form.submitted\">\r\n                  Please enter your address\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"form-group\" ng-class=\"{\'has-error\': client_form.address2.$invalid && ((client_form.address2.$dirty && !client_form.address2.$focused) || booking_form.submitted)}\">\r\n              <label for=\"address2\" class=\"control-label\"></label>\r\n              <div>\r\n                <input type=\"text\" name=\"address2\" id=\"address2\" ng-model=\"client.address2\" class=\"form-control\"/>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"form-group\" ng-class=\"{\'has-error\': client_form.address3.$invalid && ((client_form.address3.$dirty && !client_form.address3.$focused) || booking_form.submitted)}\">\r\n              <label for=\"address3\" class=\"control-label\">Town:</label>\r\n              <div>\r\n                <input type=\"text\" name=\"address3\" id=\"address3\" ng-model=\"client.address3\" class=\"form-control\"/>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"form-group\" ng-class=\"{\'has-error\': client_form.address4.$invalid && booking_form.submitted}\">\r\n              <label for=\"address4\" class=\"control-label\">County:</label>\r\n              <div>\r\n                <input type=\"text\" name=\"address4\" id=\"address4\" ng-model=\"client.address4\" class=\"form-control\"/>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"form-group\" ng-class=\"{\'has-error\': client_form.postcode.$invalid && ((client_form.postcode.$dirty && !client_form.postcode.$focused) || booking_form.submitted)}\">\r\n              <label for=\"postcode\" class=\"control-label\">Postcode:</label>\r\n              <div>\r\n                <input type=\"text\" name=\"postcode\" id=\"postcode\" ng-model=\"client.postcode\" class=\"form-control\"/>\r\n              </div>\r\n            </div>\r\n\r\n\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-sm-3\">\r\n              <button type=\"submit\" class=\"btn btn-primary btn-block\" ng-click=\"submitForm(client_form) && createClient()\" bb-debounce>Create Customer</button>\r\n            </div>\r\n          </div>\r\n\r\n        </div>\r\n\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n\r\n  <div class=\"bb-step-navigation\">\r\n    <div class=\"row\">\r\n      <div class=\"col-sm-9 col-sm-push-3 text-right\">\r\n        <!-- <button type=\"submit\" class=\"btn btn-primary\" ng-click=\"confirm(booking_form) && validator.validateForm(booking_form) && checkReady() && routeReady()\">Confirm</button> -->\r\n      </div>\r\n      <div class=\"col-sm-3 col-sm-pull-9\">\r\n        <button type=\"button\" class=\"btn btn-default\" bb-debounce ng-click=\"loadPreviousStep()\" ng-show=\"bb.current_step > 1\">Back</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n");
$templateCache.put("main.html","<div class=\"header\">\r\n\r\n  <div bb-form-data-store></div>\r\n\r\n  <!-- BREADCRUMB ROUTE\r\n  <div bb-breadcrumbs class=\"breadcrumbs_holder\" ng-init=\"setRoute([\r\n    {page:\'event_list\', title: \'Select an event\'},\r\n    {page:\'event\', title: \'Event\'},\r\n    {page:\'checkout\', title: \'Confirmation\'}\r\n    ])\">\r\n\r\n    <ol class=\"breadcrumb\"> \r\n      <li ng-repeat=\"step in bb.allSteps\" ng-class=\"{\'active\': step.active, \'passed\': step.passed, \'disabled\': isDisabledStep(step)}\">\r\n        <button type=\"button\" ng-click=\"loadStep(step.number)\" ng-class=\"{\'active\': step.active, \'passed\': step.passed}\" ng-disabled=\"isDisabledStep(step)\">\r\n          <span class=\"step-num\">{{step.number}}.</span>\r\n          <span class=\"step-title\">{{step.title}}</span>\r\n        </button>\r\n      </li>\r\n    </ol>\r\n  </div> \r\n  -->\r\n\r\n  <!-- PROGRESSBAR\r\n  <div progressbar value=\"bb.percentage_complete\" type=\"primary\"></div>\r\n  -->\r\n\r\n  <!-- STEP INDICATOR\r\n  <div ng-if=\"bb.current_step\" class=\"step-heading\">\r\n    <span ng-if=\"bb.current_step != 1 && bb.current_step <  bb.allSteps.length\" ng-bind=\"\'Step \' + (bb.current_step - 1) + \' of \' + (bb.allSteps.length - 2)\"></span>\r\n    <span ng-if=\"bb.current_step == bb.allSteps.length\" ng-bind=\"\'Complete\'\"></span>\r\n  </div> -->\r\n\r\n  <div class=\"alerts\" bb-scroll-to=\"alert:raised\" bb-always-scroll>\r\n    <div alert ng-repeat=\"alert in $root.alerts\" type=\"{{alert.type}}\" >\r\n      <ul>\r\n        <li ng-bind-html=\"alert.msg\"></li>\r\n      </ul>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n\r\n<div class=\"bb-content\">\r\n\r\n  <div bb-content class=\"ng-cloak\"></div>\r\n  <div bb-display-mode></div>\r\n\r\n  <div bb-loading class=\"bb-loader\" >\r\n    <div id=\"loading_icon\">\r\n      <div id=\"wait_graphic\">&nbsp;</div>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n");
$templateCache.put("quick_pick.html","<div class=\"bb-quick-pick\" bb-wait-for=\"quickEmptybasket()\" bb-wait-var=\"all_done\" ng-if=\"all_done\" bb-form-data-store bb-page>\r\n\r\n  <div ng-form name=\"appointment-booking-form\">\r\n\r\n    <h1>Make a Booking</h1>\r\n\r\n    <div bb-services>\r\n      <div class=\"form-group\">\r\n        <label>Service</label>\r\n        \r\n        <!-- TODO use display_name -->\r\n        <select id=\"service\" ng-model=\"service\" ng-options=\"s.name for s in bookable_services | orderBy: \'name\'\" class=\"form-control\">\r\n          <option value=\"\">-- select a service --</option>\r\n        </select>\r\n        \r\n      </div>\r\n    </div>\r\n    \r\n    <button type=\"button\" class=\"btn btn-primary\" ng-click=\"checkReady() && routeReady(\'calendar\')\" bb-debounce ng-disabled=\"!bb.current_item.service\">Book</button>\r\n\r\n    <hr>\r\n\r\n  </div>\r\n\r\n  <div ng-form name=\"block_time_form\" class=\"bb-block-time\" bb-block-time>\r\n\r\n    <h1>Block Time</h1>\r\n    <div class=\"form-group\" ng-class=\"{\'has-error\': resourceError}\">\r\n      <label>For</label>\r\n      <select id=\"resource\" ng-model=\"picked_resource\" ng-change=\"changeResource()\" ng-options=\"item.identifier as item.name group by item.group for item in resources\" class=\"form-control\">\r\n        <option value=\"\">-- select --</option>\r\n      </select>\r\n      <p class=\"text-danger\" ng-init=\"resourceError=false\" ng-show=\"resourceError\">Please select a resource or member of staff</p>\r\n    </div>\r\n    <div class=\"form-group\" ng-init=\"blockWholeDay = false\" ng-hide=\"hideBlockAllDay\">\r\n      <label>Block whole day &nbsp;&nbsp;<toggle-switch ng-model=\"blockWholeDay\" ng-change=\"changeBlockDay(blockWholeDay)\" class=\"switch-primary switch-small\" on-label=\"Yes\" off-label=\"No\"></toggle-switch></label>\r\n    </div>\r\n    <div class=\"row\" ng-hide=\"blockWholeDay\">\r\n      <div class=\"col-md-6\">\r\n        <div class=\"form-group\">\r\n          <label>From</label>\r\n          <div bb-date-time-picker date=\"config.from_datetime\" max-date=\"config.to_datetime\" min-date=\"config.min_date\"></div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-md-6\">\r\n        <div class=\"form-group\">\r\n          <label>To</label>\r\n          <div bb-date-time-picker date=\"config.to_datetime\" min-date=\"config.from_datetime\" max-date=\"config.max_date\"></div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <button type=\"button\" class=\"btn btn-primary\" ng-click=\"blockTime()\" bb-debounce ng-disabled=\"false\">Block Time</button>\r\n\r\n  </div>\r\n\r\n  <hr>\r\n\r\n</div>\r\n");
$templateCache.put("_typeahead.html","<div class=\"typeahead_match\">\r\n  <div class=\"match_name\">{{match.label}}</div>\r\n  <div class=\"match_email\">{{match.model.email}}</div>\r\n</div>");}]);