const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (config) {
  config.addPlugin(syntaxHighlight);
  config.addPassthroughCopy("src/js");
  config.addPassthroughCopy("src/css");

  // https://www.11ty.dev/docs/data-deep-merge/
  config.setDataDeepMerge(true);

  // add all *.md files from the 'src/posts' folder to the blog collection
  config.addCollection('blog', collection =>
    collection
      .getFilteredByGlob([
        './src/posts/**/*.md'])
      .filter(p => (!p.data.draft && p.date <= Date.now()))
  );

  // Get the first `n` elements of a collection.
  config.addFilter("head", (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  // Return the smallest number argument
  config.addFilter("min", (...numbers) => {
    return Math.min.apply(null, numbers);
  });

  config.addFilter("filterTagList", tags => {
    // should match the list in tags.njk
    return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
  })

  // Create an array of all tags
  config.addCollection("tagList", function (collection) {
    let tagSet = new Set();
    collection.getAll().forEach(item => {
      (item.data.tags || []).forEach(tag => tagSet.add(tag));
    });

    return [...tagSet];
  });

  config.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat("dd LLL yyyy");
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  config.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
  });

  return {
    dir: {
      input: "src",
      output: "docs"
    }
  };
};