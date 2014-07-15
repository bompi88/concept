#Presentasjonsverktøy for Concept

## Introduksjonsguide
Prosjektet bruker [Meteor v0.8.3] (http://www.meteor.com) som rammeverk og [Bootstrap 3] (http://www.getbootstrap.com) som hjelp til å bygge design. Sass brukes som CSS-preprosessor. En viktig pakke som brukes er [Iron Router] (https://github.com/EventedMind/iron-router). Denne tar seg av alle rutene på klienten og serveren og bestemmer hvilke templater som skal rendres. Layouten bygges opp fra MasterLayout som ligger i client/views/layouts/. 

Kode som ligger i "both" kjøres både på serveren og klienten. Filene er som oftest gruppert slik at javascript-,scss-, og html-filene som hører sammen ligger i samme mappe. 

smart.json angir hvilke eksterne Atmosphere-pakker som brukes i prosjektet. 


## Installasjon og kjøring av prosjektet lokalt
1. Installer [Node.js](http://nodejs.org/) and [Meteor](https://www.meteor.com/) 
2. Installer [Meteorite](https://github.com/oortcloud/meteorite/)
3. Hent alle filene og start serveren
```bash
$ git clone git@github.com:bompi88/concept.git
$ cd concept
$ mrt
```
4. Gå til http://localhost:3000/

## Deploying til NTNUs server
1. Installer Meteor Up.
2. Dersom du har fått en ny adminbruker på serveren kan det hende du trenger å følge noen steg i [guiden] (https://github.com/arunoda/meteor-up) til Meteor Up. Per nå er bjorbrat og andredri adminbrukere.
3. Kjør 'mup deploy' fra terminal på egen maskin. mup bruker settings.json og mup.json som innstillinger.

```bash
$ npm install -g mup
$ mup deploy
```

## Generering av prosjektstruktur
Bruk [Em] (https://github.com/EventedMind/em).

###Installasjon
```bash
$ sudo npm install -g meteor-em
```

###Eksempelbruk
```bash
$ em g:view /folder/anotherFolder
```

## Datamodell
Meteor bruker MongoDB som database. Hver rapport lagres i én json-fil i databasen som vist under. "fileId" i "images" og "references" peker på et filobjekt i Collection FS-rammeverket som også er lagret i databasen.

```javascript
{
	"project" : {
		"name" : "",
		"projectNumber" : "",
		"sector" : "",
		"location" : {
			"name" : "",
			"coordinates" : {
				lat: "",
				lng: ""
			}
		},
		"successCategory" : "",
		"projectDescription" : {
			"short" : "",
			"long" : ""
		},
		"finishingYear" : "",
		"evaluationYear" : "",
		"decisionYear" : "",
		"managementBudget" : {
			"year" : "",
			"amount" : ""
		},
		"costBudget" : {
			"year" : "",
			"amount" : ""
		},
		"costFinal" : {
			"year" : "",
			"amount" : ""
		}
	},
	"evaluation" : {
		"productivity" : {
			"short" : "",
			"long" : "",
			"value" : ""
		},
		"achievement" : {
			"short" : "",
			"long" : "",
			"value" : ""
		},
		"effects" : {
			"short" : "",
			"long" : "",
			"value" : ""
		},
		"relevance" : {
			"short" : "",
			"long" : "",
			"value" : ""
		},
		"viability" : {
			"short" : "",
			"long" : "",
			"value" : ""
		},
		"profitability" : {
			"short" : "",
			"long" : "",
			"value" : ""
		}
	},
	"responsible" : {
		"organization" : "",
		"person" : ""
	},
	"principal" : "",
	"images" : [
		{
			"fileId" : "",
			"title" : "",
			"copyright" : "",
			"link" : ""
		}
	],
	"references" : [
		{
			"fileId" : "",
			"title" : "",
			"typedoc" : "",
			"date" : ""
		}
	],
	"_id" : ""
}
```

## Copyright
Laget av Bjørn Bråthen (bjorbrat88@gmail.com) og Andreas Drivenes (andreas.drivenes@gmail.com) for Concept-programmet på NTNU.
