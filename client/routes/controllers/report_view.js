/**
 * ReportViewController: A detailed view for a report.
 */

ReportViewController = RouteController.extend({
	waitOn: function () {

		Meteor.subscribe('report', this.params._id);

		var report = Reports.findOne({_id: this.params._id});

		if (report) {
			var subs = [];
      // Subscribe to images and files
			if (report.images.length > 0)
				subs.push(Meteor.subscribe('images', _.pluck(report.images, 'fileId')));
			if (report.references.length > 0)
				subs.push(Meteor.subscribe('files', _.pluck(report.references, 'fileId')));

			return subs;
		}
		return;
	},

	data: function () {
		return Reports.findOne({_id: this.params._id});
	},

	onAfterAction: function() {

		if (this.ready()) {
      var report = this.data();

			if(report) {
        // Dynamic SEO configuration for each project's route
				SEO.set({
					title: "Evaluering av " + report.project.name,
					meta: {
						'description': report.project.projectDescription.short
					},
					og: {
						'title': "Evaluering av " + report.project.name,
						'description': report.project.projectDescription.short
            //todo: image
					}
				});
			} else {
				this.redirect('ReportList');
			}
		}
	}
});
