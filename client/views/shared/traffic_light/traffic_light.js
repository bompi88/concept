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
Template.TrafficLight.helpers({
  successColor: function() {
    try {
      var success = this.success;

      if(success == 1) {
        return "Rød";
      }
      else if(success == 2) {
        return "Gul";
      }
      else if(success == 3) {
        return "Grønn";
      }
      else return false;
    }
    catch(err) {
      return false;
    }
  },
  isColor: function (c) {
    if(this.success)
      return parseInt(c) === this.success;
    return false;
  }
});

Template.TrafficLight.rendered = function () {
  $('.tool-top').tooltip();
};
