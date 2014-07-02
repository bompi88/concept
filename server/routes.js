

Router.map(function() {
  this.route('pdfFile', {
    where: 'server',
    path: '/pdf/:_id',
    action: function() {
      var report = Reports.find({_id: this.params._id}).fetch()[0];

      if(report) {

        var file = generatePdf(report);
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
});

var getImg = Meteor._wrapAsync(function(img, callback) {
  gm(img.createReadStream()).toBuffer(function (err, buffer) {
    if (err) return handle(err);

    callback(null, buffer);
  });
});

var generatePdf = function(report) {

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

      var width = doc.widthOfString(report.images[0].copyright);
      var height = doc.currentLineHeight();
      var titleWidth = doc.widthOfString(report.images[0].title + ". Foto: " + report.images[0].copyright);

      doc .text(report.images[0].title + ". Foto: " + report.images[0].copyright)
          .fontSize(14)
          .underline(doc.x + titleWidth - width, doc.y - height, width, height, {color: 'blue'})
          .link(doc.x + titleWidth - width, doc.y - height, width, height, report.images[0].link);

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

      doc.moveDown();

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
