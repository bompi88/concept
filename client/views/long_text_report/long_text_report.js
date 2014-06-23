
Template.LongTextReport.helpers({
  notEscapeHTML: function(text) {
    if(text)
      return Spacebars.SafeString(text);
  }
});
