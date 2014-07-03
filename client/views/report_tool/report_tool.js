/**
 * ReportTool: Filter and export projects
 */


//this session variable holds the applied report filters to support reactivity
Session.setDefault('filters', []);


// -- Events --------------------------------------------------------

Template.Filter.events({

	'click .dropdown-menu li': function(event, tmpl) {
		var chosenAttribute = $(event.currentTarget).text();
		var elementType = $(event.currentTarget).attr('class');
		var dropdownType = "";

		//which dropdown was clicked?
		if(elementType === "attribute-item")
			dropdownType = "#attribute-picker";
		else if(elementType == "operator-item")
			dropdownType = "#operator-picker";

		//replace button text in dropdown with chosen element
  		$('.btn-group').find(dropdownType).html(chosenAttribute+' <span class="caret"></span>');

	},

	'click #add-filter' : function(event, tmpl) {
		var value = tmpl.find('#value-picker').value;

		//parse value to int if possible 
		if(!isNaN(value)) 
			value = parseInt(value);

		//create a filter object 
		var filter = {
			"attribute": tmpl.find('#attribute-picker').text.trim(),
			"operator": tmpl.find('#operator-picker').text.trim(),
			"value": value
		}

		//if the filter validates, set new session variable
		if(validateFilter(filter)) {
			var filters = Session.get('filters');
			filters.push(filter);
			Session.set('filters', filters);
		}
		else {
			//TODO: Red text in page instead of modal?
			bootbox.alert("Sjekk at attributt, operator og verdi gir mening sammen.");
		}

		

	}

});


Template.FilterList.events({
	'click #remove-filter': function(event, tmpl) {
		var filters = Session.get('filters');
		var oldFilter = this;
		//use underscorejs reject to remove the old filter and update session variable
		var newFilters = _.reject(filters, function(filter){
			if(filter.attribute===oldFilter.attribute && filter.operator===oldFilter.operator && filter.value===oldFilter.value)
				return true
			});
		Session.set('filters', newFilters);

	}
});


// -- Template Helpers --------------------------------------------------------


Template.FilterList.filters = function() {
	return Session.get('filters');
}


Template.FilterReportTable.reports = function() {
	var filters = Session.get('filters');
	var reports = filterReports(Reports.find({}).fetch(), filters);
	return reports;
};



/**
 * Filter reports based on the session variable using underscorejs _.filter method
 * Every report has to go through all the filters that uses operator helpers
 * If a false value is returned, the report is filtered out
 */

function filterReports(reports, filters) {

	var filteredReports = _.filter(reports, function(report) {
		if(!filters || filters.length == 0)
			return true;
		var i;
		for(i = 0; i < filters.length; i++) {
			var filter = filters[i];
			if(filter.operator == "er lik") {

				if(equals(filter.attribute, filter.value, report))
					continue;
				else return false;

			}
			else if(filter.operator == "inneholder") {

				if(contains(filter.attribute, filter.value, report))
					continue;
				else return false;
				
			}
			else if(filter.operator == "større enn") {

				if(largerThan(filter.attribute, filter.value, report))
					continue;
				else {
					return false;
				}
				
			}
			else if(filter.operator == "mindre enn") {

				if(lessThan(filter.attribute, filter.value, report))
					continue;
				else return false;

			}
		}
		return true;
	});
	return filteredReports;
}



/**
 * Implementations of equals, contains, largerThan and lessThan.
 * Returns either true or false
 */

function equals(att, value, report) {
	var attribute = nameToAttribute(att, report);
	return attribute === value;
}

function contains(att, value, report) {
	var attribute = nameToAttribute(att, report);
	return attribute.indexOf(value) > -1;
}

function largerThan(att, value, report) {
	var attribute = nameToAttribute(att, report);
	return attribute > value;

}

function lessThan(att, value, report) {
	var attribute = nameToAttribute(att, report);
	return attribute < value;

}


/**
 * Mapping function between attribute name and actual attribute value from report
 */

function nameToAttribute(attribute, report) {

	if(attribute === 'Sektor') 
		return report.project.sector;
	else if(attribute === 'Navn')
		return report.project.name;
	else if(attribute === 'Evaluator')
		return report.responsible.organization;
	else if(attribute === 'Suksesskategori')
		return report.project.successCategory;
	else if(attribute === 'Årstall ferdigstilt')
		return report.project.finishingYear;
	else if(attribute === 'Årstall evaluering')
		return report.project.evaluationYear;
	else if(attribute === 'Styringsramme')
		return report.project.managementBudget.amount;
	else if(attribute === 'Sluttkostnad')
		return report.project.costFinal.amount;
	else if(attribute === 'Produktivitet')
		return report.project.evaluation.productivity.value;
	else if(attribute === 'Måloppnåelse')
		return report.project.evaluation.achievement.value;
	else if(attribute === 'Virkninger')
		return report.project.evaluation.effects.value;
	else if(attribute === 'Relevans')
		return report.project.evaluation.relevance.value;
	else if(attribute === 'Levedyktighet')
		return report.project.evaluation.viability.value;
	else if(attribute === 'Samf.øk lønnsomhet')
		return report.project.evaluation.profitability.value;
	else return false;

}

/**
 * All possible filter combinations are allowed from the user interface.
 * Therefore they have to pass through this validate method. 
 */

function validateFilter(filter) {

	var checklist = {
		"string": {
			"attributes": ["Sektor", "Navn", "Evaluator"],
			"operators": ["er lik", "inneholder"]
		},
		"number": {
			"attributes": ["Suksesskategori", "Årstall ferdigstilt", "Årstall evaluering", "Styringsramme", "Sluttkostnad", "Produktivitet", "Måloppnåelse", "Samf.øk lønnsomhet", "Virkninger", "Levedyktighet", "Relevans"],
			"operators": ["er lik", "større enn", "mindre enn"]
		}
	};

	//check if the attribute is in the string allowed attributes
	if(_.contains(checklist.string.attributes, filter.attribute)) {
		//check if operator is in the string allowed operators
		if(_.contains(checklist.string.operators, filter.operator)) {
			//check if the value is a string or an instance of string
			if(typeof filter.value == "string" || filter.value instanceof String) {
				return true;
			}
		}

	}
	//check the attribute is in the number allowed attributes
	else if(_.contains(checklist.number.attributes, filter.attribute)) {
		//check if the operator is in the number allowed operators
		if(_.contains(checklist.number.operators, filter.operator)) {
			//check if if the value is indeed an int
			if(!isNaN(filter.value)) {
				return true;
			}
		}
	}

	return false;

}