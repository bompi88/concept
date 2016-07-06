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
 * Files Collection
 */

Files = new FS.Collection("files", {
	stores: [
		new FS.Store.GridFS("files", {})
	],
	filter: {
		allow: {
			contentTypes: [
				'application/pdf',
				// MS Office standard files
				'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
				'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				'application/vnd.openxmlformats-officedocument.presentationml.presentation',
				'application/msword',
				'application/vnd.ms-excel',
				'application/vnd.ms-powerpoint',
			]
		},
    onInvalid: function (message) {
      Notifications.warn('Feil format', 'Vi støtter bare PDF, Word, Excel og PowerPoint akkurat nå. Hvis du skal laste opp bilder, prøv det andre opplastningsfeltet.');
    }
	}
});
