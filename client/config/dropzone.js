/**
 * Basic event handlers for the dropzone
 */
Meteor.startup(function () {

  $("html")
  .on("dragenter", ".dropzone", function () {
    event.preventDefault();
    return true;
  }).on("dragover", ".dropzone", function () {
    event.preventDefault();
    return true;
  }).on("drop", ".dropzone", function () {
    event.preventDefault();
    return true;
  });
});
