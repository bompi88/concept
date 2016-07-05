
slugify = function(text) {
  return text.toString().toLowerCase()
    .replace('ø', 'oe')
    .replace('å', 'aa')
    .replace('æ', 'ae')
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start of text
    .replace()
    .replace(/-+$/, '');         // Trim - from end of text
}
