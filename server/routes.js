

Router.map(function() {
  this.route('pdfFile', {
    where: 'server',
    path: '/pdf/:_id',
    action: function() {
      var report = Reports.find({_id: this.params._id}).fetch()[0];

      if(report) {
        var spiderImg = this.params && this.params.spider || null;

        var filename = report.project.name + '.pdf';
        var headers = {
          'Content-type': 'application/pdf',
          'Cache-Control': 'must-revalidate, post-check=0, pre-check=0',
          'Pragma': 'public',
          'Content-Disposition': "attachment; filename=" + filename
        };

        var file = generatePdf(report, spiderImg);
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
          'Content-Type': 'text/csv',
          'Content-Disposition': "attachment; filename=" + filename
        };

        this.response.writeHead(200, headers);
        return this.response.end(file);
      }
    }
  })
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
      "Styringsramme": r.project.managementBudget.amount,
      "Styringsramme årstall": r.project.managementBudget.year,
      "Kostnadsramme": r.project.costBudget.amount,
      "Kostnadsramme årstall": r.project.costBudget.year,
      "Sluttkostnad": r.project.costFinal.amount,
      "Sluttkostnad årstall": r.project.costFinal.year,
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

var getImg = Meteor.wrapAsync(function(img, callback) {
  gm(img.createReadStream()).toBuffer(function (err, buffer) {
    if (err) return handle(err);

    callback(null, buffer);
  });
});

var createParagraph = function(doc, title, data, bigHeader) {

  var headerSize = bigHeader && 20 || 16;

  if(doc.y > 600) {
    doc.addPage();
  }

  doc
  .fontSize(headerSize)
  .font('Heading')
  .text(title);

  doc.moveDown();

  if(data && data.short) {
    doc
    .fontSize(12)
    .font('Italic')
    .text(data.short, {width: 400});

    doc.moveDown();
  }

  if(data && data.long) {
    doc
    .fontSize(12)
    .font('Regular')
    .text(data.long, {width: 400});

    doc.moveDown();
  }
};

var insertImage = function(doc, images, index) {
  if(images && images.length > (index - 1)) {

    if(doc.y > 450) {
      doc.addPage();
    }

    var image = Images.findOne(images[index].fileId);
    var buffer = getImg(image);

    doc.image(buffer, { fit: [250, 250]});

    doc.moveDown();

    createImageCaption(doc, images[index]);

    doc.moveDown();
    doc.moveDown();
  }
};

var createImageCaption = function(doc, image) {
  if (image.title && image.copyright) {
      var width = doc.widthOfString(image.copyright);
      var height = doc.currentLineHeight();
      var titleWidth = doc.widthOfString(image.title + ". Foto: " + image.copyright);

      // create the caption
      doc .text(image.title + ". Foto: " + image.copyright)
      .fontSize(14)
      .underline(doc.x + titleWidth - width, doc.y - height, width, height, {color: 'blue'})

      // create a link over copyright text
      if(image.link) {
        doc
        .link(doc.x + titleWidth - width, doc.y - height, width, height, image.link);
      }
    }
};

var generatePdf = function(report, spider) {

  var pathToFonts = process.env.NODE_ENV === 'production' ? process.env.PWD + "/app/programs/server/assets/app/" : process.env.PWD + "/private/";

  if(!report || typeof report === 'undefined') {
    return false;
  }

  var doc = new PDFDocument({size: 'A4'});
  var defNaNText = "Ingen tekst tilgjengelig...";

  doc
  .registerFont('Heading', pathToFonts + 'fonts/OpenSans-Semibold.ttf', 'OpenSans-Semibold')
  .registerFont('Italic', pathToFonts + 'fonts/OpenSans-Italic.ttf', 'OpenSans-Italic')
  .registerFont('Regular', pathToFonts + 'fonts/OpenSans-Light.ttf', 'OpenSans-Light')

  doc
  .fontSize(25)
  .text(report.project.name, 100, 100);

  doc.moveDown();

  createParagraph(doc, 'Bakgrunn', report.project.projectDescription, true);
  if(report.images && report.images[0])
    insertImage(doc, report.images, 0);

  createParagraph(doc, 'Samlet vurdering', report.evaluation.overall, true);

  // Spider diagram
  if(spider != null && spider.length) {

    if(doc.y > 520) {
      doc.addPage();
    }

    var spiderBuffer = new Buffer(spider.replace('data:image/png;base64,','') || '', 'base64');
    doc.image(spiderBuffer, (450+ - 200) / 2, doc.y, { fit: [400, 300]});

    doc.moveDown();
    doc.moveDown();
  }

  createParagraph(doc, 'Produktivitet', report.evaluation.productivity);
  createParagraph(doc, 'Måloppnåelse', report.evaluation.achievement);
  createParagraph(doc, 'Virkninger', report.evaluation.effects);
  createParagraph(doc, 'Relevans', report.evaluation.relevance);
  createParagraph(doc, 'Levedyktighet', report.evaluation.viability);
  createParagraph(doc, 'Samfunnsøkonomisk lønnsomhet', report.evaluation.profitability);

  return doc.outputSync();
};
