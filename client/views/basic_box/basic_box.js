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

Template.BasicBox.successColor = function() {
  var success = this.project.successCategory;
  if(success == 1) {
    return "Rød";
  }
  else if(success == 2) {
    return "Gul";
  }
  else if(success == 3) {
    return "Grønn";
  }
  else return false;
};


Template.BasicBox.economyPercentage = function() {

  if(this.project.managementBudget && this.project.costFinal && this.project.managementBudget.amount && this.project.costFinal.amount ) {

    var styringsramme = this.project.managementBudget.amount;
    var sluttkostnad = this.project.costFinal.amount;

    var percentage = (sluttkostnad-styringsramme)*100 / styringsramme;

    percentage = percentage.toFixed(1);


    var text = percentage < 0 ? " under styringsrammen." : " over styringsrammen.";

    return percentage.toString() + "%";//+ " %" + text;
  }
  return false;
};

/*****************************************************************************/
/* BasicBox: Lifecycle Hooks */
/*****************************************************************************/

Template.BasicBox.created = function () {
};

Template.BasicBox.rendered = function () {
};

Template.BasicBox.destroyed = function () {
};