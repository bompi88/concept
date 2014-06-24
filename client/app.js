/*****************************************************************************/
/* Client App Namespace  */
/*****************************************************************************/

_.extend(App, {
});

/*****************************************************************************/
/* UI helper methods */
/*****************************************************************************/

App.helpers = {
	cutText: function (str, n) {

		if(str) {
			if(str.length > n) {
				str = str.substring(0, n);
				str = str + '...';
			}
			return str;
		}
		return '';
	},

	currentRouteIs: function(route) {
		var currentRoute = Router.current();
		if (!currentRoute) return '';

		return route === currentRoute.route.name ? true : false;
	},

	activeIfRouteIs: function(route) {
		var curRoute = Router.current();
    	if (!curRoute) return '';

		return curRoute && route === curRoute.route.name ? 'active' : '';
  	},
  	'$generateId': function (name, _id, options) {
		return _.extend(options.hash, { id: name + '-' + _id});
	},
	'$checked': function (num, val) {
		if (num === undefined && parseInt(val) == 1)
			return true;
		return (parseInt(val)) == num ? true : false;
	},
	'$isNotEmptyArray': function (array) {
		if (!array || !array.count)
			return false;
		return array.count() > 0;
	}
};

_.each(App.helpers, function (helper, key) {
	UI.registerHelper(key, helper);
});