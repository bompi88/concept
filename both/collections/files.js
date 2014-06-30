/*****************************************************************************/
/* Files Collection */
/*****************************************************************************/

Files = new FS.Collection("files", {
	stores: [
		new FS.Store.GridFS("files", {})
	],
	filter: {
		allow: {
			contentTypes: [
				'application/pdf',
				'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
				'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				'application/vnd.openxmlformats-officedocument.presentationml.presentation',
				'application/msword',
				'application/vnd.ms-excel',
				'application/vnd.ms-powerpoint',
				'application/x-iwork-keynote-sffkey',
				'application/x-iwork-pages-sffpages',
				'application/x-iwork-numbers-sffnumbers'
			]
		}
	}
});