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
 * SEO configuration for ConceptIndex route
 */
Meteor.startup(function() {
  SeoCollection.update({
    route_name: 'ConceptIndex'
  },
  {
    $set: {
      route_name: 'ConceptIndex',
      title: 'Concept NTNU',
      meta: {
        'description': 'Etterevaluering av en rekke statlige prosjekter gjort av Concept-programmet. På oppdrag fra Finansdepartementet'
      },
      og: {
        'title': 'Concept NTNU',
        'image': '/images/logo.jpg'
      }
    }
  },
  {
    upsert: true
  });
});
