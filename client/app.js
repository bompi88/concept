/*****************************************************************************/
/* Client App Namespace  */
/*****************************************************************************/
_.extend(App, {
});

App.helpers = {
	isLoggedIn: function() {
  	return Meteor.userId();
  },
  cutText: function (str, n) {

		if(str.length > n) {
			str = str.substring(0, n);
			str = str + '...';
		}
		
		return str;
	}
};

_.each(App.helpers, function (helper, key) {
  Handlebars.registerHelper(key, helper);
});

UI.registerHelper("currentRoute", function(route) {
  var currentRoute = Router.current();
  if (!currentRoute) return '';

  return route === currentRoute.route.name ? true : false;
});


