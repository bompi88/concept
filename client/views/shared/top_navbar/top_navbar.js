
/*****************************************************************************/
/* TopNavbar: Event Handlers and Helpers */
/*****************************************************************************/
Template.TopNavbar.events({
  'click new-report': function () {
    Router.go('/create');
  }
});

Template.TopNavbar.helpers({
	activeIfRouteIs: function(route) {
		var curRoute = Router.current();
    if (!curRoute) return '';

		return curRoute && route === curRoute.route.name ? 'active' : '';
  }
});