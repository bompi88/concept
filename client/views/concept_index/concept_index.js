
var elements;

Template.ConceptIndex.rendered = function () {
  elements = $('.hyphenate').hyphenate('no-nb');
};

Template.ConceptIndex.destroyed = function () {
  if(elements) {
    for (var i = 0, element; element = elements[i]; i++) {
      element = null;
      delete element;
    }
  }
  elements = null;
};
