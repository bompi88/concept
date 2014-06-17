/*****************************************************************************/
/* BasicBox: Event Handlers and Helpers */
/*****************************************************************************/

Template.BasicBox.events({
  'click .thumbnail-normal': function(event, tmpl) {
    var id = tmpl.find('.id').value;
    Router.go('/reports/' + id);
  }
});

Template.BasicBox.helpers({
   getThumbUrl: function() {
    if(this.images && this.images[0]) {
      var thumb = Images.findOne({_id:this.images[0].fileId});

      if (thumb)
        return thumb.url();
      else
        return false;
    }
    return false;
   }
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
