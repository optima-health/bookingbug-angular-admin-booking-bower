angular.module("BB").run(["$templateCache", function($templateCache) {$templateCache.put("_typeahead.html","<div class=\"typeahead_match\">\n  <div class=\"match_name\">{{match.label}}</div>\n  <div class=\"match_email\">{{match.model.email}}</div>\n</div>");
$templateCache.put("admin_booking_popup.html","<div class=\"modal-header\">\n  <button type=\"button\" class=\"close\" ng-click=\"cancel()\">&times;</button>\n</div>\n<div class=\"modal-body\" style=\"min-height: 200px\">\n  <div id=\"bb\" bb-admin-booking=\"{{config}}\" class=\"container-fluid\"></div>\n</div>\n");
$templateCache.put("calendar.html","<div bb-page>\n\n  <div bb-admin-calendar class=\"bb-admin-calendar\">\n\n    <div class=\"page-header\">\n      <h1 ng-show=\"availability_conflict\">Availability Conflict</h1>\n      <h1 ng-show=\"!availability_conflict\">Select a time</h1>\n    </div>\n\n    <div class=\"page-summary\" ng-show=\"availability_conflict\">\n\n      <p>\n        There\'s an availability conflict <span ng-show=\"person_name\">with {{person_name}}</span><span ng-show=\"resource_name\">in {{resource_name}}</span>.\n           <!--at {{bb.current_item.defaults.datetime | datetime: \'time\'}} -->  This can be the result of: <!-- either the person or resouce requried already be booked/unavailable or that there\'s not enough to complete the service. You can r -->\n      </p>\n\n      <div class=\"row\">\n        <ul class=\"bb-bullet-list\">\n          <div class=\"col-sm-6 col-md-4\">\n            <li>The Staff/Resource being booked or blocked already</li>\n          </div>\n          <div class=\"col-sm-6 col-md-4\">\n            <li>Not enough available time to complete the booking before an existing one starts</li>\n          </div>\n          <div class=\"col-sm-6 col-md-4\">\n            <li>The selected time being outside of the {{bb.current_item.service.booking_time_step | time_period}} booking time step for {{bb.current_item.service.name}}.</li>\n          </div>\n        </ul>\n      </div>\n\n      <p>You can either use the calendar to choose another time or overbook.</p>\n\n    </div>\n\n    <div class=\"page-summary\" ng-show=\"!availability_conflict\">\n      Select a time for the booking.\n    </div>\n\n    <!-- CALENDAR (with First available/Day/Week view)-->\n    <div class=\"panel panel-default\">\n      <div class=\"panel-heading\"><strong>Calendar</strong></div>\n      <div class=\"panel-body\">\n\n\n        <div class=\"row\">\n          <div class=\"col-sm-8\">\n\n            <div class=\"form-inline\">\n\n              <div class=\"bb-label\">\n                <span class=\"glyphicon glyphicon-filter\" aria-hidden=\"true\"></span>\n                Filter by:\n              </div>\n\n              <div class=\"form-group\" ng-if=\"bb.company.$has(\'people\')\">\n                <select bb-people class=\" form-control\" id=\"person\" ng-model=\"person\" ng-options=\"p.name for p in bookable_people | orderBy: \'name\'\">\n                  <option value=\"\">Any person</option>\n                </select>\n              </div>\n\n              <div class=\"form-group\" ng-if=\"bb.company.$has(\'resources\')\">\n                <select bb-resources=\"{allow_single_pick: true}\" class=\"form-control\"  id=\"resource\" ng-model=\"resource\" ng-options=\"r.name for r in bookable_resources | orderBy: \'name\'\">\n                  <option value=\"\">Any resource</option>\n                </select>\n              </div>\n\n            </div>\n          </div>\n\n          <div class=\"col-sm-4\">\n            <div class=\"bb-view-switcher hidden-xs\">\n              <div class=\"btn-group pull-right\">\n                <button class=\"btn btn-sm btn-default\" ng-class=\"{active: calendar_view.next_available}\" ng-click=\"switchView(\'next_available\')\" ng-if=\"bb.item_defaults.pick_first_time\">\n                  <i class=\"fa fa-calendar-check-o\"></i> First available\n                </button>\n                <button class=\"btn btn-sm btn-default\" ng-class=\"{active: calendar_view.day}\" ng-click=\"switchView(\'day\')\">\n                  <i class=\"fa fa-calendar-times-o\"></i> Day\n                </button>\n                <button class=\"btn btn-sm btn-default\" ng-class=\"{active: calendar_view.multi_day}\" ng-click=\"switchView(\'multi_day\')\">\n                  <i class=\"fa fa-calendar-o\"></i>\n                  <span class=\"visible-sm-inline\">3 day</span>\n                  <span class=\"visible-md-inline\">5 day</span>\n                  <span class=\"visible-lg-inline\">7 day</span>\n                </button>\n              </div>\n            </div>\n          </div>\n\n        </div>\n\n        <div ng-if=\"calendar_view.next_available\">\n\n          <div class=\"bb-day-nav\">\n\n            <h2 class=\"hidden-xs bb-day-nav-heading\">{{selected_date | datetime: \'Do MMMM YYYY\'}}</h2>\n            <h2 class=\"hidden-sm hidden-md hidden-lg bb-day-nav-heading\">{{selected_date | datetime: \'Do MMMM\'}}</h2>\n\n          </div>\n\n          <div class=\"bb-calendar\">\n\n            <div class=\"panel-group\">\n              <div class=\"accordion-group\">\n                <div class=\"panel panel-default\">\n\n                  <ul class=\"time-slots\" ng-if=\"slots.length > 0\">\n\n                    <li class=\"time-slot\" ng-class=\"{\'selected\': slot.selected, \'disabled\': slot.disabled}\" ng-disabled=\"slot.disabled\" ng-click=\"highlightSlot(slot, selected_day)\" ng-repeat=\"slot in slots | in_the_future | limitTo: 10\">\n                      <span>{{slot.time_moment | datetime: \'time\'}} (in {{slot.time | tod_from_now }})</span>\n                    </li>\n\n                  </ul>\n\n                  <p class=\"text-center\" ng-if=\"slots.length == 0\">No availability found, try a different time-range</p>\n\n                </div>\n              </div>\n\n            </div>\n\n          </div>\n\n        </div>\n\n        <div ng-if=\"calendar_view.day\">\n\n          <div class=\"bb-day-nav\">\n\n            <button type=\"button\" class=\"btn btn-icon btn-lg\" ng-click=\"subtract(\'days\', 1)\">\n              <span class=\"glyphicon glyphicon-chevron-left\"></span>\n              <!-- <span class=\"hidden-xs\">Previous</span> -->\n            </button>\n\n            <h2 class=\"hidden-xs bb-day-nav-heading\">{{selected_date | datetime: \'Do MMMM YYYY\'}}</h2>\n            <h2 class=\"hidden-sm hidden-md hidden-lg bb-day-nav-heading\">{{selected_date | datetime: \'Do MMMM\'}}</h2>\n\n            <button type=\"button\" class=\"btn btn-icon btn-lg\" ng-click=\"add(\'days\', 1)\">\n              <span class=\"glyphicon glyphicon-chevron-right\"></span>\n              <!-- <span class=\"hidden-xs\">Next</span> -->\n            </button>\n\n          </div>\n\n          <div class=\"bb-calendar\">\n\n            <div ng-show=\"!slots || (slots && slots.length == 0)\">\n              <p class=\"text-center\">No availability found</p>\n            </div>\n\n            <div ng-if=\"slots\">\n\n              <div accordion close-others=\"false\">\n\n                <div bb-accordion-range-group=\"{heading: \'Morning\', range: [0, 720], collaspe_when_time_selected: true}\" day=\"selected_day\" slots=\"slots\" select-slot=\"highlightSlot\" ng-init=\"setFormDataStoreId($index)\" class=\"accordion-group\">\n                </div>\n\n                <div bb-accordion-range-group=\"{heading: \'Afternoon\', range: [720, 1020], collaspe_when_time_selected: true}\" day=\"selected_day\" slots=\"slots\" select-slot=\"highlightSlot\" ng-init=\"setFormDataStoreId($index)\" class=\"accordion-group\">\n                </div>\n\n                <div bb-accordion-range-group=\"{heading: \'Evening\', range: [1020, 1440], collaspe_when_time_selected: true}\" day=\"selected_day\" slots=\"slots\" select-slot=\"highlightSlot\" ng-init=\"setFormDataStoreId($index)\" class=\"accordion-group\">\n                </div>\n\n              </div>\n\n            </div>\n\n          </div>\n\n        </div>\n\n        <div ng-if=\"calendar_view.multi_day\">\n          <div bb-time-ranges=\"{selected_day: today}\"></div>\n        </div>\n\n        <button type=\"button\" class=\"btn btn-primary pull-right\" ng-click=\"checkReady() && routeReady()\" bb-debounce ng-disabled=\"!bb.current_item.time\">Book</button>\n\n      </div>\n\n    </div>\n\n    <!-- OVERBOOK (when availability conflict detected) -->\n    <div class=\"panel panel-danger\" ng-show=\"availability_conflict\">\n      <div class=\"panel-heading\"><strong>Overbook</strong></div>\n      <div class=\"panel-body\">\n\n        <p>Overbooking ignores booking time step and availability constraints to make a booking.</p>\n\n        <ul class=\"bb-list bb-list-horizontal bb-bordered bb-block bb-block-sm\">\n          <li>\n            <i class=\"fa fa-calendar\" aria-hidden=\"true\"></i>\n            {{bb.current_item.defaults.datetime | datetime: \'date\'}}\n          </li>\n          <li>\n            <i class=\"fa fa-clock-o\" aria-hidden=\"true\"></i>\n            {{bb.current_item.defaults.datetime | datetime: \'time\'}}\n          </li>\n          <li ng-show=\"bb.current_item.defaults.person\">\n            <i class=\"fa fa-user\" aria-hidden=\"true\"></i>\n            {{bb.current_item.defaults.person.name}}\n          </li>\n          <li ng-show=\"bb.current_item.defaults.resource\">\n            <i class=\"fa fa-home\" aria-hidden=\"true\"></i>\n            {{bb.current_item.defaults.resource.name}}\n          </li>\n        </ul>\n\n        <button type=\"button\" class=\"btn btn-danger pull-right\" ng-click=\"overBook()\" bb-debounce>Overbook</button>\n\n      </div>\n\n    </div>\n\n  </div>\n\n  <div class=\"bb-step-navigation\">\n    <div class=\"row\">\n      <div class=\"col-sm-9 col-sm-push-3 text-right\"></div>\n      <div class=\"col-sm-3 col-sm-pull-9\">\n        <button type=\"button\" class=\"btn btn-default\" bb-debounce ng-click=\"loadPreviousStep()\" ng-show=\"bb.current_step > 1\">Back</button>\n      </div>\n    </div>\n  </div>\n\n</div>\n");
$templateCache.put("check_items.html","<div bb-item-details ng-init=\"checkStepTitle(\'Booking Summary\')\">\n\n  <div bb-include=\"_basket_item_summary\">\n  </div>\n\n  <form name=\"booking_form\" class=\"form-horizontal\" role=\"form\" bb-form>\n\n    <div class=\"bb-subcontent\">\n\n      <div bb-custom-booking-text class=\"bb-message-node\">\n        <div ng-repeat=\"msg in messages\" ng-bind-html=\"msg\"></div>\n      </div>\n\n      <div ng-show=\"item_details.hasQuestions\" class=\"question-node\">\n        <div ng-form=\"booking_questions_form\" role=\"form\" novalidate>\n          <h3 class=\"booking-form-header\">Questions</h3>\n\n          <div ng-repeat=\"question in item_details.questions\" bb-question-line ng-show=\"question.currentlyShown\">\n            <div class=\"form-group\" ng-class=\"{\'has-error\': booking_questions_form[\'q\' + question.id].$invalid && (booking_questions_form[\'q\' + question.id].dirty || booking_form.submitted)}\">\n              <label bb-question-label=\"question\" class=\"control-label col-sm-offset-1 col-sm-3\" ng-show=\"question.name\" for=\"{{question.id}}\"\n              >{{question.name}}<span ng-show=\"question.required\">*</span>:\n              </label>\n              <div class=\"col-sm-5\">\n                <input bb-question=\"question\"/>\n                <br/>\n                <small ng-show=\"question.help_text\">{{question.help_text}}<hr/></small>\n              </div>\n              <div class=\"col-sm-offset-4 messages\">\n                <div class=\"error-message\" ng-show=\"question.required.$invalid && booking_form.submitted\">\n                  This field is required\n                </div>\n              </div>\n            </div>\n          </div>\n      </div>\n\n      <div class=\"question-node\">\n        <label for=\"notes\">Booking Notes (optional):</label>\n        <span>\n          <textarea ng-model=\"item.private_note\" name=\"note\" id=\"note\" rows=\"3\" class=\"form-question form-control\"></textarea><br>\n         </span>\n      </div>\n      \n    \n\n    </div>\n\n    <div class=\"bb-step-navigation\">\n      <div class=\"row\">\n        <div class=\"col-sm-9 col-sm-push-3 text-right\">\n          <button type=\"submit\" class=\"btn btn-primary pull-right\" ng-click=\"confirm(booking_form)\">Book</button>\n        </div>\n        <div class=\"col-sm-3 col-sm-pull-9\">\n          <button type=\"button\" class=\"btn btn-default pull-left\" ng-click=\"loadPreviousStep()\" ng-show=\"bb.current_step > 1\">Back</button>\n        </div>\n      </div>\n    </div>\n\n  </form>\n\n\n</div>");
$templateCache.put("client.html","<div bb-admin-booking-clients>\n\n  <div class=\"page-header\">\n    <h1>Select a customer</h1>\n  </div>\n\n  <div class=\"admin-typehead-wrapper\" ng-form bb-form name=\"client_search_form\">\n    <div class=\"form-group\" ng-class=\"{\'has-error\': client_search_form.result.$invalid && (client_search_form.result.$dirty || client_search_form.submitted)}\">\n      <div class=\"input-group\" ng-class=\"{\'animated shake\': !typehead_result && search_triggered}\">\n        <input class=\"input-lg form-control\" name=\"result\" ng-model=\"typehead_result\" placeholder=\"Search by email or name\" required typeahead=\"item.name for item in searchClients($viewValue)\" typeahead-template-url=\"_typehead.html\" typeahead-loading=\"customer_typeahead_loading\" typeahead-no-results=\"no_results\" class=\"form-control\" typeahead-on-select=\"typeHeadResults($item, $modal, $label)\" typeahead-focus-first=\"false\" typeahead-min-length=\"2\">\n        <span class=\"input-group-btn\">\n          <button type=\"button\" class=\"btn btn-primary btn-lg\" ng-click=\"submitForm(); getClients({filter_by: typehead_result})\"><i class=\"fa fa-search\"></i></button>\n        </span>\n      </div>\n    </div>\n  </div>\n\n  <script type=\"text/ng-template\" id=\"_typehead.html\">\n\n    <div class=\"bb-typehead-results-wrapper\">\n\n      <ul class=\"bb-list bb-list-sm\">\n        <li class=\"bb-typh-header\">\n          {{match.model.name}}\n        </li>\n        <li ng-show=\"match.model.email\">\n          <i class=\"fa fa-envelope-o fa-fw\"></i>\n          {{match.model.email}}\n        </li>\n        <li ng-show=\"match.model.mobile && !match.model.email\">\n          <i class=\"fa fa-mobile fa-lg fa-fw\"></i>\n          {{match.model.mobile | local_phone_number}}\n        </li>\n        <li ng-show=\"match.model.phone && !match.model.email\">\n          <i class=\"fa fa-phone fa-fw\"></i>\n          {{match.model.phone | local_phone_number}}\n        </li>\n      </ul>\n\n    </div>\n\n  </script>\n\n  <div ng-if=\"search_complete\" class=\"search-results\">\n\n    <div class=\"bb-block\" ng-show=\"clients.num_items > 0\">\n\n      <div class=\"row\">\n\n        <div class=\"col-sm-6\">\n          <div class=\"bb-search-summary\">{{clients.num_items}} customer<span ng-show=\"clients.num_items > 1\">s</span> found</div>\n\n          <button class=\"btn btn-link\" ng-click=\"clearSearch()\">Clear</button>\n\n        </div>\n\n        <div class=\"col-sm-6\">\n\n          <div class=\"form-inline bb-search-options\">\n\n            <div class=\"form-group\">\n              <label class=\"bb-label\" for=\"sort_by\">Sort by: </label>\n              <select ng-model=\"sort_by\" id=\"sort_by\" class=\"form-control\" ng-options=\"option.key as option.name for option in sort_by_options\" ng-change=\"sortChanged(sort_by)\">\n              </select>\n            </div>\n\n          </div>\n\n        </div>\n      </div>\n\n    </div>\n\n    <div class=\"bb-block text-center\" ng-show=\"clients.num_items == 0\">\n      <p>\n        No customers matching <strong>{{typehead_result}}</strong> found\n      </p>\n      <p>\n        <button class=\"btn btn-link\" ng-click=\"clearSearch()\">Create one instead?</button>\n      </p>\n    </div>\n\n    <div class=\"clearfix\"></div>\n\n    <ul class=\"bb-list bb-list-bordered bb-list-fade-in\">\n\n      <li ng-repeat=\"client in clients.items | startFrom: (clients.current_page - 1) * clients.page_size | limitTo: clients.page_size track by $index\">\n\n        <div class=\"typehead-item-wrapper\">\n\n          <div class=\"row\">\n            <div class=\"col-sm-10\">\n\n              <h3>\n                <span ng-show=\"sort_by != \'last_name\'\">\n                  {{client.name}}\n                </span>\n                <span ng-show=\"sort_by == \'last_name\'\">\n                  {{client.last_name}}, {{client.first_name}}\n                </span>\n              </h3>\n\n              <ul class=\"bb-list bb-list-horizontal\">\n                <li ng-show=\"client.email\">\n                  <i class=\"fa fa-envelope-o fa-fw\"></i>\n                  {{client.email}}\n                </li>\n                <li ng-show=\"client.mobile\">\n                  <i class=\"fa fa-mobile fa-lg fa-fw\"></i>\n                  {{client.mobile | local_phone_number}}\n                </li>\n                <li ng-show=\"client.phone\">\n                  <i class=\"fa fa-phone fa-fw\"></i> {{client.phone | local_phone_number}}\n                </li>\n              </ul>\n\n            </div>\n            <div class=\"col-sm-2\">\n              <button class=\"btn btn-primary btn-block btn-select-client\" ng-click=\"selectClient(client);\">Select</button>\n            </div>\n          </div>\n\n        </div>\n\n      </li>\n\n    </ul>\n\n    <pagination total-items=\"clients.num_items\"\n      ng-model=\"clients.current_page\" items-per-page=\"clients.page_size\"\n      max-size=\"clients.max_size\" boundary-links=\"true\" rotate=\"false\"\n      num-pages=\"clients.num_pages\" ng-show=\"clients.num_items > clients.page_size\" ng-change=\"pageChanged()\"></pagination>\n\n  </div>\n\n  <div ng-hide=\"search_complete\" class=\"admin-create-client\">\n\n    <hr />\n\n    <div class=\"panel panel-default\">\n      <div class=\"panel-heading\"><strong>Create Customer</strong></div>\n      <div class=\"panel-body\">\n\n        <div ng-form name=\"client_form\" bb-form>\n\n          <div class=\"form-group\" ng-class=\"{\'has-error\': client_form.first_name.$invalid && client_form.submitted}\">\n            <label for=\"first_name\" class=\"control-label\">First Name:</label><br />\n            <input type=\"text\" name=\"first_name\" id=\"first_name\" required ng-model=\"client.first_name\" class=\"form-control\"/>\n          </div>\n\n          <div class=\"form-group\" ng-class=\"{\'has-error\': client_form.last_name.$invalid && client_form.submitted}\">\n            <label for=\"last_name\" class=\"control-label\">Last Name:</label><br />\n            <input type=\"text\" name=\"last_name\" id=\"last_name\" required ng-model=\"client.last_name\" class=\"form-control\"/>\n          </div>\n\n          <div class=\"form-group\" ng-class=\"{\'has-error\': client_form.email.$invalid && client_form.submitted}\">\n            <label for=\"email\" class=\"control-label\">E-mail:</label>\n            <input type=\"email\" name=\"email\" id=\"email\" ng-required=\"!client.mobile\" ng-model=\"client.email\" class=\"form-control\"/>\n          </div>\n\n          <div class=\"form-group\" ng-class=\"{\'has-error\': client_form.mobile.$invalid && client_form.submitted}\">\n            <label for=\"mobile\" class=\"control-label\">Mobile:</label>\n            <input type=\"text\" name=\"mobile\" id=\"mobile\" ng-model=\"client.mobile\" class=\"form-control\" ng-required=\"!client.email || bb.company.settings.ask_mobile_phone\"/>\n          </div>\n\n          <div ng-show=\"bb.company_settings.ask_address\">\n\n            <div class=\"form-group\" ng-class=\"{\'has-error\': client_form.address1.$invalid && ((client_form.address1.$dirty && !client_form.address1.$focused) || booking_form.submitted)}\">\n              <label for=\"address1\" class=\"control-label\">Address:</label>\n              <div>\n                <input type=\"text\" name=\"address1\" id=\"address1\" ng-model=\"client.address1\" class=\"form-control\"/>\n              </div>\n              <div class=\"col-sm-3 messages\">\n                <div class=\"error-message\" ng-show=\"client_form.address1.$invalid && booking_form.submitted\">\n                  Please enter your address\n                </div>\n              </div>\n            </div>\n\n            <div class=\"form-group\" ng-class=\"{\'has-error\': client_form.address2.$invalid && ((client_form.address2.$dirty && !client_form.address2.$focused) || booking_form.submitted)}\">\n              <label for=\"address2\" class=\"control-label\"></label>\n              <div>\n                <input type=\"text\" name=\"address2\" id=\"address2\" ng-model=\"client.address2\" class=\"form-control\"/>\n              </div>\n            </div>\n\n            <div class=\"form-group\" ng-class=\"{\'has-error\': client_form.address3.$invalid && ((client_form.address3.$dirty && !client_form.address3.$focused) || booking_form.submitted)}\">\n              <label for=\"address3\" class=\"control-label\">Town:</label>\n              <div>\n                <input type=\"text\" name=\"address3\" id=\"address3\" ng-model=\"client.address3\" class=\"form-control\"/>\n              </div>\n            </div>\n\n            <div class=\"form-group\" ng-class=\"{\'has-error\': client_form.address4.$invalid && booking_form.submitted}\">\n              <label for=\"address4\" class=\"control-label\">County:</label>\n              <div>\n                <input type=\"text\" name=\"address4\" id=\"address4\" ng-model=\"client.address4\" class=\"form-control\"/>\n              </div>\n            </div>\n\n            <div class=\"form-group\" ng-class=\"{\'has-error\': client_form.postcode.$invalid && ((client_form.postcode.$dirty && !client_form.postcode.$focused) || booking_form.submitted)}\">\n              <label for=\"postcode\" class=\"control-label\">Postcode:</label>\n              <div>\n                <input type=\"text\" name=\"postcode\" id=\"postcode\" ng-model=\"client.postcode\" class=\"form-control\"/>\n              </div>\n            </div>\n\n\n          </div>\n\n          <div class=\"row\">\n            <div class=\"col-sm-3\">\n              <button type=\"submit\" class=\"btn btn-primary btn-block\" ng-click=\"submitForm(client_form) && createClient()\" bb-debounce>Create Customer</button>\n            </div>\n          </div>\n\n        </div>\n\n      </div>\n    </div>\n\n  </div>\n\n  <div class=\"bb-step-navigation\">\n    <div class=\"row\">\n      <div class=\"col-sm-9 col-sm-push-3 text-right\">\n        <!-- <button type=\"submit\" class=\"btn btn-primary\" ng-click=\"confirm(booking_form) && validator.validateForm(booking_form) && checkReady() && routeReady()\">Confirm</button> -->\n      </div>\n      <div class=\"col-sm-3 col-sm-pull-9\">\n        <button type=\"button\" class=\"btn btn-default\" bb-debounce ng-click=\"loadPreviousStep()\" ng-show=\"bb.current_step > 1\">Back</button>\n      </div>\n    </div>\n  </div>\n\n</div>\n");
$templateCache.put("main.html","<div class=\"header\">\n\n  <div bb-form-data-store></div>\n\n  <!-- BREADCRUMB ROUTE\n  <div bb-breadcrumbs class=\"breadcrumbs_holder\" ng-init=\"setRoute([\n    {page:\'event_list\', title: \'Select an event\'},\n    {page:\'event\', title: \'Event\'},\n    {page:\'checkout\', title: \'Confirmation\'}\n    ])\">\n\n    <ol class=\"breadcrumb\"> \n      <li ng-repeat=\"step in bb.allSteps\" ng-class=\"{\'active\': step.active, \'passed\': step.passed, \'disabled\': isDisabledStep(step)}\">\n        <button type=\"button\" ng-click=\"loadStep(step.number)\" ng-class=\"{\'active\': step.active, \'passed\': step.passed}\" ng-disabled=\"isDisabledStep(step)\">\n          <span class=\"step-num\">{{step.number}}.</span>\n          <span class=\"step-title\">{{step.title}}</span>\n        </button>\n      </li>\n    </ol>\n  </div> \n  -->\n\n  <!-- PROGRESSBAR\n  <div progressbar value=\"bb.percentage_complete\" type=\"primary\"></div>\n  -->\n\n  <!-- STEP INDICATOR\n  <div ng-if=\"bb.current_step\" class=\"step-heading\">\n    <span ng-if=\"bb.current_step != 1 && bb.current_step <  bb.allSteps.length\" ng-bind=\"\'Step \' + (bb.current_step - 1) + \' of \' + (bb.allSteps.length - 2)\"></span>\n    <span ng-if=\"bb.current_step == bb.allSteps.length\" ng-bind=\"\'Complete\'\"></span>\n  </div> -->\n\n  <div class=\"alerts\" bb-scroll-to=\"alert:raised\" bb-always-scroll>\n    <div alert ng-repeat=\"alert in $root.alerts\" type=\"{{alert.type}}\" >\n      <ul>\n        <li ng-bind-html=\"alert.msg\"></li>\n      </ul>\n    </div>\n  </div>\n\n</div>\n\n<div class=\"bb-content\">\n\n  <div bb-content class=\"ng-cloak\"></div>\n  <div bb-display-mode></div>\n\n  <div bb-loading class=\"bb-loader\" >\n    <div id=\"loading_icon\">\n      <div id=\"wait_graphic\">&nbsp;</div>\n    </div>\n  </div>\n\n</div>\n");
$templateCache.put("quick_pick.html","<div class=\"bb-quick-pick\" bb-wait-for=\"quickEmptybasket()\" bb-wait-var=\"all_done\" ng-if=\"all_done\" bb-form-data-store bb-page>\n\n  <div ng-form name=\"appointment-booking-form\">\n\n    <h1>Make a Booking</h1>\n\n    <div bb-services>\n      <div class=\"form-group\">\n        <label>Service</label>\n        \n        <!-- TODO use display_name -->\n        <select id=\"service\" ng-model=\"service\" ng-options=\"s.name for s in bookable_services | orderBy: \'name\'\" class=\"form-control\">\n          <option value=\"\">-- select a service --</option>\n        </select>\n        \n      </div>\n    </div>\n    \n    <button type=\"button\" class=\"btn btn-primary\" ng-click=\"checkReady() && routeReady(\'calendar\')\" bb-debounce ng-disabled=\"!bb.current_item.service\">Book</button>\n\n    <hr>\n\n  </div>\n\n  <div ng-form name=\"block_time_form\" class=\"bb-block-time\" bb-block-time>\n\n    <h1>Block Time</h1>\n    <div class=\"form-group\" ng-class=\"{\'has-error\': resourceError}\">\n      <label>For</label>\n      <select id=\"resource\" ng-model=\"picked_resource\" ng-change=\"changeResource()\" ng-options=\"item.identifier as item.name group by item.group for item in resources\" class=\"form-control\">\n        <option value=\"\">-- select --</option>\n      </select>\n      <p class=\"text-danger\" ng-init=\"resourceError=false\" ng-show=\"resourceError\">Please select a resource or member of staff</p>\n    </div>\n    <div class=\"form-group\" ng-init=\"blockWholeDay = false\" ng-hide=\"hideBlockAllDay\">\n      <label>Block whole day &nbsp;&nbsp;<toggle-switch ng-model=\"blockWholeDay\" ng-change=\"changeBlockDay(blockWholeDay)\" class=\"switch-primary switch-small\" on-label=\"Yes\" off-label=\"No\"></toggle-switch></label>\n    </div>\n    <div class=\"row\" ng-hide=\"blockWholeDay\">\n      <div class=\"col-md-6\">\n        <div class=\"form-group\">\n          <label>From</label>\n          <div bb-date-time-picker date=\"config.from_datetime\" max-date=\"config.to_datetime\" min-date=\"config.min_date\"></div>\n        </div>\n      </div>\n      <div class=\"col-md-6\">\n        <div class=\"form-group\">\n          <label>To</label>\n          <div bb-date-time-picker date=\"config.to_datetime\" min-date=\"config.from_datetime\" max-date=\"config.max_date\"></div>\n        </div>\n      </div>\n    </div>\n\n    <button type=\"button\" class=\"btn btn-primary\" ng-click=\"blockTime()\" bb-debounce ng-disabled=\"false\">Block Time</button>\n\n  </div>\n\n  <hr>\n\n</div>\n");}]);