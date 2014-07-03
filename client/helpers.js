/*****************************************************************************/
/* Helper methods  */
/*****************************************************************************/

uploadImages = function(event) {
  FS.Utility.eachFile(event, function(image) {
    Images.insert(image, function (err, fileObj) {
      if(fileObj)
        uploadObject.addImage(fileObj);
    });
  });
};

uploadFiles = function(event) {
  FS.Utility.eachFile(event, function(file) {
    Files.insert(file, function (err, fileObj) {
      if(fileObj)
        uploadObject.addReference(fileObj);
    });
  });
};

currentRouteIs = function(route) {
  var currentRoute = Router.current();
  if (!currentRoute) return '';

  return route === currentRoute.route.name ? true : false;
};

removeItem = function(array, id) {
  return _.reject(array, function(item) {
    return item === id;
  });
};

getUrlById = function(id, col, args) {

  if(!id || !col)
    return false;

  var query = { _id: id };

  var store = args || args.hash || args.hash.store || null;

  var file;

  if (col === 'images') {
    file = Images.findOne(query);
  } else if (col === 'files') {
    file = Files.findOne(query);
  }

  if (file) {
    return file.url(store);
  } else {
    return false;
  }
  return false;
};


convertLineBreaks = function(text) {
  if (text != null) {
    text = text.replace(/(?:\r\n|\r|\n)/g, '<br />');
    return text.trim();
  }
  return null;
};

createModalDialog = function(title, body) {
  bootbox.dialog({
    message: convertLineBreaks(body),
    title: title,
    buttons: {
      close: {
        label: "Lukk",
        className: "btn-default"
      }
    }
  });
};

replaceWithTemplate = function (msg, tmpl, meteorTemplate, selector) {
  // DOM element to hook our template to
  var parent = tmpl.find(selector);

  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
  // renders our alert box template
  var template = UI.renderWithData(meteorTemplate, msg);

  // insert alert box template as a child
  UI.insert(template, parent);
};
