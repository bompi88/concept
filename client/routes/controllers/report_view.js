/*****************************************************************************/
/* ReportViewController */
/*****************************************************************************/

ReportViewController = RouteController.extend({
	waitOn: function () {
		return [ Meteor.subscribe('report', this.params._id), Meteor.subscribe('images'), Meteor.subscribe('files') ];
	},

	data: function () {
		return Reports.findOne({_id: this.params._id});
	},

	action: function () {
		this.render();
	},
	onAfterAction: function() {
		
		if (this.ready()) {
			if(this.data()) {
				var report = this.data();

				SEO.set({
					title: "Evaluering av " + report.project.name,
					meta: {
						'description': report.project.projectDescription.short
					},
					og: {
						'title': "Evaluering av " + report.project.name,
						'description': report.project.projectDescription.short
					//todo image 
					}
				});
			} else {
				this.redirect('ReportList');
			}
		}
	}
});