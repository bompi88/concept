/*****************************************************************************/
/* BasicBox: Event Handlers and Helpers */
/*****************************************************************************/
Template.BasicBox.events({
  /*
   * Example: 
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
  'click .thumbnail-normal': function(event, tmpl) {
    var id = tmpl.find('.id').value;
    Router.go('/reports/' + id);
  }
});

Template.BasicBox.helpers({
  /*
   * Example: 
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* BasicBox: Lifecycle Hooks */
/*****************************************************************************/
Template.BasicBox.created = function () {
};

Template.BasicBox.rendered = function () {
};

Template.BasicBox.destroyed = function () {
};
