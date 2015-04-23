/*
 * Copyright 2015 Concept
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * ReportsController: Lists the reports
 */
ReportsController = RouteController.extend({

  findAggregation: function() {
    var skip = (parseInt(this.params.page) * 20) - 20 || 0;
    var limit = 20;
    return {sort: this.findSort(), skip: skip, limit: limit};

  },
  findSort: function() {
    var sortOrder = Session.get('sortOrder') == 'asc' ? 1 : -1;
    var sort = {};
    sort[Session.get('sortBy')] = sortOrder;
    return sort;
  },
  findQuery: function() {
    var query = Session.get('query');
    return query;
  },
	subscriptions: function () {
    return Meteor.subscribe('reportsWithImage', this.findQuery(), this.findAggregation());
  },
  data: function() {
    return {
        //we have to sort the available data "again"
        reports: Reports.find({}, {sort: this.findSort()})
      };
    },
  onBeforeAction : function() {

    var page = parseInt(this.params.page, 10) || 1;

    Session.set('currentPage', page);
    this.next();
  }
});
