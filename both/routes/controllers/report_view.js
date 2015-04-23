/*
 * Copyright 2015 Concept
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
						'description': report.project.projectDescription && report.project.projectDescription.short || ""
					},
					og: {
						'title': "Evaluering av " + report.project.name,
						'description': report.project.projectDescription && report.project.projectDescription.short || ""
						//todo: image
					}
				});
			} else {
				this.redirect('ReportList');
			}
		}
	}
});
