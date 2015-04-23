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
/**
 * Images Collection
 */

Images = new FS.Collection("images", {
  stores: [
    new FS.Store.GridFS("original", {
      transformWrite: function(fileObj, readStream, writeStream) {
        // Transform the image into a smaller image,
        // max 1024 pixels in either direction
        gm(readStream, fileObj.name).resize('1024', '1024')
          .setFormat("PNG").stream().pipe(writeStream);
      }
    }),
    new FS.Store.GridFS("medium", {
      transformWrite: function(fileObj, readStream, writeStream) {
        // Transform the image into a thumbnail
        gm(readStream, fileObj.name).resize('500', '250')
          .setFormat("PNG").stream().pipe(writeStream);
      }
    }),
    new FS.Store.GridFS("thumbs", {
      transformWrite: function(fileObj, readStream, writeStream) {
        // Transform the image into a thumbnail
        gm(readStream, fileObj.name).resize(null, '150').gravity('Center')
          .crop('250', '150').setFormat("PNG").stream().pipe(writeStream);
      }
    }),
    new FS.Store.GridFS("fixed", {
      transformWrite: function(fileObj, readStream, writeStream) {
        // Transform the image into a smaller image,
        // max 1024 pixels in either direction
        gm(readStream, fileObj.name).resize('100', '100', "^")
        .gravity('Center')
        .extent('100', '100')
        .setFormat("PNG").stream().pipe(writeStream);
      }
    })
  ],
  filter: {
    allow: {
      contentTypes: ['image/*'] //allow only images
    }
  }
});
