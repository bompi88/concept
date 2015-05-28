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
/* DownloadListTable: Helpers */
/*****************************************************************************/

Template.DownloadList.helpers({
  getData: function(id, options) {
    var report = Router._currentController && Router._currentController.data && Router._currentController.data();
    if(options.hash && options.hash.parent && options.hash.parent.type) {
      if (options.hash.parent.type === 'images') {
        if(report && report.images){
            var img_data = _.find(report.images, function(img){ return img.fileId == id; });

            return _.extend(this, img_data);
        }
        return this;
      } else if (options.hash.parent.type === 'files') {
        if(report && report.references){
            var ref_data = _.find(report.references, function(ref){ return ref.fileId == id; });

            return _.extend(this, ref_data);
        }
        return this;
      }
    }
    return null;
  },

  // TODO: fix bad code
  // Runs for every image file in list, each time uploadObject changes
  getUrl: function(img, store) {
    uploadObject.dep.depend();

    if (img) {
      if (store) {
        return img.url(store);
      }
      else
        return img.url();
    }
    return null;
  },

  isChoosenasMainResource: function(resource) {
    return uploadObject.getImages().indexOf(resource) === 0;
  }
});

Template.DownloadList.events({
  'click .set-main-img': function (evt, tmpl) {
    uploadObject.setAsMainImg(this.fileId);
  }
});
