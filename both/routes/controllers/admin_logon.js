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
 * AdminLogonController: Creates a endpoint where a user can log
 * into the system. It renders the login template only if user is
 * not already logged in.
 */
AdminLogonController = RouteController.extend({
	onBeforeAction: function(pause) {
    	// Redirects user if allready logged in
		
		if (Meteor.user()) {
			if (!Meteor.loggingIn()) {
				this.redirect(Router.path('Reports', {page:1}));
			}
		}

		this.next();
	},

	action: function () {
    	// if user is not logged in, render the login template
		
		if (!Meteor.user() && !Meteor.loggingIn()) {
			this.render();
		}
	}
});
