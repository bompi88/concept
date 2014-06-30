/*****************************************************************************/
/* Reports Scheme */
/*****************************************************************************/

var textAreaRegEx = /^[a-z0-9A-z .,!;\n\r&:%"?æøåÆØÅèÈéÉ\/()<>-]*$/;
var textFieldRegEx = /^[a-z0-9A-z .,æøåÆØÅèÈéÉ()-]{2,100}$/;

ReportScheme = new SimpleSchema({
    project: {
        type: Object,
        optional: false
    },
    "project.name": {
    	type: String,
    	label: "Prosjektnavn",
    	optional: false,
    	regEx: textFieldRegEx
    },
    "project.projectNumber": {
    	type: Number,
    	label: "Prosjektnummer (Trailbase)",
    	optional: false,
    	regEx: /^[0-9 ]{1,10}$/
    },
    "project.sector": {
    	type: String,
    	label: "Sektor",
    	optional: false,
        regEx: textFieldRegEx
    },
    "project.location": {
        type: Object,
        optional: false
    },
    "project.location.name": {
        type: String,
        label: "Lokasjonsbeskrivelse for evalueringsobjektet",
        optional: true,
        regEx: textFieldRegEx
    },
    "project.location.coordinates": {
        type: Object,
        optional: true
    },
    "project.location.coordinates.lat": {
        type: String,
        optional: true
    },
    "project.location.coordinates.lng": {
        type: String,
        optional: true
    },
    "project.successCategory": {
        type: Number,
        optional: false,
        regEx: /^[1-3]$/
    },
    "project.projectDescription": {
        type: Object,
        optional: false
    },
    "project.projectDescription.short": {
        type: String,
        label: "Kort prosjektbeskrivelse",
        optional: false,
        regEx: textAreaRegEx
    },
    "project.projectDescription.long": {
        type: String,
        label: "Utdypende prosjektbeskrivelse og mål/bakgrunn for prosjektet",
        optional: false,
        regEx: textAreaRegEx
    },
    "project.finishingYear": {
        type: Number,
        label: "Årstall for ferdigstilling av prosjekt",
        optional: false,
        max:9999,
        min:1900,
        regEx: /^[0-9]{4}$/
    },
    "project.evaluationYear": {
        type: Number,
        label: "Årstall for utført evaluering",
        optional: false,
        max:9999,
        min:1900,
        regEx: /^[0-9]{4}$/
    },
    "project.decisionYear": {
        type: Number,
        label: "Årstall for vedtak",
        optional: false,
        max:9999,
        min:1900,
        regEx: /^[0-9]{4}$/
    },
    "project.managementBudget": {
        type: Object,
        optional: false
    },
    "project.managementBudget.year": {
        type: Number,
        label: "Årstall (Styringsramme)",
        optional: false,
        max:9999,
        min:1900,
        regEx: /^[0-9]{4}$/
    },
    "project.managementBudget.amount": {
        type: Number,
        label: "Styringsramme (i millioner NOK)",
        optional: false,
        regEx: /^[0-9]{1-10}$/
    },
    "project.costBudget": {
        type: Object,
        optional: false
    },
    "project.costBudget.year": {
        type: Number,
        label: "Årstall (Kostnadsramme)",
        optional: false,
        max:9999,
        min:1900,
        regEx: /^[0-9]{4}$/
    },
    "project.costBudget.amount": {
        type: Number,
        label: "Kostnadsramme (i millioner NOK)",
        optional: false,
        regEx: /^[0-9]{1-10}$/
    },
    "project.costFinal": {
        type: Object,
        optional: false
    },
    "project.costFinal.year": {
        type: Number,
        label: "Årstall (Sluttkostnad)",
        optional: false,
        max:9999,
        min:1900,
        regEx: /^[0-9]{4}$/
    },
    "project.costFinal.amount": {
        type: Number,
        label: "Sluttkostnad (i millioner NOK)",
        optional: false,
        regEx: /^[0-9]{1-10}$/
    },
    "evaluation": {
        type: Object,
        optional: false
    },
    "evaluation.overall": {
        type: Object,
        optional: false
    },
    "evaluation.overall.short": {
        type: String,
        label: "Kort samlet vurdering",
        optional: true,
        regEx: textAreaRegEx
    },
    "evaluation.overall.long": {
        type: String,
        label: "Utdypende samlet vurdering",
        optional: true,
        regEx: textAreaRegEx
    },
    "evaluation.productivity": {
        type: Object,
        optional: false
    },
    "evaluation.productivity.short": {
        type: String,
        label: "Kort vurdering av produktivitet",
        optional: true,
        regEx: textAreaRegEx
    },
    "evaluation.productivity.long": {
        type: String,
        label: "Utdypende vurdering av produktivitet",
        optional: true,
        regEx: textAreaRegEx
    },
    "evaluation.productivity.value": {
        type: Number,
        optional: false,
        regEx: /^[1-6]$/
    },
    "evaluation.achievement": {
        type: Object,
        optional: false
    },
    "evaluation.achievement.short": {
        type: String,
        label: "Kort vurdering av måloppnåelse",
        optional: true,
        regEx: textAreaRegEx
    },
    "evaluation.achievement.long": {
        type: String,
        label: "Utdypende vurdering av måloppnåelse",
        optional: true,
        regEx: textAreaRegEx
    },
    "evaluation.achievement.value": {
        type: Number,
        optional: false,
        regEx: /^[1-6]$/
    },
    "evaluation.effects": {
        type: Object,
        optional: false
    },
    "evaluation.effects.short": {
        type: String,
        label: "Kort vurdering av virkninger",
        optional: true,
        regEx: textAreaRegEx
    },
    "evaluation.effects.long": {
        type: String,
        label: "Utdypende vurdering av virkninger",
        optional: true,
        regEx: textAreaRegEx
    },
    "evaluation.effects.value": {
        type: Number,
        optional: false,
        regEx: /^[1-6]$/
    },
    "evaluation.relevance": {
        type: Object,
        optional: false
    },
    "evaluation.relevance.short": {
        type: String,
        label: "Kort vurdering av relevans",
        optional: true,
        regEx: textAreaRegEx
    },
    "evaluation.relevance.long": {
        type: String,
        label: "Utdypende vurdering av relevans",
        optional: true,
        regEx: textAreaRegEx
    },
    "evaluation.relevance.value": {
        type: Number,
        optional: false,
        regEx: /^[1-6]$/
    },
    "evaluation.viability": {
        type: Object,
        optional: false
    },
    "evaluation.viability.short": {
        type: String,
        label: "Kort vurdering av levedyktighet",
        optional: true,
        regEx: textAreaRegEx
    },
    "evaluation.viability.long": {
        type: String,
        label: "Utdypende vurdering av levedyktighet",
        optional: true,
        regEx: textAreaRegEx
    },
    "evaluation.viability.value": {
        type: Number,
        optional: false,
        regEx: /^[1-6]$/
    },
    "evaluation.profitability": {
        type: Object,
        optional: false
    },
    "evaluation.profitability.short": {
        type: String,
        label: "Kort vurdering av samfunnsøkonomisk lønnsomhet",
        optional: true,
        regEx: textAreaRegEx
    },
    "evaluation.profitability.long": {
        type: String,
        label: "Utdypende vurdering av samfunnsøkonomisk lønnsomhet",
        optional: true,
        regEx: textAreaRegEx
    },
    "evaluation.profitability.value": {
        type: Number,
        optional: false,
        regEx: /^[1-6]$/
    },
    "responsible": {
        type: Object,
        optional: false
    },
    "responsible.organization": {
        type: String,
        label: "Evalueringsansvarlig instans",
        optional: false,
        regEx: textFieldRegEx
    },
    "responsible.person": {
        type: String,
        label: "Evalueringsansvarlig person",
        optional: true,
        regEx: textFieldRegEx
    },
    "images": {
        type: [Object],
        optional: false
    },
    "images.$.fileId": {
        type: String,
        optional: true,
        regEx: SimpleSchema.RegEx.Id
    },
    "images.$.title": {
        type: String,
        label: "Tittel",
        optional: true/*,
        regEx: textFieldRegEx*/
    },
    "images.$.copyright": {
        type: String,
        label: "Kilde",
        optional: true/*,
        regEx: textFieldRegEx*/
    },
    "images.$.link": {
        type: String,
        label: "Kilde-URL",
        optional: true/*,
        regEx: SimpleSchema.RegEx.Url*/
    },
    "references": {
        type: [Object],
        optional: false
    },
    "references.$.fileId": {
        type: String,
        optional: true,
        regEx: SimpleSchema.RegEx.Id
    },
    "references.$.title": {
        type: String,
        label: "Tittel",
        optional: true/*,
        regEx: textFieldRegEx*/
    },
    "references.$.typedoc": {
        type: String,
        label: "Dokumenttype",
        optional: true/*,
        regEx: textFieldRegEx*/
    },
    "references.$.date": {
        type: String,
        label: "Dato",
        optional: true/*,
        regEx: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/*/
    },
    "_id": {
        type: String,
        denyInsert: true,
        optional: true,
        regEx: SimpleSchema.RegEx.Id
    },
    "_public": {
        type: Boolean,
        optional: false
    }
});

ReportScheme.messages({
    required: "[label] må fylles ut",
    minString: "[label] må inneholde minimum [min] tegn",
    maxString: "[label] må ikke overskride [max] tegn",
    minNumber: "[label] må minst være [min]",
    maxNumber: "[label] må ikke overskride [max]",
    minDate: "[label] må være enten på eller før [min]",
    maxDate: "[label] kan ikke være etter [max]",
    minCount: "Du må spesifisere minst [minCount] verdier",
    maxCount: "Du kan ikke spesifisere mer enn [maxCount] verdier",
    noDecimal: "[label] må inneholde et heltall",
    notAllowed: "[value] er ikke en gyldig verdi",
    expectedString: "[label] må inneholde en streng",
    expectedNumber: "[label] må inneholde et tall",
    expectedBoolean: "[label] må være en bolsk verdi",
    expectedArray: "[label] må være en liste",
    expectedObject: "[label] må være et objekt",
    expectedConstructor: "[label] må være av type [type]",
    regEx: "[label] feilet ved regulær sjekk av innholdet"
});

Reports.attachSchema(ReportScheme);