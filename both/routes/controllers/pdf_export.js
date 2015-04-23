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
PDFExportController = RouteController.extend({
  action: function() {

    var report = Reports.find({_id: this.params._id}).fetch()[0];
    if(report) {
      var spiderImg = this.params && this.params.query.spider || "";
      
      spiderImg = decodeURIComponent(spiderImg).replace(new RegExp('\\-', 'gi'),'+').replace(new RegExp('\\_', 'gi'),'/').replace(new RegExp('\\=', 'gi'),'~');

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

  createParagraph(doc, 'Bakgrunn', report.project && report.project.projectDescription, true);
  if(report.images && report.images[0])
    insertImage(doc, report.images, 0);

  createParagraph(doc, 'Samlet vurdering', report.evaluation && report.evaluation.overall, true);

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

  createParagraph(doc, 'Produktivitet', report.evaluation && report.evaluation.productivity);
  createParagraph(doc, 'Måloppnåelse', report.evaluation && report.evaluation.achievement);
  createParagraph(doc, 'Virkninger', report.evaluation && report.evaluation.effects);
  createParagraph(doc, 'Relevans', report.evaluation && report.evaluation.relevance);
  createParagraph(doc, 'Levedyktighet', report.evaluation && report.evaluation.viability);
  createParagraph(doc, 'Samfunnsøkonomisk lønnsomhet', report.evaluation && report.evaluation.profitability);

  return doc.outputSync();
};


