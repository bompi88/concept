/*****************************************************************************/
/* Client App Namespace  */
/*****************************************************************************/

_.extend(App, {
});

/**
 * UI helper methods
 */

App.helpers = {

  /**
   * Returns a substring of length n.
   *
   * @str: string to cut
   * @n: where to cut
   * @m: optional left cut
   */
	'$cutText': function (str, n, m) {

    // swap n and m if m is present
    if(arguments.length > 3) {
      var tmp = n;

      n = m;
      m = tmp;
    }

		if(str) {
      // only cut and append '...' if the length of the string is
      // greater than the given cut-length.
			if(str.length > n) {
				str = str.substring(m, n);
				str = str + '...';
			}
			return str;
		}
		return '';
	},

  '$convertLineBreaks': function(text) {
    if (text != null) {
      text = text.replace(/^[\r\n]+|[\r\n]+$/g,'').replace(/(?:\r\n|\r|\n)/g, '<br />');
      return text.trim();
    }
    return null;
  },

  /**
   * Returns true if the current visiting route is equal to the
   * route given.
   *
   * @route: route to compare against
   */
	'$currentRouteIs': function(route) {
		var currentRoute = Router.current();
		if (!currentRoute) return '';

		return route === currentRoute.route.getName() ? true : false;
	},

  /**
   * Returns a 'active' or the second param if the current visiting
   * route is equal to the route specified as the first parameter.
   *
   * @route: route to compare against
   */
	'$activeIfRouteIs': function(route, rValue) {
    var returnValue = 'active';

    if(arguments.length > 2) {
      returnValue = rValue;
    }

		var curRoute = Router.current();
    	if (!curRoute) return '';

		return curRoute && route === curRoute.route.getName() ? returnValue : '';
  },

  /**
   * Returns an id on the form: name + _id. Used with nested documents.
   *
   * @name: name of field
   * @_id: element id
   */
  '$generateId': function (name, _id, options) {
    return _.extend(options.hash, { id: name + '-' + _id});
	},

  /**
   * Returns true if a radio button is checked.
   *
   * @num: current value in the scope.
   * @val: this radio button value
   */
	'$checked': function (num, val) {
		if (num === undefined && parseInt(val) == 1)
			return true;
		return (parseInt(val)) == num ? true : false;
	},

  /**
   * Checks whether a collection is empty or not.
   *
   * @num: current value in the scope.
   * @val: this radio button value
   */
	'$collectionNotEmpty': function (col) {
    if(col && _.isFunction(col.count))
      return col.count() > 0;
    else
      return false;
	},

  /**
   * Returns a URL to a file with an id and a collection.
   *
   * @id: The ID of the file
   * @col: The collection which this file is in, e.g. 'images'
   * @store: specifies a storage adapter, e.g. 'thumbs'
   */
  '$getUrlById': function(id, col, args) {

    if(!id || !col)
      return false;

    var query = { _id: id };

    var store = args && args.hash && args.hash.store || null;

    var file;

    if (col === 'images') {
      file = Images.findOne(query);
    } else if (col === 'files') {
      file = Files.findOne(query);
    }

    if (file) {
      return file.url({store: store});
    } else {
      return false;
    }
    return false;
  }
};

// Register all helpers as UI helpers
_.each(App.helpers, function (helper, key) {
	Template.registerHelper(key, helper);
});
