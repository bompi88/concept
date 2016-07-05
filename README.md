#Presentasjonsverktøy for Concept

## Installasjon og kjøring av prosjektet lokalt
1. Installer [Meteor](https://www.meteor.com/)
2. Hent alle filene og start serveren:

```bash
$ git clone git@github.com:bompi88/concept.git
$ cd concept
$ npm run dev
```

## Introduksjonsguide
Prosjektet bruker [Meteor](http://www.meteor.com) som rammeverk. Sass brukes som CSS-preprosessor. En viktig pakke som brukes er [Iron Router](https://github.com/iron-meteor/iron-router). Denne tar seg av alle rutene på klienten og serveren og bestemmer hvilke templater som skal rendres. Layouten bygges opp fra MasterLayout som ligger i client/views/layouts/.

Kode som ligger i `/both` kjøres både på serveren og klienten. Filene er som oftest gruppert slik at javascript-, scss-, og html-filene som hører sammen ligger i samme mappe.

### Tilgang til lokal database

For å få tilgang til å utforske den lokale databasen, kjører man følgende kommando (Sjekk mongodb.org for videre instrukser for bruk av databasen):

```bash
$ npm run mongo
```

### Tilgang til database på server

Først må man logge seg på serveren med utlevert brukernavn og passord, ved bruk av ssh. Når man har logget inn kan man kjøre følgende Docker-kommando:

```bash
$ docker exec -it mongodb mongo concept
```

### Slette data lokalt

Ønsker man å slette den lokale databasen, kjører man:

```bash
$ npm run reset
```

### Importere testdata lokalt

Det er ofte kjekt å kunne teste applikasjonen med data fra produksjonsserveren. En backup er tatt av databasen den 27.05.2015 som kan importeres lokalt ved å kjøre følgende kommando:

```bash
$ npm run import:data
```

## Deployment

Concept Presentasjonsverktøy bruker Meteor-up for å sette opp applikasjonen på serveren. Først må man innstallere Meteor-up, som kan lastes ned her: [Meteor-up](https://github.com/kadirahq/meteor-up). Innstallasjonsveiledning finnes også på denne siden. Når dette er gjort, lager man en deployment-fil som beskrevet i neste underkappitel og legger applikasjonen på serveren ved å kjøre:

```bash
$ npm run deploy
```

Hvis serveren ikke er brukt tidligere, må man sette opp systemmiljøet ved å kjøre:

```bash
$ npm run setup
```

### Deployment Fil

For å bruke Meteor-up til å deploye til server, må man lage en fil `.deploy/mup.js` med innhold som i figuren under. Man må fylle inn `host`, `username`, `password`, `MAIL_URL`, `KADIRA_APP_ID` og `KADIRA_APP_SECRET`. Disse kan fåes ved å kontakte Bjørn Bråthen.

``` js
module.exports = {
  servers: {
    one: {
      host: '',
      username: '',
      password: ''
    }
  },

  meteor: {
    name: 'concept',
    path: '../',
    servers: {
      one: {}
    },
    env: {
      PORT: 80,
      ROOT_URL: 'http://concept-eval.ivt.ntnu.no',
      MONGO_URL: 'mongodb://localhost/meteor'
      MAIL_URL: '',
      KADIRA_APP_ID: '',
      KADIRA_APP_SECRET: ''
    },
    dockerImage: 'ianmartorell/meteord-graphicsmagick',
    deployCheckWaitTime: 60
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};

```
### Server logs
Hvis man skal ha tilgang på loggingen fra Meteor og Mongo, kan man få dette ved å kjøre:

```bash
$ npm run logs					# Meteor logs
$ npm run logs:mongo		# MongoDB logs
```

## Datamodell
Concept Presentasjonsverktøy bruker MongoDB som database. Hver rapport lagres i én json-fil i databasen som vist under. `fileId` i `images` og `references` peker på et filobjekt i Collection FS-rammeverket som også er lagret i databasen.

```javascript
{
	"project" : {
		"name" : "",
		"projectNumber" : "",
		"sector" : "",
		"location" : {
			"name" : "",
			"coordinates" : {
				"lat": "",
				"lng": ""
			}
		},
		"operationalSuccess" : "",
		"strategicalSuccess" : "",
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
