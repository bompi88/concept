"use strict";

/**
 * Publishes a set of reports, sorted and paginated.
 *
 * @from: return report from this number in list
 * @amount: number of reports to return
 * @sort: mongodb sort data
 */
Meteor.publish('reports', function(from, amount, sort) {

  var aggr = {};

  if(from) {
    _.extend(aggr, { $skip: from });
  }
  if(amount) {
    _.extend(aggr, { $limit: amount});
  }
  if(sort) {
    _.extend(aggr, { $sort: sort });
  }

	if(this.userId) {
		return Reports.find({}, aggr);
	} else {
		return Reports.find({ _public: true}, aggr);
	}
});

/**
 * Publishes a particular report.
 *
 * @id: report id to return
 */
Meteor.publish('report', function(id) {
	if(this.userId) {
		return Reports.find({_id: id});
	} else {
		return Reports.find({ $and: [{ _id: id }, { _public: true }] });
	}
});
