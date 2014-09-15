/**
 * BasicBox: Event Handlers and Helpers
 */

Template.BasicBox.events({
  'click .thumbnail-normal': function(event, tmpl) {
    Router.go('Report', {_id: this._id, slug: slugify(this.project.name)});
  }
});
