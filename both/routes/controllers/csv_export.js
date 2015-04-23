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
CSVExportController = RouteController.extend({
  action: function() {

    var reportids = this.params.query.reports.split(',');
    var query = JSON.parse(this.params.query.query);
    var sort = JSON.parse(this.params.query.sort);
    var reports = Reports.find({$and: [{_id: {$nin: reportids}}, query]}, sort).fetch();

    if(reports) {
      var file = generateCSV(reports);
      var filename = 'rapportutvalg' + '.csv';

      var headers = {
        'Content-Type': 'text/csv',
        'Content-Disposition': "attachment; filename=" + filename
      };

      this.response.writeHead(200, headers);
      return this.response.end(file);
    }
  }
});

var encodeUTF16LE = function(str) {
  return iconv.encode(str, 'win1252');
}

var generateCSV = function(reports) {

  var newlinePattern = /(\r\n|\n|\r)/gm;

  var rows = [];
  reports.forEach(function(r) {
    var row = {
      "Navn": r.project.name,
      "Sektor": r.project.sector,
      "Prosjektnummer": r.project.projectNumber,
      "Styringsramme": r.project.managementBudget && r.project.managementBudget.amount || "",
      "Styringsramme årstall": r.project.managementBudget && r.project.managementBudget.year || "",
      "Kostnadsramme": r.project.costBudget && r.project.costBudget.amount || "",
      "Kostnadsramme årstall": r.project.costBudget && r.project.costBudget.year || "",
      "Sluttkostnad": r.project.costFinal && r.project.costFinal.amount || "",
      "Sluttkostnad årstall": r.project.costFinal && r.project.costFinal.year || "",
      "Evaluator": r.responsible.organization,
      "Suksesskategori": r.project.successCategory,
      "Produktivitet (karakter)": r.evaluation.productivity.value,
      "Måloppnåelse (karakter)": r.evaluation.achievement.value,
      "Virkninger (karakter)": r.evaluation.effects.value,
      "Relevans (karakter)": r.evaluation.relevance.value,
      "Levedyktighet (karakter)": r.evaluation.viability.value,
      "Samf.øk. lønnsomhet (karakter)": r.evaluation.profitability.value,
      "Produktivitet (kort)": r.evaluation.productivity.short && r.evaluation.productivity.short.trim().replace(newlinePattern, ""),
      "Måloppnåelse (kort)": r.evaluation.achievement.short && r.evaluation.achievement.short.trim().replace(newlinePattern, ""),
      "Virkninger (kort)": r.evaluation.effects.short && r.evaluation.effects.short.trim().replace(newlinePattern, ""),
      "Relevans (kort)": r.evaluation.relevance.short && r.evaluation.relevance.short.trim().replace(newlinePattern, ""),
      "Levedyktighet (kort)": r.evaluation.viability.short && r.evaluation.viability.short.trim().replace(newlinePattern, ""),
      "Samf.øk. lønnsomhet (kort)": r.evaluation.profitability.short && r.evaluation.profitability.short.trim().replace(newlinePattern, ""),
      "Produktivitet (lang)": r.evaluation.productivity.long && r.evaluation.productivity.long.trim().replace(newlinePattern, ""),
      "Måloppnåelse (lang)": r.evaluation.achievement.long && r.evaluation.achievement.long.trim().replace(newlinePattern, ""),
      "Virkninger (lang)": r.evaluation.effects.long && r.evaluation.effects.long.trim().replace(newlinePattern, ""),
      "Relevans (lang)": r.evaluation.relevance.long && r.evaluation.relevance.long.trim().replace(newlinePattern, ""),
      "Levedyktighet (lang)": r.evaluation.viability.long && r.evaluation.viability.long.trim().replace(newlinePattern, ""),
      "Samf.øk. lønnsomhet (lang)": r.evaluation.profitability.long && r.evaluation.profitability.long.trim().replace(newlinePattern, "")
    };
    rows.push(row);
  });

  var csv =  json2csv(rows, true, false);
  return encodeUTF16LE(csv);
};
