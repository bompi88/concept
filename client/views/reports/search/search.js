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
Session.setDefault('searchBy', 'Navn');
Session.setDefault('searchQuery', '');

Template.Search.events({
  'click .dropdown-menu li': function(event, tmpl) {
    var chosenAttribute = $(event.currentTarget).text();
    Session.set('searchBy', chosenAttribute);
    Session.set('query', {});
    Session.set('searchQuery', '');
  },
  'keyup [type="text"]': function(event, template) {
    //escape regex
    var value = event.target.value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
    var field = attToField(Session.get('searchBy'));
    var query = {};
    //if number, use equals operator
    if(!isNaN(parseInt(value))) {
      query[field] = parseInt(value);
    }
    //if string, use contains operator with regex
    else {
      query[field] = { $regex: value, $options: 'i' };
    }
    //if the searchbox is empty we have to reset the query
    if(value == null || value == "")
      query = {};
    //this triggers iron router to load the report subscription again
    Session.set('query', query);
    Session.set('searchQuery', value);
  }
});
