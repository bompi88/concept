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
		}
	}
});
