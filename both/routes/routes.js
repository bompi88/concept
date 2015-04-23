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
 * Client Routes
 */
Router.route('/', {
  name: 'ConceptIndex'
});

// -- Report routes ---------------------------------------------------

Router.route('/rapporter/side/:page', {
  name: 'Reports',
  controller: 'ReportsController'
});

Router.route('/rapporter', {
  name: 'ReportsIndex',
  onBeforeAction: function() {
    this.redirect('/rapporter/side/1');
  }
});

Router.route('/opprett', {
  name: 'CreateReport',
  controller: 'AuthRouteController'
});

Router.route('/rapport/:_id/endre', {
  name: 'EditReport',
  template: 'CreateReport',
  controller: 'EditReportController'
});

Router.route('/rapport/:_id/:slug?', {
  name: 'Report',
  controller: 'ReportViewController'
});

// -- Accounts routes --------------------------------------------------

Router.route('/concept-admin', {
  name: 'AdminLogon',
  template: 'LoginForm',
  controller: 'AdminLogonController'
});

Router.route('/concept-admin-forgotton-password', {
  name: 'AdminForgottonPassword',
  template: 'LoginForm'
});

Router.route('/brukere', {
  name: 'UserControl',
  template: 'UserControl',
  controller: 'UserControlController'
});

// -- Miscellaneous routes ---------------------------------------------

Router.route('/om', {
  name: 'AboutConcept'
});

Router.route('/kriterier', {
  name: 'EvaluationCriteria'
});

// -- Server routes ----------------------------------------------------

Router.route('/pdf/:_id', {
  name: 'pdfFile',
  where: 'server',
  controller: 'PDFExportController'
});

Router.route('/csv', {
  name: 'csvFile',
  where: 'server',
  controller: 'CSVExportController'
});

if(Meteor.isClient) {
  //where to put this? we need to subscribe for the account field for the user
  Meteor.subscribe('moreUserData');
}
