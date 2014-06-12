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
		"location" : "",
		"successCategory" : "1",
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
		"textual" : {
			"productivity" : {
				"short" : "",
				"long" : ""
			},
			"achievement" : {
				"short" : "",
				"long" : ""
			},
			"effects" : {
				"short" : "",
				"long" : ""
			},
			"relevance" : {
				"short" : "",
				"long" : ""
			},
			"viability" : {
				"short" : "",
				"long" : ""
			},
			"profitability" : {
				"short" : "",
				"long" : ""
			}
		},
		"numeric" : {
			"productivity" : {
				"axis" : "Produktivitet",
				"value" : "1"
			},
			"achievement" : {
				"axis" : "Måloppnåelse",
				"value" : "1"
			},
			"effects" : {
				"axis" : "Virkninger",
				"value" : "1"
			},
			"relevance" : {
				"axis" : "Relevans",
				"value" : "1"
			},
			"viability" : {
				"axis" : "Levedyktighet",
				"value" : "1"
			},
			"profitability" : {
				"axis" : "Samf.øk. lønnsomhet",
				"value" : "1"
			}
		}
	},
	"responsible" : {
		"organization" : "",
		"person" : ""
	},
	"principal" : "",
	"_id" : "nKCvhFKdaG5d2cXH5"
}
```