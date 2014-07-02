/**
 * AboutConcept: Information page about the organization
 */

// -- Life cycle hooks -------------------------------------------------

Template.AboutConcept.rendered = function () {
  Hyphenator.config({
    minwordlength : 4
  });
  Hyphenator.run();
};
