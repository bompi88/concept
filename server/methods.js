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

		var doc = new PDFDocument({size: 'A4', margin: 50});
		// var imageBase64 = Meteor.users.findOne(this.userId).profile.picture;
		// var imageBuffer2 = new Buffer(imageBase64.replace('data:image/png;base64,','') || '', 'base64');
		//doc.image(imageBuffer2, 10, 10, {height: 75});
		doc.fontSize(12);
		doc.text('PDFKit is simple', 10, 30, {align: 'center', width: 200});

		doc.writeSync(process.env.PWD + '/public/pdf/' + report._id + '.pdf');

		return '/pdf/' + report._id + '.pdf';
	}
});
