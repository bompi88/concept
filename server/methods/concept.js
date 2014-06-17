/*****************************************************************************/
/* Concept Methods */
/*****************************************************************************/

Meteor.methods({
 /*
  * Example:
  *  '/app/concept/update/email': function (email) {
  *    Users.update({_id: this.userId}, {$set: {'profile.email': email}});
  *  }
  *
  */
  	insertReport: function(doc) {
		return Reports.insert(doc);
	},
	updateReport: function(id, doc) {
		return Reports.update({_id: id}, doc);
	},
	deleteReport: function(id, doc) {
		return Reports.remove({_id: id});
	},
	toggleReportPublic: function(id, publicity) {
		return Reports.update({_id: id}, {$set: {public: publicity}});
	}
});
