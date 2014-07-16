Template.TrafficLight.helpers({
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
  },
  isColor: function (c) {
    if(this.project && this.project.successCategory)
      return parseInt(c) === this.project.successCategory;
    return false;
  }
});

Template.TrafficLight.rendered = function () {
  $('.tool-top').tooltip();
};
