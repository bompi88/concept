Migrations.add({
	version: 1,
	name: 'Convert success rates into operational and strategical success rates.',
	up: function() {
		Reports.find().forEach(function(report) {

			var strategicalEvaluations = [
				report.evaluation.achievement.value,
				report.evaluation.effects.value,
				report.evaluation.relevance.value,
				report.evaluation.viability.value,
				report.evaluation.profitability.value
			];

			var operationalEvaluations = [report.evaluation.productivity.value];

			var operationalSuccess = evaluateProject(operationalEvaluations);
			var strategicalSuccess = evaluateProject(strategicalEvaluations);
		
			Reports.update({ _id: report._id }, {
				$set: {
					"project.operationalSuccess": operationalSuccess,
					"project.strategicalSuccess": strategicalSuccess
				},
				$unset: {
					"project.successCategory": 1
				}
			});
		});
	}
});

Meteor.startup(function () {
	Migrations.migrateTo('latest');
});