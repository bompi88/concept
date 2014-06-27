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

getImageUrl = function(fileId) {
  var image = Images.findOne({_id:fileId});
  if(image)
    return image.url();
  else
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
