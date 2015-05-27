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
Template.SortBox.helpers({
  currentSort: function() {
    var text = '';
    var curSort = Session.get('sortBy');

    if (curSort === 'project.name') {
      text = 'Navn';
    } else if (curSort === 'project.operationalSuccess') {
      text = 'Operasjonell suksess';
    } else if (curSort === 'project.strategicalSuccess') {
      text = 'Strategisk suksess';
    } else if (curSort === 'project.sector') {
      text = 'Sektor';
    } else if (curSort === 'project.finishingYear') {
      text = 'Årstall ferdigstilt';
    } else if (curSort === 'project.evaluationYear') {
      text = 'Årstall evaluering';
    } else if (curSort === 'project.managementBudget.amount') {
      text = 'Styringsramme';
    } else if (curSort === 'project.costFinal.amount') {
      text = 'Sluttkostnad';
    } else if (curSort === 'project.costBudget.amount') {
      text = 'Kostnadsramme';
    } else if (curSort === 'responsible.organization') {
      text = 'Evaluator';
    }
    return text;
  },
  currentSortDirection: function() {
    var order = Session.get('sortOrder');
    var type = Session.get('sortType');
    if(order === 'asc') {
      if(type === 'string')
        return 'glyphicon glyphicon-sort-by-alphabet';
      else
        return 'glyphicon glyphicon-sort-by-order';
    }
    else {
      if(type === 'string')
        return 'glyphicon glyphicon-sort-by-alphabet-alt';
      else
        return 'glyphicon glyphicon-sort-by-order-alt';
    }

  }

});
