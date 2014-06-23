/*****************************************************************************/
/* Concept Methods */
/*****************************************************************************/

Meteor.methods({
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
