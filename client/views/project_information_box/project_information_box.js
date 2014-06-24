
Template.ProjectInformationBox.events({
  'click .panel': function(event, tmpl) {
    Router.go('/reports/' + this._id);
  }
});