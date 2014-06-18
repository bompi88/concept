#Presentation tool for Concept

## Installation and running
1. Install [Node.js](http://nodejs.org/) and [Meteor](https://www.meteor.com/) 
2. Install [Meteorite](https://github.com/oortcloud/meteorite/)
3. Get all the files and start the server
```bash
$ git clone git@github.com:bompi88/concept.git
$ cd concept
$ mrt
```
4. Go to http://localhost:3000/

## Generation of project structure
Use [Em] (https://github.com/EventedMind/em).

###Installation
```bash
$ sudo npm install -g meteor-em
```

###Example usage
```bash
$ em g:view /folder/anotherFolder
```

## Data model

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