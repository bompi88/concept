/*****************************************************************************/
/* EditReportController */
/*****************************************************************************/

EditReportController = AuthRouteController.extend({
	waitOn: function () {
		Meteor.subscribe('report', this.params._id);

		var report = Reports.findOne({_id: this.params._id});

		if (report) {
			var subs = [];

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

	action: function () {
		this.render();
	},
	onAfterAction: function() {
		uploadObject.reset();
		var report = this.data();
		if(report) {
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

SeoCollection.insert({
  route_name: 'EditReport',
  title: 'Rediger rapport',
  meta: {
    'description': 'Etterevaluering av en rekke statlige prosjekter gjort av Concept-programmet. På oppdrag fra Finansdepartementet'
  },
  og: {
    'title': 'Rediger rapport',
    'image': '/images/logo.jpg'
  }
});