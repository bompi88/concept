/*****************************************************************************/
/* Meteor Methods */
/*****************************************************************************/

Meteor.methods({
	deleteImages: function(ids) {
		if(this.userId) {
			Images.remove({_id: { $in: ids}});
		}
	},
	deleteReferences: function(ids) {
		if(this.userId) {
			Files.remove({_id: { $in: ids}});
		}
	},
	toggleReportPublic: function(id, publicity) {
		if(this.userId) {
			return Reports.update({_id: id}, {$set: {"_public": publicity}});
		}
	},
	// creates a pdf and returns the path
	createPdf: function(report) {
		if(!report || typeof report === 'undefined')
			return false;

		var doc = new PDFDocument({size: 'A4', margin: 20});
		// var imageBase64 = Meteor.users.findOne(this.userId).profile.picture;
		// var imageBuffer2 = new Buffer(imageBase64.replace('data:image/png;base64,','') || '', 'base64');
		//doc.image(imageBuffer2, 10, 10, {height: 75});
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
	   		.text(report.evaluation.productivity.long || "Ingen tekst tilgjengelig...");
		
		doc.moveDown();


	   	doc
	   		.fontSize(16)
	   		.text('Måloppnåelse');

	   	doc
	   		.fontSize(12)
	   		.text(report.evaluation.achievement.long || "Ingen tekst tilgjengelig...");

	   	doc.moveDown();

	   	doc
	   		.fontSize(16)
	   		.text('Virkninger');

	   	doc
	   		.fontSize(12)
	   		.text(report.evaluation.effects.long || "Ingen tekst tilgjengelig...");

	   	doc.moveDown();

	   	doc
	   		.fontSize(16)
	   		.text('Relevans');

	   	doc
	   		.fontSize(12)
	   		.text(report.evaluation.relevance.long || "Ingen tekst tilgjengelig...");

	   	doc.moveDown();

	   	doc
	   		.fontSize(16)
	   		.text('Levedyktighet');

	   	doc
	   		.fontSize(12)
	   		.text(report.evaluation.viability.long || "Ingen tekst tilgjengelig...");

	   	doc.moveDown();

	   	doc
	   		.fontSize(16)
	   		.text('Samfunnsøkonomisk lønnsomhet');

	   	doc
	   		.fontSize(12)
	   		.text(report.evaluation.profitability.long || "Ingen tekst tilgjengelig...");

	   	doc.moveDown();

		doc.writeSync(process.env.PWD + '/public/pdf/' + report._id + '.pdf');

		return '/pdf/' + report._id + '.pdf';
	}
});
