/**
 * BasicBox: Event Handlers and Helpers
 */

Template.BasicBox.events({
  'click .thumbnail-normal': function(event, tmpl) {
    Router.go('/reports/' + this._id);
  }
});

Template.BasicBox.rendered = function () {
  $('.hyphenate').hyphenate('no-nb');
};
