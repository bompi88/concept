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
"use strict";

/**
 * Publishes a set of reports, sorted, filtered, paginated and just the fields we need.
 * Also publishes an image associated with each report
 *
 * @query: filters report based on criterias
 * @aggr: object with different projections: sorting, limitation, skipping etc
 */
Meteor.publish('reportsWithImage', function(query, aggr) {
  //fields to remove in the db query
  aggr.fields = {
    'evaluation.overall.short': 0,
    'evaluation.overall.long': 0,
    'evaluation.productivity.short': 0,
    'evaluation.productivity.long': 0,
    'evaluation.achievement.short': 0,
    'evaluation.achievement.long': 0,
    'evaluation.effects.long': 0,
    'evaluation.effects.short': 0,
    'evaluation.relevance.long': 0,
    'evaluation.relevance.short': 0,
    'evaluation.viability.long': 0,
    'evaluation.viability.short': 0,
    'evaluation.profitability.long': 0,
    'evaluation.profitability.short': 0,
    'references': 0,
    'project.projectDescription.long' : 0

  };

  var reportsCursor;

	if(this.userId) {
		reportsCursor = Reports.find(query, aggr);
	}
  else {
		reportsCursor = Reports.find({$and: [{_public: true}, query]}, aggr);
	}

  var imageIds = reportsCursor.map(function(report) {
        if(report.images && report.images[0] && report.images[0].fileId)
          return report.images[0].fileId;
  });

  return [reportsCursor, Images.find({ _id: { $in : imageIds}})]
});

/**
 * Publishes a particular report.
 *
 * @id: report id to return
 */
Meteor.publish('report', function(id) {
	if(this.userId) {
		return Reports.find({_id: id});
	} else {
		return Reports.find({ $and: [{ _id: id }, { _public: true }] });
	}
});
