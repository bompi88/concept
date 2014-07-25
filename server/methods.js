/*****************************************************************************/
/* Meteor Methods */
/*****************************************************************************/
"use strict";

Meteor.methods({
	toggleReportPublic: function(id, publicity) {
		if(this.userId) {
			return Reports.update({_id: id}, {$set: {"_public": publicity}});
		} else {
			return false;
		}
	},
  totalCount: function(query) {
    return Reports.find(query).count();
  },
  createConceptUser: function(newUserEmail) {
    var userId = Accounts.createUser({
      email: newUserEmail
    });

    Accounts.sendEnrollmentEmail(userId, newUserEmail);
    return true;
  }
});
