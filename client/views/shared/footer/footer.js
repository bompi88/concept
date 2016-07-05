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
Template.Footer.events({
  'click .post': function (event, tmpl) {
    var which = $(event.currentTarget).data("id");

    if(which === "bjorbrat") {
      window.location.href = 'm' + 'a' + 'i' + 'l' + 't' + 'o' + ':' + which + '88' + '@' + 'gmail' + '.' + 'com';
    } else if(which === "andreas") {
      window.location.href = 'm' + 'a' + 'i' + 'l' + 't' + 'o' + ':' + which + '.' + 'drivenes' + '@' + 'gmail' + '.' + 'com';
    }
  }
});
