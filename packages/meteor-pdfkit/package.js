Package.describe({
  summary: "PDFKit, the PDF generation library"
});


Package.onUse(function (api) {
  api.use('underscore', 'server');

  api.export('PDFDocument', 'server');

  api.addFiles('pdfkitWrapper.js', 'server');
});

Npm.depends({
  pdfkit: "0.4.3"
});
