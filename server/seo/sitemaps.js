
sitemaps.add('/reports.xml', function() {
  var out = [], reports = Reports.find({}).fetch();
  _.each(reports, function(report) {
    out.push({
      page: 'rapport/' + report._id + '/' + slugify(report.project.name),
      lastmod: new Date(2014, 6, 20, 0, 0, 0, 0)
    });
  });
  return out;
});

sitemaps.add('/sitemap.xml', function() {
  return [
    {page: 'om/', lastmod: new Date(2014, 6, 20, 0, 0, 0, 0) },
    {page: 'kriterier/', lastmod: new Date(2014, 6, 20, 0, 0, 0, 0) },
    {page: 'rapporter/side/1', lastmod: new Date(2014, 6, 20, 0, 0, 0, 0) }
  ];
})
