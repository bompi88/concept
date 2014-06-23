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