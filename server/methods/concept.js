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
	deleteImages: function(ids) {
		if(this.userId) {
			Images.remove({_id: { $in: ids}});
		}
	},
	deleteReferences: function(ids) {
		if(this.userId) {
		Files.remove({_id: { $in: ids}});
		}
	},
	toggleReportPublic: function(id, publicity) {
		if(this.userId) {
			return Reports.update({_id: id}, {$set: {"_public": publicity}});
		}
	}
});
