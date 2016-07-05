Package.describe({
  name: 'cfs:access-point',
  version: '0.1.49',
  summary: 'CollectionFS, add ddp and http accesspoint capability',
  git: 'https://github.com/CollectionFS/Meteor-cfs-access-point.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  // This imply is needed for tests, and is technically probably correct anyway.
  api.imply([
    'cfs:base-package'
  ]);

  api.use([
    //CFS packages
    'cfs:base-package@0.0.30',
    'cfs:file@0.1.16',
    //Core packages
    'check',
    'ejson',
    //Other packages
    'cfs:http-methods@0.0.29',
    'cfs:http-publish@0.0.13'
  ]);

  api.addFiles([
    'access-point-common.js',
    'access-point-handlers.js',
    'access-point-server.js'
  ], 'server');

  api.addFiles([
    'access-point-common.js',
    'access-point-client.js'
  ], 'client');
});

Package.onTest(function (api) {
  api.versionsFrom('1.0');

  api.use([
    //CFS packages
    'cfs:access-point',
    'cfs:standard-packages@0.0.2',
    'cfs:gridfs@0.0.0',
    //Core packages
    'test-helpers',
    'http',
    'tinytest',
    'underscore',
    'ejson',
    'ordered-dict',
    'random',
    'deps'
  ]);

  api.addFiles('tests/client-tests.js', 'client');
  api.addFiles('tests/server-tests.js', 'server');
});
