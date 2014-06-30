/*****************************************************************************/
/* ConceptIndex: Event Handlers and Helpers */
/*****************************************************************************/
Template.ConceptIndex.events({
  /*
   * Example: 
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.ConceptIndex.helpers({
  /*
   * Example: 
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* ConceptIndex: Lifecycle Hooks */
/*****************************************************************************/
Template.ConceptIndex.created = function () {
};

Template.ConceptIndex.rendered = function () {
  Hyphenator.config({
    minwordlength : 4
  });
  Hyphenator.run();
};

Template.ConceptIndex.destroyed = function () {
};