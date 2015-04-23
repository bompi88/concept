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
/**
 * Reports Scheme
 */

var textAreaRegEx = /^[a-z0-9A-z .,!;\n\r&:%"?æøåÆØÅèÈéÉäÄöÖëËòóÒÓ\/()<«»>-]*$/;
var textFieldRegEx = /^[a-z0-9A-z .,æøåÆØÅèÈéÉäÄöÖëËòóÒÓ()-]{2,100}$/;

ReportScheme = new SimpleSchema({
    project: {
        type: Object,
        optional: false
    },
    "project.name": {
    	type: String,
    	label: "Prosjektnavn",
    	optional: false,
        max: 37,
    	regEx: /^[a-z0-9A-z .,æøåÆØÅèÈéÉäÄöÖëËòóÒÓ()-]{2,37}$/
    },
    "project.projectNumber": {
    	type: Number,
    	label: "Prosjektnummer (Trailbase)",
    	optional: true,
    	regEx: /^[0-9 ]{1,10}$/
    },
    "project.sector": {
    	type: String,
    	label: "Sektor",
    	optional: true,
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
        optional: false
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
        optional: true,
        regEx: /^[1-3]$/
    },
    "project.projectDescription": {
        type: Object,
        optional: true
    },
    "project.projectDescription.short": {
        type: String,
        label: "Kort prosjektbeskrivelse",
        optional: true,
        regEx: textAreaRegEx
    },
    "project.projectDescription.long": {
        type: String,
        label: "Utdypende prosjektbeskrivelse og mål/bakgrunn for prosjektet",
        optional: true,
        regEx: textAreaRegEx
    },
    "project.finishingYear": {
        type: Number,
        label: "Årstall for ferdigstilling av prosjekt",
        optional: true,
        max:9999,
        min:1900,
        regEx: /^[0-9]{4}$/
    },
    "project.evaluationYear": {
        type: Number,
        label: "Årstall for utført evaluering",
        optional: true,
        max:9999,
        min:1900,
        regEx: /^[0-9]{4}$/
    },
    "project.decisionYear": {
        type: Number,
        label: "Årstall for vedtak",
        optional: true,
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
        optional: true,
        max:9999,
        min:1900,
        regEx: /^[0-9]{4}$/
    },
    "project.managementBudget.amount": {
        type: Number,
        label: "Styringsramme (i millioner NOK)",
        optional: true,
        regEx: /^[0-9]{1-10}$/
    },
    "project.costBudget": {
        type: Object,
        optional: false
    },
    "project.costBudget.year": {
        type: Number,
        label: "Årstall (Kostnadsramme)",
        optional: true,
        max:9999,
        min:1900,
        regEx: /^[0-9]{4}$/
    },
    "project.costBudget.amount": {
        type: Number,
        label: "Kostnadsramme (i millioner NOK)",
        optional: true,
        regEx: /^[0-9]{1-10}$/
    },
    "project.costFinal": {
        type: Object,
        optional: false
    },
    "project.costFinal.year": {
        type: Number,
        label: "Årstall (Sluttkostnad)",
        optional: true,
        max:9999,
        min:1900,
        regEx: /^[0-9]{4}$/
    },
    "project.costFinal.amount": {
        type: Number,
        label: "Sluttkostnad (i millioner NOK)",
        optional: true,
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
        optional: true,
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
        optional: true,
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
        optional: true,
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
        optional: true,
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
        optional: true,
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
        optional: true,
        regEx: /^[1-6]$/
    },
    "responsible": {
        type: Object,
        optional: false
    },
    "responsible.organization": {
        type: String,
        label: "Evalueringsansvarlig instans",
        optional: true,
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
        optional: true
    },
    "images.$.fileId": {
        type: String,
        optional: true,
        regEx: SimpleSchema.RegEx.Id
    },
    "images.$.title": {
        type: String,
        label: "Tittel",
        optional: true,
        regEx: textFieldRegEx
    },
    "images.$.copyright": {
        type: String,
        label: "Kilde",
        optional: true,
        regEx: textFieldRegEx
    },
    "images.$.link": {
        type: String,
        label: "Kilde-URL",
        optional: true
    },
    "references": {
        type: [Object],
        optional: true
    },
    "references.$.fileId": {
        type: String,
        optional: true,
        regEx: SimpleSchema.RegEx.Id
    },
    "references.$.title": {
        type: String,
        label: "Tittel",
        optional: true,
        regEx: textFieldRegEx
    },
    "references.$.typedoc": {
        type: String,
        label: "Dokumenttype",
        optional: true,
        regEx: textFieldRegEx
    },
    "references.$.date": {
        type: String,
        label: "Dato",
        optional: true//,
        //regEx: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
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

/**
 * Translation of the schema messages
 */

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

// Attach the schema to the collection
Reports.attachSchema(ReportScheme);
