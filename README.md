#Presentasjonsverktøy for Concept

## Installasjon og kjøring av prosjektet lokalt
1. Installer [Meteor](https://www.meteor.com/) 
2. Hent alle filene og start serveren:
```bash
$ git clone git@github.com:bompi88/concept.git
$ cd concept
$ meteor
```

## Introduksjonsguide
Prosjektet bruker [Meteor](http://www.meteor.com) som rammeverk. Sass brukes som CSS-preprosessor. En viktig pakke som brukes er [Iron Router](https://github.com/iron-meteor/iron-router). Denne tar seg av alle rutene på klienten og serveren og bestemmer hvilke templater som skal rendres. Layouten bygges opp fra MasterLayout som ligger i client/views/layouts/. 

Kode som ligger i `/both` kjøres både på serveren og klienten. Filene er som oftest gruppert slik at javascript-,scss-, og html-filene som hører sammen ligger i samme mappe. 

## Datamodell
Meteor bruker MongoDB som database. Hver rapport lagres i én json-fil i databasen som vist under. `fileId` i `images` og `references` peker på et filobjekt i Collection FS-rammeverket som også er lagret i databasen.

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

### Brukermanual

Brukermanualen er skrevet i `markdown` og kan genereres til `\*.pdf` og `\*.epub` ved bruk av [GitBook](https://github.com/GitbookIO/gitbook).

Det finnes et GUI-program til GitBook også, det kan man laste ned [her](https://github.com/GitbookIO/editor/releases).

For å kunne generere til `pdf` må man installere [Calibre](http://calibre-ebook.com). Last ned [her](http://calibre-ebook.com/download). Deretter må man be Calibre om å legge til cmd-tools:

1. Gå til `Preferences->Avansert->Diverse`.
2. Klikk `Installer kommandoverktøy`

## Copyright
Laget av [Bjørn Bråthen](https://github.com/bompi88) og [Andreas Drivenes](https://github.com/andybb) for Concept-programmet på NTNU. Sluppet under Apache-lisens. 
