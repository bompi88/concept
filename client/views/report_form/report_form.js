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
/* ReportForm: Data-objects */
/*****************************************************************************/

uploadObject = {
  Images: [],
  References: [],
  dep: new Deps.Dependency,
  getImages: function() {
    this.dep.depend();
    return this.Images;
  },
  getReferences: function() {
    this.dep.depend();
    return this.References;
  },
  addImage: function(fileObj) {

    Meteor.subscribe('image', fileObj._id);

    this.Images.push(fileObj._id);
    this.dep.changed();
    return this.Images;
  },
  addReference: function(fileObj) {

    Meteor.subscribe('file', fileObj._id);

    this.References.push(fileObj._id);
    this.dep.changed();
    return this.References;
  },
  removeImage: function(id) {
    this.Images = removeItem(this.Images, id);

    this.dep.changed();
    return this.Images;
  },
  removeReference: function(id) {
    this.References = removeItem(this.References, id);

    this.dep.changed();
    return this.References;
  },
  setAsMainImg: function(id) {

    this.Images = _.reject(this.Images, function(fileId) {
      return fileId === id;
    });

    this.Images.splice(0, 0, id);

    this.dep.changed();
    return this.Images;
  },
  reset: function() {
    this.Images = [];
    this.References = [];
    this.dep.changed();
  }
}

locationObject = {
  coordinates: {},
  dep: new Deps.Dependency,
  getCoordinates: function() {
    this.dep.depend();

    return this.coordinates;
  },
  setCoordinates: function(c) {
    this.coordinates = c;
    this.dep.changed();
    return this.coordinates;
  }
}

/*****************************************************************************/
/* ReportForm: Event handlers */
/*****************************************************************************/

Template.ReportForm.events({
  'click .delete-btn': function(event, tmpl) {
    Meteor.call('deleteReport', this._id, function (error, result) {
      Router.go(Router.path('Reports', {page: 1}));
    });
  },

  'keydown #map-canvas':function(event, tmpl) {
    if (event.which === 13) {
      event.preventDefault();
    }
  },

  'click .cancel-btn': function(event, tmpl) {
    if(this._id) {
      Router.go('Report', {_id: this._id, slug: slugify(this.project.name)});
    } else {
      Router.go('ReportsIndex');
    }
  },
  'change #dropzone-images': function(event, tmpl) {
    uploadImages(event);
  },
  'click #dropzone-images': function(event, tmpl) {
    document.getElementById('upload-images').click();
  },
  'drop #dropzone-images': function(event, tmpl) {
    uploadImages(event);
  },
  'change #dropzone-files': function(event, tmpl) {
    uploadFiles(event);
  },
  'click #dropzone-files': function(event, tmpl) {
    document.getElementById('upload-files').click();
  },
  'drop #dropzone-files': function(event, tmpl) {
    uploadFiles(event);
  }
});

/*****************************************************************************/
/* ReportForm: Helpers */
/*****************************************************************************/

Template.ReportForm.helpers({
  imagesList: function() {
    if(currentRouteIs('EditReport')) {

      var report = Router._currentController && Router._currentController.data && Router._currentController.data();

      if(report) {
        var new_img_ids = uploadObject.getImages();
        var old_img_ids = _.pluck(report.images, 'fileId');

      return Images.find({_id: {$in : new_img_ids.concat(old_img_ids)}});
      }
      return [];
    }

    return Images.find({_id: {$in : uploadObject.getImages()}});
  },
  referencesList: function() {
    if(currentRouteIs('EditReport')) {
      var report = Router._currentController && Router._currentController.data && Router._currentController.data();

      if(report) {
        var new_files_ids = uploadObject.getReferences();
        var old_files_ids = _.pluck(report.references, 'fileId');

        return Files.find({_id: {$in : new_files_ids.concat(old_files_ids)}});
      }
      return [];
    }
    return Files.find({_id: {$in : uploadObject.getReferences()}});
  }
});
