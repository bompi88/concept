/**
 * ReportViewController: A detailed view for a report.
 */

ReportViewController = RouteController.extend({
	waitOn: function () {
		return Meteor.subscribe('report', this.params._id)
	},

	data: function () {
		return Reports.findOne({_id: this.params._id});
	},

	onAfterAction: function() {

		if (this.ready()) {
      var report = this.data();

			if(report) {
        if (report.images.length > 0)
          Meteor.subscribe('images', _.pluck(report.images, 'fileId'));
        if (report.references.length > 0)
          Meteor.subscribe('files', _.pluck(report.references, 'fileId'));

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
