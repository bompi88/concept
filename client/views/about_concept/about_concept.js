/**
 * AboutConcept: Information page about the organization
 */

// -- Life cycle hooks -------------------------------------------------

Template.AboutConcept.rendered = function () {
  $('.hyphenate').hyphenate('no-nb');
};
