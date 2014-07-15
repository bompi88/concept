

Router.map(function() {
  this.route('pdfFile', {
    where: 'server',
    path: '/pdf/:_id',
    action: function() {
      var report = Reports.find({_id: this.params._id}).fetch()[0];

      if(report) {

        var file = generatePdf(report, this.params.spider);
        var filename = report.project.name + '.pdf';

        var headers = {
          'Content-type': 'application/pdf',
          'Content-Disposition': "attachment; filename=" + filename
        };

        this.response.writeHead(200, headers);
        return this.response.end(file);
      }
    }
  });

  this.route('csvFile', {
    where: 'server',
    path: '/csv',
    action: function() {

      var reportids = this.params.reports.split(',');
      var query = JSON.parse(this.params.query);
      var sort = JSON.parse(this.params.sort);
      var reports = Reports.find({$and: [{_id: {$nin: reportids}}, query]}, sort).fetch();

      if(reports) {
        var file = generateCSV(reports);
        var filename = 'rapportutvalg' + '.csv';

        var headers = {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': "attachment; filename=" + filename
        };

        this.response.writeHead(200, headers);
        return this.response.end(file);
      }
    }



  })
});


var generateCSV = function(reports) {

  var rows = [];
  reports.forEach(function(r) {
    var row = {
      "Navn": r.project.name,
      "Sektor": r.project.sector,
      "Prosjektnummer": r.project.projectNumber,
      "Styringsramme": r.project.managementBudget.amount,
      "Styringsramme årstall": r.project.managementBudget.year,
      "Kostnadsramme": r.project.costBudget.amount,
      "Kostnadsramme årstall": r.project.costBudget.year,
      "Sluttkostnad": r.project.costFinal.amount,
      "Sluttkostnad årstall": r.project.costFinal.year,
      "Evaluator": r.responsible.organization,
      "Suksesskategori": r.project.successCategory,
      "Produktivitet karakter": r.evaluation.productivity.value,
      "Maaloppnaaelse karakter": r.evaluation.achievement.value,
      "Virkninger karakter": r.evaluation.effects.value,
      "Relevans karakter": r.evaluation.relevance.value,
      "Levedyktighet karakter": r.evaluation.viability.value,
      "Samf.aak loennsomhet karakter": r.evaluation.profitability.value,
      "Produktivitet kort": r.evaluation.productivity.short,
      "Maaloppnaaelse kort": r.evaluation.achievement.short,
      "Virkninger kort": r.evaluation.effects.short,
      "Relevans kort": r.evaluation.relevance.short,
      "Levedyktighet kort": r.evaluation.viability.short,
      "Samf.aak loennsomhet kort": r.evaluation.profitability.short,
      "Produktivitet lang": r.evaluation.productivity.long,
      "Maaloppnaaelse lang": r.evaluation.achievement.long,
      "Virkninger lang": r.evaluation.effects.long,
      "Relevans lang": r.evaluation.relevance.long,
      "Levedyktighet lang": r.evaluation.viability.long,
      "Samf.aak loennsomhet lang": r.evaluation.profitability.long
    };
    rows.push(row);
  });

  var csv =  json2csv(rows, true, false);
  return csv;
};

var getImg = Meteor._wrapAsync(function(img, callback) {
  gm(img.createReadStream()).toBuffer(function (err, buffer) {
    if (err) return handle(err);

    callback(null, buffer);
  });
});

var generatePdf = function(report, spider) {

  if(!report || typeof report === 'undefined') {
    return false;
  }

  var doc = new PDFDocument({size: 'A4'});
  var defNaNText = "Ingen tekst tilgjengelig...";

  doc
  .fontSize(25)
  .text(report.project.name || defNaNText, 100, 100);

  doc.moveDown();

  doc
  .fontSize(18)
  .text('Bakgrunn');

  doc
  .fontSize(12)
  .text(report.project.projectDescription.long || defNaNText, {width: 400});

  doc.moveDown();

  if(report.images && report.images.length > 0) {
    var image = Images.findOne(report.images[0].fileId);
    var buffer = getImg(image);

    doc.image(buffer, { fit: [250, 250]});

    doc.moveDown();

    if (report.images[0].title && report.images[0].copyright) {
      var width = doc.widthOfString(report.images[0].copyright);
      var height = doc.currentLineHeight();
      var titleWidth = doc.widthOfString(report.images[0].title + ". Foto: " + report.images[0].copyright);

      doc .text(report.images[0].title + ". Foto: " + report.images[0].copyright)
      .fontSize(14)
      .underline(doc.x + titleWidth - width, doc.y - height, width, height, {color: 'blue'})

      if(report.images[0].link) {
        doc
        .link(doc.x + titleWidth - width, doc.y - height, width, height, report.images[0].link);
      }
    }

    doc.moveDown();
    doc.moveDown();
  }

  doc
  .fontSize(18)
  .text('Evaluering');

  doc.moveDown();

  doc
  .fontSize(16)
  .text('Samlet vurdering');

  doc
  .fontSize(12)
  .text(report.evaluation.overall.long || defNaNText);

  doc.moveDown();
  doc.addPage();
  // Spider diagram

  if(spider != null) {
  var spiderBuffer = new Buffer(spider.replace('data:image/png;base64,','') || '', 'base64');
  doc.image(spiderBuffer, (525 - 200) / 2, doc.y, { fit: [400, 300]});

  doc.moveDown();
  doc.moveDown();
  }
  doc
  .fontSize(16)
  .text('Produktivitet');

  doc
  .fontSize(12)
  .text(report.evaluation.productivity.long || defNaNText);

  doc.moveDown();


  doc
  .fontSize(16)
  .text('Måloppnåelse');

  doc
  .fontSize(12)
  .text(report.evaluation.achievement.long || defNaNText);

  doc.moveDown();

  doc
  .fontSize(16)
  .text('Virkninger');

  doc
  .fontSize(12)
  .text(report.evaluation.effects.long || defNaNText);

  doc.moveDown();

  doc
  .fontSize(16)
  .text('Relevans');

  doc
  .fontSize(12)
  .text(report.evaluation.relevance.long || defNaNText);

  doc.moveDown();

  doc
  .fontSize(16)
  .text('Levedyktighet');

  doc
  .fontSize(12)
  .text(report.evaluation.viability.long || defNaNText);

  doc.moveDown();

  doc
  .fontSize(16)
  .text('Samfunnsøkonomisk lønnsomhet');

  doc
  .fontSize(12)
  .text(report.evaluation.profitability.long || defNaNText);

  doc.moveDown();

  return doc.outputSync();
}
