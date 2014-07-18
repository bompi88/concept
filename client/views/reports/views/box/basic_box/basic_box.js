/**
 * BasicBox: Event Handlers and Helpers
 */

Template.BasicBox.events({
  'click .thumbnail-normal': function(event, tmpl) {
    Router.go(Router.path('Report', {_id: this._id}));
  }
});


var elements;

Template.BasicBox.rendered = function () {
  elements = $('.hyphenate').hyphenate('no-nb');
};

Template.BasicBox.destroyed = function () {
  if(elements) {
    for (var i = 0, element; element = elements[i]; i++) {
      element = null;
      delete element;
    }
  }

  elements = null;
};
