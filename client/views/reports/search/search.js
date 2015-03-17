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
    var page = parseInt(Router.current().params.page);
    if(page > 1) {
      if(Session.get('searchQuery').length === 0) {
        Router.go('Reports', {page: 1});
      }
    }
    //escape regex
    var value = event.target.value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
    var field = attToField(Session.get('searchBy'));
    var query = {};
    //if number, use equals operator
    if(!isNaN(parseInt(value))) {
      query[field] = parseInt(value);
    }
    //if string, use contains operator with regex
    else {
      query[field] = { $regex: value, $options: 'i' };
    }
    //if the searchbox is empty we have to reset the query
    if(value == null || value == "")
      query = {};
    //this triggers iron router to load the report subscription again

    Session.set('query', query);
    Session.set('searchQuery', value);
  }
});
