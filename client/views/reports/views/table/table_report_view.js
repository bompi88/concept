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
Template.TableReportView.events({
  'click .row-item': function(event, tmpl) {
    $('.pop-info').popover('hide');
    Router.go('Report', {_id: this._id, slug: slugify(this.project.name)});
  },
  'click div.popover-content': function() {
    $('.pop-info').popover('hide');
  },
  'click .pop-info': function(event, tmpl) {
    $('.pop-info').click(function(){
        $('.pop-info').not(this).popover('hide');
    });
  },
  'click input[type="checkbox"]': function(event, tmpl) {
    var that = this;

    //unchecked fører til at vi må svarteliste rapporten globalt
    if($(event.target).prop("checked") === false) {
      var blacklist = Session.get('uncheckedReportIds');
      blacklist.push(that._id);
      Session.set('uncheckedReportIds', blacklist);
    }

    //hvis ikke må vi fjerne rapporten fra svartelisten
    else{
     var result = _.reject(Session.get('uncheckedReportIds'), function(id) {

      if(id === that._id)
        return true;
      return false;
    });
     Session.set('uncheckedReportIds', result);
   }
 }
});

Template.TableReportView.helpers({
  isChecked: function() {
    var blacklist = Session.get('uncheckedReportIds');
    if(!_.contains(blacklist, this._id))
      return true;
    return false;
  },
  infoText: "Tallene er i noen tilfeller prisomregnet av evaluator. Se nærmere omtalen av hvert prosjekt."
});

Template.TableReportView.rendered = function () {
  $('.pop-info').popover({
    placement: 'top'
  });
};
