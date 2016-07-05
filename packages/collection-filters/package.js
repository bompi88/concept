Package.describe({
  git: 'https://github.com/CollectionFS/Meteor-cfs-collection-filters.git',
  name: 'cfs:collection-filters',
  version: '0.2.4',
  summary: 'CollectionFS, adds FS.Collection filters'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use(['cfs:base-package@0.0.30', 'cfs:collection@0.5.4']);

  api.addFiles([
    'filters.js'
  ], 'client');

  api.addFiles([
    'filters.js'
  ], 'server');
});

// Package.on_test(function (api) {
//   api.use('collectionfs');
//   api.use('test-helpers', 'server');
//   api.use(['tinytest']);

//   api.addFiles('tests/server-tests.js', 'server');
//   api.addFiles('tests/client-tests.js', 'client');
// });
