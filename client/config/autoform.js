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
 * Autoform configuration
 */
AutoForm.hooks({
    "report-form": {
        before: {
            insert: function(doc, tmpl) {
                return createReport(tmpl);
            },
            update: function(docId, modifier, tmpl) {
                return createMofidiers(modifier, tmpl);
            },
            remove: function (id, tmpl) {
              // TODO: Needs to clean up and remove the files from
              // gridFS.

                /* console.log('jaha');
                var report = Reports.findOne(id);
                var img_ids = _.pluck(report.images, 'fileId');
                var ref_ids = _.pluck(report.references, 'fileId');

                Meteor.call('deleteImages', img_ids);
                Meteor.call('deleteReferences', ref_ids);*/

                return true;
            }
        },
        onSuccess: function(operation, result, tmpl) {
          return Router.go(Router.path('Reports', {page: 1}));
        },
        onError: function(operation, error, template) {
            console.log(error);
        }
    }
});
