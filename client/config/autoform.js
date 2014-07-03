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
            if (operation === 'update')
                return Router.go(Router.path('ReportList'));
            else
                return Router.go(Router.path('ReportList'));
        },
        onError: function(operation, error, template) {
            console.log(error);
        }
    }
});
