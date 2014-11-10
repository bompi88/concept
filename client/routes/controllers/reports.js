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
	waitOn: function () {
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
  }
});
