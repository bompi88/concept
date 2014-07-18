var elements;

Template.EvaluationCriteria.rendered = function () {
  elements = $('.hyphenate').hyphenate('no-nb');
};

Template.EvaluationCriteria.destroyed = function () {
  if(elements) {
    for (var i = 0, element; element = elements[i]; i++) {
      element = null;
      delete element;
    }
  }
  elements = null;
};
