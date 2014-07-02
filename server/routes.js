

Router.map(function() {
  this.route('pdfFile', {
    where: 'server',
    path: '/pdf/:_id',
    action: function() {
      var report = Reports.find({_id: this.params._id}).fetch()[0];
      console.log(report)
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

var generatePdf = function(report) {

    if(!report || typeof report === 'undefined') {
      return false;
    }

    var doc = new PDFDocument({size: 'A4', margin: 20});
    var defNaNText = "Ingen tekst tilgjengelig...";

    doc
        .fontSize(25)
        .text(report.project.name, 100, 100);

    doc.moveDown();

    doc
        .fontSize(18)
        .text('Bakgrunn');

      doc
        .fontSize(12)
        .text(report.project.projectDescription.long);

    doc.moveDown();

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
