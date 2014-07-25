/**
 * AboutConcept: Information page about the organization
 */

var elements;

Template.AboutConcept.rendered = function () {
  elements = $('.hyphenate').hyphenate('no-nb');
};

Template.AboutConcept.destroyed = function () {
  if(elements) {
    for (var i = 0, element; element = elements[i]; i++) {
      element = null;
      delete element;
    }
  }
  elements = null;
};
