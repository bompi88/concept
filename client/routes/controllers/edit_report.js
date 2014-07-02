/**
 * EditReportController: Fetches report, images and files and renders
 * an edit report form.
 */
EditReportController = AuthRouteController.extend({
	waitOn: function () {
		return Meteor.subscribe('report', this.params._id);
	},

	data: function () {
		return Reports.findOne({_id: this.params._id});
	},

  // Adds files and images already stored
  // to the upload object.
	onAfterAction: function() {

		uploadObject.reset();
		var report = this.data();

		if(report) {
      // Subscribe only to the images and files we actually need
      if (report.images.length > 0)
        Meteor.subscribe('images', _.pluck(report.images, 'fileId'));
      if (report.references.length > 0)
        Meteor.subscribe('files', _.pluck(report.references, 'fileId'));

			if(report.images) {
				for(var i = 0; i < report.images.length; i++) {
					uploadObject.addImage({_id:report.images[i].fileId});
				}
			}
			if(report.references) {
				for(var i = 0; i < report.references.length; i++) {
					uploadObject.addReference({_id:report.references[i].fileId});
				}
			}
		}
	}
});
