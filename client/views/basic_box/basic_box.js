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
   },

   economyPercentage: function() {

    try {
      var styringsramme = this.project.managementBudget.amount;
      var sluttkostnad = this.project.costFinal.amount;

      var percentage = (sluttkostnad-styringsramme)*100 / styringsramme;

      percentage = percentage.toFixed(1);

      return percentage.toString() + "%";
    }
    catch(err) {
      return false;
    }
  },

  successColor: function() {

    try {
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
    }
    catch(err) {
      return false;
    }
  }
});

Template.TrafficLight.helpers({
  isColor: function (c) {
    if(this.project && this.project.successCategory)
      return parseInt(c) === this.project.successCategory; 
    return false;
  },
  successColor: function() {

    try {
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
    }
    catch(err) {
      return false;
    }
  }
});

Template.TrafficLight.rendered = function () {
  $('.tool-top').tooltip();
};