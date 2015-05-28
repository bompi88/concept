/*
 * Copyright 2015 Concept
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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

  return route === currentRoute.route.getName() ? true : false;
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
