Template.ProjectInformationBox.events({
  'click .panel': function(event, tmpl) {
    Router.go(Router.path('Report', {_id: this._id}));
  }
});
