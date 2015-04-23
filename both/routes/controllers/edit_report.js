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
      		
      		if (report.images && report.images.length > 0)
        		Meteor.subscribe('images', _.pluck(report.images, 'fileId'));
 
      		if (report.references && report.references.length > 0)
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
