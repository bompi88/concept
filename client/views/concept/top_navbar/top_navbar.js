
/*****************************************************************************/
/* TopNavbar: Event Handlers and Helpers */
/*****************************************************************************/
Template.TopNavbar.events({
  'click new-report': function () {
    Router.go('/create');
  }
});

Template.TopNavbar.helpers({
  /*
   * Example: 
   *  items: function () {
   *    return Items.find();
   *  }
   */
	activeIfTemplateIs: function(tmpl) {
		var curRoute = Router.current();
		return curRoute && tmpl === curRoute.lookupTemplate() ? 'active' : '';
  	}
});

/*****************************************************************************/
/* TopNavbar: Lifecycle Hooks */
/*****************************************************************************/
Template.TopNavbar.created = function () {
};

Template.TopNavbar.rendered = function () {
};

Template.TopNavbar.destroyed = function () {
};
