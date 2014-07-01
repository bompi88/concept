/*****************************************************************************/
/* Meteor Methods */
/*****************************************************************************/
"use strict";

Meteor.methods({
	toggleReportPublic: function(id, publicity) {
		if(this.userId) {
			return Reports.update({_id: id}, {$set: {"_public": publicity}});
		} else {
			return false;
		}
	},
	// creates a pdf and returns the path
	createPdf: function(report) {

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

		doc.writeSync(process.env.PWD + '/public/pdf/' + report._id + '.pdf');

		return '/pdf/' + report._id + '.pdf';
	}
});
