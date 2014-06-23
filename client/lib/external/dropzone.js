
var balanceDep = new Deps.Dependency();
var balance = 0;

var isActive = function () {
  balanceDep.depend();
  return balance > 0;
}

$.fn.dropzone = function () {
  // I think that the user should take care himself
  //if (this.css('position') !== 'absolute')
  //  this.css('position', 'relative');
  this.each(function () {
    var $dropzone = $('<div class="dropzone"></div>');
    Deps.autorun(function () {
      if (isActive())
        $dropzone.addClass('active');
      else
        $dropzone.removeClass('active');
    });
    // TODO: this should be done only once
    $(this).append($dropzone);
  });
}

Meteor.startup(function () {

  $("html")
  .on("dragenter", function () {
    balanceDep.changed();
    balance += 1;
  }).on("dragleave", function () {
    balanceDep.changed();
    balance -= 1;
  });

  $("html")
  // what return value we should use?
  .on("dragenter", ".dropzone", function () {
    event.preventDefault();
    return true;
  }).on("dragover", ".dropzone", function () {
    event.preventDefault();
    return true;
  }).on("drop", ".dropzone", function () {
    if (balance !== 0) {
      balance = 0;
      balanceDep.changed();
    }
    event.preventDefault();
    return true;
  });
});
