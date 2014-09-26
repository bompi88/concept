Template.ProjectInformationBox.events({
  'click .panel': function(event, tmpl) {
    Router.go('Report', {_id: this._id, slug: slugify(this.project.name)});
  }
});
