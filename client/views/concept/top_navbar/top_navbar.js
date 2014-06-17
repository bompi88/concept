
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
	activeIfRouteIs: function(route) {
		var curRoute = Router.current();
    if (!curRoute) return '';

		return curRoute && route === curRoute.route.name ? 'active' : '';
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
