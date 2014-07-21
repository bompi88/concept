Session.setDefault('searchBy', 'Navn');
Session.setDefault('searchQuery', '');

Template.Search.events({
  'click .dropdown-menu li': function(event, tmpl) {
    var chosenAttribute = $(event.currentTarget).text();
    Session.set('searchBy', chosenAttribute);
    Session.set('query', {});
    Session.set('searchQuery', '');
  },
  'keyup [type="text"]': function(event, template) {
    Session.set('searchQuery', event.target.value);
    var field = attToField(Session.get('searchBy'));
    var query = {};

    //escape regex
    var value = Session.get('searchQuery').replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
    query[field] = { $regex: value, $options: 'i' };

    //this triggers iron router to load the report subscription again
    Session.set('query', query);
  }
});
