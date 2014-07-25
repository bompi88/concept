Template.Footer.events({
  'click .post': function (event, tmpl) {
    var which = $(event.currentTarget).data("id");

    if(which === "bjorbrat") {
      window.location.href = 'm' + 'a' + 'i' + 'l' + 't' + 'o' + ':' + which + '88' + '@' + 'gmail' + '.' + 'com';
    } else if(which === "andreas") {
      window.location.href = 'm' + 'a' + 'i' + 'l' + 't' + 'o' + ':' + which + '.' + 'drivenes' + '@' + 'gmail' + '.' + 'com';
    }
  }
});
